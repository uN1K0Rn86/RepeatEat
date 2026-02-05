ALTER TABLE "recipe" ADD COLUMN "private" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_name_unique" UNIQUE("name");