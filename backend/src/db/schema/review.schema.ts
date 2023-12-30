import { serial, text, integer, pgEnum, date } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { relations } from "drizzle-orm";
import { items } from "./item.schema";

// Enum for number of stars
export const starEnum = pgEnum("stars", ["1", "2", "3", "4", "5"]);

// Defining the Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey().notNull(),
  stars: starEnum("stars").default("1").notNull(),
  content: text("content").notNull(),
  date: date("date", { mode: "date" }).defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// Defining the relationship
export const reviewRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.id],
    references: [users.id],
  }),

  item: one(items, {
    fields: [reviews.id],
    references: [items.id],
  }),
}));
