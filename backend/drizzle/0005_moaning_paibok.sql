CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"isItem_img" boolean DEFAULT false,
	"isUser_img" boolean DEFAULT false,
	"path" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN IF EXISTS "main_img";--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN IF EXISTS "other_img";