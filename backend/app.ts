import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import dataRoutes from "./routes/dataRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Security and Performance Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(compression());
app.use(express.json({ limit: "16kb" }));

// Custom Rate Limiter
const rateLimitWindowMs = 60 * 1000;
const maxRequestsPerWindow = 120;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function applyRateLimit(request: Request, response: Response, next: NextFunction) {
  const now = Date.now();
  const key = (request.ip || request.socket.remoteAddress || "anonymous") as string;
  const bucket = requestBuckets.get(key) || { count: 0, resetAt: now + rateLimitWindowMs };

  if (bucket.resetAt <= now) {
    bucket.count = 0;
    bucket.resetAt = now + rateLimitWindowMs;
  }

  bucket.count += 1;
  requestBuckets.set(key, bucket);

  response.setHeader("RateLimit-Limit", String(maxRequestsPerWindow));
  response.setHeader("RateLimit-Remaining", String(Math.max(maxRequestsPerWindow - bucket.count, 0)));

  if (bucket.count > maxRequestsPerWindow) {
    response.status(429).json({ error: "Too many requests. Please try again shortly." });
    return;
  }

  next();
}

app.use(applyRateLimit);

app.get("/api/health", (_request: Request, response: Response) => {
  response.json({ status: "ok", app: "VoteVerse", engine: "Gemini-powered" });
});

app.use("/api", dataRoutes);
app.use("/api/chat", chatRoutes);

app.use((_request: Request, response: Response) => {
  response.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;


