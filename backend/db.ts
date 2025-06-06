import { Pool } from "pg";
import { drizzle } from "drizzle-orm/postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/aetherion"
});

export const db = drizzle(pool);
