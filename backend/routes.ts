import { Express, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "./db";
import { users, memories } from "./schema";
import { encrypt, decrypt } from "./encryption";
import { callOpenAI } from "./openai";
import { uploadToStorage, downloadFromStorage } from "./storage";
import { randomId, formatDate } from "./utils";

export function startRoutes(app: Express) {
  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // 1) User registration (example)
  app.post("/api/register", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }
    const password_hash = await bcrypt.hash(password, 10);
    await db.insert(users).values({ username, password_hash });
    res.json({ message: "User registered" });
  });

  // 2) User login → returns JWT
  app.post("/api/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }
    const user = await db
      .select()
      .from(users)
      .where(users.username.eq(username))
      .limit(1)
      .then((rows) => rows[0]);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "2h"
    });
    res.json({ token });
  });

  // 3) Create a memory
  app.post("/api/memories", async (req: Request, res: Response) => {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ error: "Missing userId or content" });
    }
    const encryptedContent = encrypt(content);
    const result = await db
      .insert(memories)
      .values({ user_id: userId, content: encryptedContent })
      .returning({ id: memories.id, created_at: memories.created_at });
    res.json({ id: result[0].id, createdAt: result[0].created_at });
  });

  // 4) Get all memories for a user
  app.get("/api/memories", async (req: Request, res: Response) => {
    const userId = Number(req.query.userId);
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const rows = await db
      .select()
      .from(memories)
      .where(memories.user_id.eq(userId));
    // Decrypt each content before sending
    const decrypted = rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      content: decrypt(row.content),
      createdAt: row.created_at
    }));
    res.json(decrypted);
  });

  // 5) Oracle route → calls OpenAI
  app.post("/api/oracle", async (req: Request, res: Response) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }
    try {
      const answer = await callOpenAI(prompt);
      res.json({ answer });
    } catch (err) {
      res.status(500).json({ error: "OpenAI request failed" });
    }
  });

  // 6) File upload (e.g. to S3)
  app.post("/api/upload", async (req: Request, res: Response) => {
    // Note: For simplicity, assume a raw Buffer is sent in req.body.file and key in req.body.key
    const { fileBase64, key } = req.body;
    if (!fileBase64 || !key) {
      return res.status(400).json({ error: "Missing fileBase64 or key" });
    }
    const buffer = Buffer.from(fileBase64, "base64");
    try {
      const data = await uploadToStorage(buffer, key);
      res.json({ location: data.Location });
    } catch (err) {
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // 7) File download
  app.get("/api/download/:key", async (req: Request, res: Response) => {
    const key = req.params.key;
    if (!key) {
      return res.status(400).json({ error: "Missing key" });
    }
    try {
      const buffer = await downloadFromStorage(key);
      res.writeHead(200, {
        "Content-Disposition": `attachment; filename="${key}"`,
        "Content-Type": "application/octet-stream"
      });
      res.end(buffer);
    } catch (err) {
      res.status(500).json({ error: "Download failed" });
    }
  });
}

