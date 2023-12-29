DO $$ BEGIN
 CREATE TYPE "for_gender" AS ENUM('male', 'female', 'unisex');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "for_gender" "for_gender" DEFAULT 'unisex' NOT NULL;--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN IF EXISTS "forGender";