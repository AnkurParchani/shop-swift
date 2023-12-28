import { serial, varchar, text, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

// Defining the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 50 }),
  email: varchar("email", { length: 50 }),
  password: text("password").notNull(),
});
