ALTER TABLE "addresses" ALTER COLUMN "isDelivery_address" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "isDelivery_address" SET NOT NULL;