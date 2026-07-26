CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"author" varchar NOT NULL,
	"publisher" varchar NOT NULL,
	"isbn" varchar(13) NOT NULL,
	"page_count" integer NOT NULL,
	"year" integer NOT NULL,
	"genre" varchar NOT NULL,
	"image_url" varchar,
	"language" varchar NOT NULL,
	"open_library_work_id" varchar NOT NULL,
	"open_library_edition_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
