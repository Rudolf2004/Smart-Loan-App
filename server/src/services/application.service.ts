import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pool } from "../db/pool.js";
import type { LoanApplicationInput } from "../schemas/loanApplication.js";
import type { PredictionResponse } from "../types/loan.js";

export type ApplicationStatus = "under_review" | "approved" | "rejected" | "needs_information";

export type LoanApplicationRecord = {
  id: string;
  userId: string;
  payload: LoanApplicationInput;
  prediction: PredictionResponse;
  status: ApplicationStatus;
  reviewerId?: string;
  reviewNote?: string;
  createdAt: string;
  updatedAt: string;
};

const dataDir = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), "data"));
const applicationsFile = path.join(dataDir, "applications.json");

async function readStore(): Promise<{ applications: LoanApplicationRecord[] }> {
  await mkdir(dataDir, { recursive: true });
  try {
    return JSON.parse(await readFile(applicationsFile, "utf8"));
  } catch {
    const empty = { applications: [] };
    await writeFile(applicationsFile, JSON.stringify(empty, null, 2));
    return empty;
  }
}

async function writeStore(store: { applications: LoanApplicationRecord[] }) {
  await writeFile(applicationsFile, JSON.stringify(store, null, 2));
}

function fromRow(row: Record<string, unknown>): LoanApplicationRecord {
  return {
    id: String(row.id), userId: String(row.user_id),
    payload: row.payload as LoanApplicationInput,
    prediction: row.prediction as PredictionResponse,
    status: row.status as ApplicationStatus,
    reviewerId: row.reviewer_id ? String(row.reviewer_id) : undefined,
    reviewNote: row.review_note ? String(row.review_note) : undefined,
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  };
}

export async function createApplication(userId: string, payload: LoanApplicationInput, prediction: PredictionResponse) {
  const now = new Date().toISOString();
  const record: LoanApplicationRecord = {
    id: `APP-${new Date().getFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`,
    userId, payload, prediction, status: "under_review", createdAt: now, updatedAt: now,
  };
  if (pool) {
    const result = await pool.query(
      `INSERT INTO loan_applications (id, user_id, payload, prediction, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [record.id, userId, payload, prediction, record.status, now, now],
    );
    return fromRow(result.rows[0]);
  }
  const store = await readStore();
  store.applications.push(record);
  await writeStore(store);
  return record;
}

export async function listApplications(userId?: string) {
  if (pool) {
    const result = userId
      ? await pool.query("SELECT * FROM loan_applications WHERE user_id = $1 ORDER BY created_at DESC", [userId])
      : await pool.query("SELECT * FROM loan_applications ORDER BY created_at DESC");
    return result.rows.map(fromRow);
  }
  const store = await readStore();
  return store.applications.filter((item) => !userId || item.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function reviewApplication(id: string, reviewerId: string, status: ApplicationStatus, reviewNote: string) {
  const updatedAt = new Date().toISOString();
  if (pool) {
    const result = await pool.query(
      `UPDATE loan_applications SET status = $2, reviewer_id = $3, review_note = $4, updated_at = $5 WHERE id = $1 RETURNING *`,
      [id, status, reviewerId, reviewNote, updatedAt],
    );
    return result.rows[0] ? fromRow(result.rows[0]) : null;
  }
  const store = await readStore();
  const application = store.applications.find((item) => item.id === id);
  if (!application) return null;
  Object.assign(application, { status, reviewerId, reviewNote, updatedAt });
  await writeStore(store);
  return application;
}
