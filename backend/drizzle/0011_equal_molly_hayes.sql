DO $$ BEGIN
 CREATE TYPE "forGender" AS ENUM('male', 'female', 'unisex');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "for_gender" SET DATA TYPE forGender;