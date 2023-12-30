import { serial, integer, date } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { relations } from "drizzle-orm";
import { items } from "./item.schema";

// Defining the Wishlist table
export const wishlist = pgTable("wishlist", {
  id: serial("id").primaryKey().notNull(),
  date: date("date", { mode: "date" }).defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// Defining the relationship
export const wishlistRelations = relations(wishlist, ({ one }) => ({
  user: one(users, {
    fields: [wishlist.userId],
    references: [users.id],
  }),

  item: one(items, {
    fields: [wishlist.itemId],
    references: [items.id],
  }),
}));
