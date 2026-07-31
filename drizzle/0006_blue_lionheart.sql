ALTER TABLE "books" DROP CONSTRAINT "books_genre_genres_id_fk";
--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "genre" SET DATA TYPE varchar;
ALTER TABLE "genres" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "genres" CASCADE;--> statement-breakpoint