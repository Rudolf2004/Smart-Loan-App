import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const dataDir = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), "data"));
const usersFile = path.join(dataDir, "users.json");
const tokenSecret = process.env.AUTH_TOKEN_SECRET || "smart-loan-local-dev-secret";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  nationalId?: string;
  passwordHash?: string;
  googleSub?: string;
  provider: "password" | "google";
  createdAt: string;
};

type StoredUsers = {
  users: AuthUser[];
};

export type PublicUser = Omit<AuthUser, "passwordHash" | "googleSub">;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(usersFile, "utf8");
  } catch {
    await writeFile(usersFile, JSON.stringify({ users: [] }, null, 2));
  }
}

async function readUsers(): Promise<StoredUsers> {
  await ensureStore();
  const content = await readFile(usersFile, "utf8");
  return JSON.parse(content) as StoredUsers;
}

async function writeUsers(store: StoredUsers) {
  await ensureStore();
  await writeFile(usersFile, JSON.stringify(store, null, 2));
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

async function verifyPassword(password: string, storedHash = "") {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;

  const hash = (await scrypt(password, salt, 64)) as Buffer;
  const stored = Buffer.from(key, "hex");
  return stored.length === hash.length && timingSafeEqual(stored, hash);
}

export function toPublicUser(user: AuthUser): PublicUser {
  const { passwordHash: _passwordHash, googleSub: _googleSub, ...publicUser } = user;
  return publicUser;
}

export function signToken(user: AuthUser) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", tokenSecret)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token = "") {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return null;

  const expected = createHmac("sha256", tokenSecret)
    .update(`${header}.${payload}`)
    .digest("base64url");

  if (expected !== signature) return null;

  let data: { sub: string; exp: number };
  try {
    data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sub: string;
      exp: number;
    };
  } catch {
    return null;
  }

  if (!data.sub || data.exp < Math.floor(Date.now() / 1000)) return null;
  return data;
}

export async function findUserById(id: string) {
  const store = await readUsers();
  return store.users.find((user) => user.id === id) || null;
}

export async function registerUser(input: {
  fullName: string;
  email: string;
  phone: string;
  nationalId: string;
  password: string;
}) {
  const store = await readUsers();
  const email = normalizeEmail(input.email);
  const phone = input.phone.trim();

  if (store.users.some((user) => user.email === email || user.phone === phone)) {
    throw new Error("An account with this email or phone number already exists.");
  }

  const user: AuthUser = {
    id: randomBytes(16).toString("hex"),
    fullName: input.fullName.trim(),
    email,
    phone,
    nationalId: input.nationalId.trim(),
    passwordHash: await hashPassword(input.password),
    provider: "password",
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);
  await writeUsers(store);
  return user;
}

export async function loginUser(identifier: string, password: string) {
  const store = await readUsers();
  const normalized = identifier.trim().toLowerCase();
  const user = store.users.find((entry) => entry.email === normalized || entry.phone === identifier.trim());

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new Error("Invalid email/phone number or password.");
  }

  return user;
}

export async function upsertGoogleUser(profile: {
  sub: string;
  email: string;
  fullName: string;
}) {
  const store = await readUsers();
  const email = normalizeEmail(profile.email);
  let user = store.users.find((entry) => entry.googleSub === profile.sub || entry.email === email);

  if (user) {
    user.googleSub = profile.sub;
    user.fullName = user.fullName || profile.fullName;
    user.provider = user.passwordHash ? "password" : "google";
  } else {
    user = {
      id: randomBytes(16).toString("hex"),
      fullName: profile.fullName,
      email,
      googleSub: profile.sub,
      provider: "google",
      createdAt: new Date().toISOString(),
    };
    store.users.push(user);
  }

  await writeUsers(store);
  return user;
}
