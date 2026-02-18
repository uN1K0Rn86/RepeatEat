CREATE TYPE "public"."status" AS ENUM('accepted', 'pending', 'declined');--> statement-breakpoint
CREATE TABLE "household_invite" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "household_invite_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"household_id" integer NOT NULL,
	"invited_by" text NOT NULL,
	"email" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "household_invite" ADD CONSTRAINT "household_invite_household_id_household_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."household"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "household_invite" ADD CONSTRAINT "household_invite_invited_by_user_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;