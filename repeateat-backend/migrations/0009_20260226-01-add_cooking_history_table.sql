CREATE TABLE "cooking_history" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cooking_history_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"household_id" integer NOT NULL,
	"recipe_id" integer NOT NULL,
	"cooked_at" timestamp DEFAULT now() NOT NULL,
	"cooked_by" text,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "cooking_history" ADD CONSTRAINT "cooking_history_household_id_household_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."household"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cooking_history" ADD CONSTRAINT "cooking_history_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cooking_history" ADD CONSTRAINT "cooking_history_cooked_by_user_id_fk" FOREIGN KEY ("cooked_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;