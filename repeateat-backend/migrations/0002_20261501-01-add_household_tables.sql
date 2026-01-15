CREATE TABLE "household" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "household_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "household_recipe" (
	"household_id" integer NOT NULL,
	"recipe_id" integer NOT NULL,
	CONSTRAINT "household_recipe_household_id_recipe_id_pk" PRIMARY KEY("household_id","recipe_id")
);
--> statement-breakpoint
CREATE TABLE "household_user" (
	"household_id" integer NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "household_user_household_id_user_id_pk" PRIMARY KEY("household_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_ingredient_id_pk" PRIMARY KEY("recipe_id","ingredient_id");--> statement-breakpoint
ALTER TABLE "household_recipe" ADD CONSTRAINT "household_recipe_household_id_household_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."household"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "household_recipe" ADD CONSTRAINT "household_recipe_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "household_user" ADD CONSTRAINT "household_user_household_id_household_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."household"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "household_user" ADD CONSTRAINT "household_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;