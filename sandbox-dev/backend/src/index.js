import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgresql://app:app@postgres:5432/appdb"
});

app.use(cors());
app.use(express.json());

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", service: "node" });
  } catch (error) {
    res.status(500).json({ status: "error", detail: error.message });
  }
});

app.get("/api/message", (_req, res) => {
  res.status(200).json({
    message: "Hello from Node backend",
    stack: "node + postgres + react"
  });
});

app.get("/api/notes", async (_req, res) => {
  const result = await pool.query(
    "SELECT id, content, created_at FROM notes ORDER BY id DESC LIMIT 20"
  );
  res.status(200).json(result.rows);
});

app.post("/api/notes", async (req, res) => {
  const content = String(req.body?.content || "").trim();
  if (!content) {
    return res.status(400).json({ error: "content is required" });
  }

  const result = await pool.query(
    "INSERT INTO notes(content) VALUES ($1) RETURNING id, content, created_at",
    [content]
  );

  return res.status(201).json(result.rows[0]);
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Node backend listening on ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database init failed", error);
    process.exit(1);
  });
