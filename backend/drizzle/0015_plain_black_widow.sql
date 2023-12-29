DO $$ BEGIN
 CREATE TYPE "forGender" AS ENUM('male', 'female', 'unisex');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "forGender" "forGender" DEFAULT 'unisex' NOT NULL;--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN IF EXISTS "for_gender";