ALTER TABLE "profile" DROP CONSTRAINT "profile_default_household_id_household_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_default_household_id_household_id_fk" FOREIGN KEY ("default_household_id") REFERENCES "public"."household"("id") ON DELETE set null ON UPDATE no action;