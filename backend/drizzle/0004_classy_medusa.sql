DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female', 'unisex');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(250) NOT NULL,
	"original_price" integer NOT NULL,
	"dicounted_price" integer,
	"gender" "gender" DEFAULT 'unisex' NOT NULL,
	"category" varchar(250) NOT NULL,
	"inStock" boolean,
	"about" text,
	"description" json,
	"main_img" text,
	"other_img" json
);
