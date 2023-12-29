import { serial, text, boolean } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

// Defining the users table
export const images = pgTable("images", {
  id: serial("id").primaryKey().notNull(),
  isItemImg: boolean("isItem_img").default(false),
  isUserImg: boolean("isUser_img").default(false),
  path: text("path").notNull(),
});
