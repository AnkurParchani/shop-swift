import { relations } from "drizzle-orm";
import { serial, varchar, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { addresses } from "./address.schema";

// Defining the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).unique().notNull(),
  password: text("password").notNull(),
});

// Defining the user relation
export const userRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}));