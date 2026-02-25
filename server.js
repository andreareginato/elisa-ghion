import express from "express";
import { createRequestHandler } from "@react-router/express";
import { mkdirSync } from "fs";

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || "./data/uploads";

// Ensure upload directory exists
mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();

// Health check for Fly.io
app.get("/healthcheck", (req, res) => {
  res.status(200).send("OK");
});

// Serve static assets from the client build
app.use(express.static("build/client", { maxAge: "1y", immutable: true }));

// Serve uploaded files
app.use("/uploads", express.static(UPLOAD_DIR, { maxAge: "1d" }));

// React Router handler for all other requests
const build = await import("./build/server/index.js");
app.all("/{*splat}", createRequestHandler({ build }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
