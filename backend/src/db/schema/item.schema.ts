import { relations } from "drizzle-orm";
import {
  serial,
  varchar,
  text,
  integer,
  boolean,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { images } from "./img.schema";
import { reviews } from "./review.schema";
import { order_items } from "./order.schema";

// Enum for gender
export const genderEnum = pgEnum("for_gender", ["male", "female", "unisex"]);

// Defining the items table
export const items = pgTable("items", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 250 }).notNull(),
  company: varchar("company", { length: 250 }).notNull(),
  originalPrice: integer("original_price").notNull(),
  discountedPrice: integer("dicounted_price"),
  forGender: genderEnum("for_gender").notNull().default("unisex"),
  category: varchar("category", { length: 250 }).notNull(),
  inStock: boolean("inStock").default(true),
  about: text("about").notNull(),
  description: json("description"),
  extraDetails: json("extra_details"),
});

// Defining the item relations
export const itemRelations = relations(items, ({ many }) => ({
  images: many(images),
  reviews: many(reviews),
  orders: many(order_items),
}));
