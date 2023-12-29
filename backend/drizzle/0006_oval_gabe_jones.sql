CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(250) NOT NULL,
	"last_name" varchar(250),
	"gender" "gender" NOT NULL,
	"phone_number" bigint NOT NULL,
	"city" varchar(256),
	"country" varchar(256),
	"street" text,
	"flat_number" text,
	"isDelivery_address" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "inStock" SET DEFAULT true;