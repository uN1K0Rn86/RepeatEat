ALTER TABLE "profile" RENAME COLUMN "defaultHouseholdId" TO "default_household_id";--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "profile_defaultHouseholdId_household_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_default_household_id_household_id_fk" FOREIGN KEY ("default_household_id") REFERENCES "public"."household"("id") ON DELETE cascade ON UPDATE no action;