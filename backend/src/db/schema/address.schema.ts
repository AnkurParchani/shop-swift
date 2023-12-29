import { relations } from "drizzle-orm";
import {
  serial,
  varchar,
  pgEnum,
  bigint,
  text,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

// Enum for gender
export const genderEnum = pgEnum("gender", ["male", "female", "prefer-not"]);

// Defining the Addresses table
export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey().notNull(),
  firstName: varchar("first_name", { length: 250 }).notNull(),
  lastName: varchar("last_name", { length: 250 }),
  gender: genderEnum("gender").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  state: varchar("state", { length: 256 }),
  city: varchar("city", { length: 256 }),
  country: varchar("country", { length: 256 }),
  street: text("street"),
  flatNumber: text("flat_number"),
  isDeliveryAddress: boolean("isDelivery_address").notNull(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// Defining the Adedress Relations
export const addressRelation = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));
