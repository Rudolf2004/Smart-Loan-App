import app from "./app.js";
import { migrateDatabase } from "./db/migrate.js";

const port = Number(process.env.PORT || 8000);

migrateDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Loan ML API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database migration failed.", error);
    process.exit(1);
  });
