import app from "./app.js";
import { migrateDatabase } from "./db/migrate.js";
import { resetPasswordByEmail } from "./services/auth.service.js";

const port = Number(process.env.PORT || 8000);

migrateDatabase()
  .then(async () => {
    if (process.env.ADMIN_PASSWORD_RESET === "true") {
      const email = process.env.ADMIN_RESET_EMAIL?.trim();
      const password = process.env.ADMIN_RESET_PASSWORD || "";
      if (!email || password.length < 8) {
        throw new Error("ADMIN_PASSWORD_RESET requires ADMIN_RESET_EMAIL and an 8+ character ADMIN_RESET_PASSWORD.");
      }
      const user = await resetPasswordByEmail(email, password);
      if (!user) throw new Error(`Admin password reset account was not found: ${email}`);
      console.warn(`Production password recovery completed for ${email}. Remove ADMIN_PASSWORD_RESET and ADMIN_RESET_PASSWORD, then redeploy.`);
    }

    app.listen(port, () => {
      console.log(`Loan ML API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database migration failed.", error);
    process.exit(1);
  });
