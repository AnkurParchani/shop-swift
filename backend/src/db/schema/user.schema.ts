import { relations } from "drizzle-orm";
import { serial, varchar, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { addresses } from "./address.schema";
import { reviews } from "./review.schema";
import { wishlist } from "./wishlist.schema";
import { orders } from "./order.schema";
import { images } from "./img.schema";

// Defining the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).unique().notNull(),
  password: text("password").notNull(),
});

// Defining the user relation
export const userRelations = relations(users, ({ many, one }) => ({
  image: one(images, {
    fields: [users.id],
    references: [images.userId],
  }),

  addresses: many(addresses),
  reviews: many(reviews),
  wishlist: many(wishlist),
  orders: many(orders),
}));
