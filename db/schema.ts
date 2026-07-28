import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title").notNull(),
    description: text("description").notNull(),
    author: varchar("author").notNull(),
    publisher: varchar("publisher").notNull(),
    isbn: varchar("isbn", { length: 13 }).notNull(),
    page_count: integer("page_count"),
    year: integer("year").notNull(),
    genre: varchar("genre"),
    image_url: varchar("image_url"),
    language: varchar("language").notNull(),
    open_library_work_id: varchar("open_library_work_id").notNull(),
    open_library_edition_id: varchar("open_library_edition_id"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})

export type Book = typeof books.$inferSelect;