import { serial, integer, date, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { relations } from "drizzle-orm";
import { items } from "./item.schema";
import { addresses } from "./address.schema";

// Defining the Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey().notNull(),
  date: date("date", { mode: "date" }).defaultNow().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  addressId: integer("address_id")
    .notNull()
    .references(() => addresses.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
});

// Defining the order table for seperate order_items
export const order_items = pgTable("order_items", {
  id: serial("id").primaryKey().notNull(),
  quantity: integer("quantity").notNull(),
  size: varchar("size", { length: 256 }),
  color: varchar("color", { length: 256 }),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

// Relations between Orders and Users
export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),

  address: one(addresses, {
    fields: [orders.addressId],
    references: [addresses.id],
  }),

  orderItems: many(order_items),
}));

// Relation between Orders and Order_items
export const orderItemRelations = relations(order_items, ({ one }) => ({
  order: one(orders, {
    fields: [order_items.orderId],
    references: [orders.id],
  }),

  item: one(items, {
    fields: [order_items.itemId],
    references: [items.id],
  }),
}));
