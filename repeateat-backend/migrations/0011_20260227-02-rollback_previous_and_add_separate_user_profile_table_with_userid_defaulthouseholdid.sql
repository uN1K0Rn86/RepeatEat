CREATE TABLE "profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"defaultHouseholdId" integer
);
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_default_household_id_household_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_defaultHouseholdId_household_id_fk" FOREIGN KEY ("defaultHouseholdId") REFERENCES "public"."household"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "default_household_id";