DO $$ BEGIN
 CREATE TYPE "text" AS ENUM('male', 'female', 'unisex');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "for_gender" SET DATA TYPE text;