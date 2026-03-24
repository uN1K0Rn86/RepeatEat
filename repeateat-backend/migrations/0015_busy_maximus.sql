ALTER TABLE "meal_plan_item" DROP CONSTRAINT "meal_plan_item_recipe_id_recipe_id_fk";
--> statement-breakpoint
ALTER TABLE "household" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meal_plan_item" ADD CONSTRAINT "meal_plan_item_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;