import { Config } from "drizzle-kit";

export default {
  schema: "./schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/aetherion"
  },
  out: "./drizzle"
} satisfies Config;
