import { serial, text, boolean, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { items } from "./item.schema";
import { relations } from "drizzle-orm";

// Defining the users table
export const images = pgTable("images", {
  id: serial("id").primaryKey().notNull(),
  isItemMainImg: boolean("isItem_mainImg").default(false),
  isItemExtraImg: boolean("isItem_extraImg").default(false),
  isUserImg: boolean("isUser_img").default(false),
  path: text("path").notNull(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  itemId: integer("item_id").references(() => items.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});

// Defining the relations for the images
export const imgRelations = relations(images, ({ one }) => ({
  user: one(users, {
    fields: [images.userId],
    references: [users.id],
  }),

  item: one(items, {
    fields: [images.itemId],
    references: [items.id],
  }),
}));
