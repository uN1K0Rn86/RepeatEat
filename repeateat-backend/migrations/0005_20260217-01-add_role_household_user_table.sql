CREATE TYPE "public"."user_role" AS ENUM('admin', 'member');--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "private" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "household_user" ADD COLUMN "role" "user_role" DEFAULT 'member' NOT NULL;