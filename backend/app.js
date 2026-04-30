import express from "express";
import dataRoutes from "./routes/dataRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const rateLimitWindowMs = 60 * 1000;
const maxRequestsPerWindow = 120;
const requestBuckets = new Map();

app.disable("x-powered-by");

function applySecurityHeaders(request, response, next) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
}

function applyCors(request, response, next) {
  const requestOrigin = request.headers.origin;

  if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
    response.setHeader("Access-Control-Allow-Origin", requestOrigin || allowedOrigins[0]);
    response.setHeader("Vary", "Origin");
  }

  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
}

function applyRateLimit(request, response, next) {
  const now = Date.now();
  const key = request.ip || request.socket.remoteAddress || "anonymous";
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

app.use(express.json({ limit: "32kb" }));
app.use(applySecurityHeaders);
app.use(applyCors);
app.use(applyRateLimit);

app.get("/api/health", (request, response) => {
  response.json({ status: "ok", app: "VoteVerse" });
});

app.use("/api", dataRoutes);
app.use("/api/chat", chatRoutes);

app.use((request, response) => {
  response.status(404).json({ error: "Route not found" });
});

export default app;
