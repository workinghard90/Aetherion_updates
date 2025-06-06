// ── Aetherion/backend/index.ts ──

import "dotenv/config"; // ← load .env into process.env

import express from "express";
import cors from "cors";
import { startRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

// Mount your routes
startRoutes(app);

// Start listening
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Aetherion backend listening on http://localhost:${port}`);
});
