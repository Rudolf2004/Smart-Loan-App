import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import predictionRoutes from "./routes/prediction.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes, { uploadRoot } from "./routes/upload.routes.js";
import docsRoutes from "./routes/docs.routes.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
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

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    error: "Prediction service unavailable.",
    message: "The model prediction service could not complete the request.",
  });
};

app.use(errorHandler);

export default app;
