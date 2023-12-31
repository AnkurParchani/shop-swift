import { relations } from "drizzle-orm";
import { serial, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { items } from "./item.schema";

// Defining the cart table
export const cart = pgTable("carts", {
  id: serial("id").primaryKey().notNull(),
  isChecked: boolean("is_checked").default(true),
  quantity: integer("quantity").notNull(),
  size: varchar("size", { length: 256 }),
  price: integer("price").notNull(),
  color: varchar("color", { length: 256 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// Defining the cart Relations
export const cartRelations = relations(cart, ({ one }) => ({
  item: one(items, {
    fields: [cart.itemId],
    references: [items.id],
  }),
}));
