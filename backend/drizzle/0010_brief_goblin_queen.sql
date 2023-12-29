DO $$ BEGIN
 CREATE TYPE "for_gender" AS ENUM('male', 'female', 'unisex');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ratings" AS ENUM('1', '2', '3', '4', '5');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "gender" ADD VALUE 'prefer-not';--> statement-breakpoint
ALTER TABLE "items" RENAME COLUMN "gender" TO "for_gender";--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "for_gender" SET DATA TYPE for_gender;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "ratings" "ratings" DEFAULT '1';