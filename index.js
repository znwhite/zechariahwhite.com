// server.js
const path = require("path");
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

// Security headers (CSP disabled for simplicity; enable and tune if you add external scripts).
app.use(helmet({ contentSecurityPolicy: false }));

// Gzip responses
app.use(compression());

// Trust Render proxy (so req.secure works correctly if needed)
app.set("trust proxy", 1);

// Health check endpoint (useful for uptime monitors)
app.get("/healthz", (req, res) => res.json({ ok: true }));

// Serve the one-page HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 404 fallthrough
app.use((req, res) => {
  res.status(404).send("Not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
