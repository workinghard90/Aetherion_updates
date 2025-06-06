import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  password_hash: text("password_hash").notNull()
});

export const memories = pgTable("memories", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  created_at: text("created_at").defaultNow()
});
