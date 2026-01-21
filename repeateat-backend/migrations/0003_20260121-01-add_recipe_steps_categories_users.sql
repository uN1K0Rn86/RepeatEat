CREATE TABLE "category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "recipe_category" (
	"recipe_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "recipe_category_recipe_id_category_id_pk" PRIMARY KEY("recipe_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "recipe_step" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recipe_step_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"recipe_id" integer NOT NULL,
	"step_number" integer NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recipe" ADD COLUMN "authorId" text;--> statement-breakpoint
ALTER TABLE "recipe_category" ADD CONSTRAINT "recipe_category_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_category" ADD CONSTRAINT "recipe_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_step" ADD CONSTRAINT "recipe_step_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;