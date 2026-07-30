import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import predictionRoutes from "./routes/prediction.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes, { uploadRoot } from "./routes/upload.routes.js";
import docsRoutes from "./routes/docs.routes.js";
import assistantRoutes from "./routes/assistant.routes.js";
import translationRoutes from "./routes/translation.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use("/api", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/uploads", express.static(uploadRoot));
app.use(docsRoutes);
app.use(authRoutes);
app.use(uploadRoutes);
app.use(predictionRoutes);
app.use(assistantRoutes);
app.use(translationRoutes);
app.use(applicationRoutes);
app.use(adminRoutes);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    error: "Service unavailable.",
    message: "The requested service could not complete the request.",
  });
};

app.use(errorHandler);

export default app;
