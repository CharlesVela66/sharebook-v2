import { date, integer, pgEnum, pgTable, text, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";

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

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    first_name: varchar("first_name").notNull(),
    last_name: varchar("last_name").notNull(),
    email: varchar("email").notNull(),
    password: varchar("password").notNull(),
    profile_picture: varchar("profile_picture"),
    birthday: date("birthday"),
    nationality: varchar("nationality"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})

export type User = typeof users.$inferSelect;

export const subjects = pgTable("subjects", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull().unique(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})

export const Subject = typeof subjects.$inferSelect;

export const bookSubjects = pgTable("book_subjects", {
    id: uuid("id").defaultRandom().primaryKey(),
    book_id: uuid("book_id").references(() => books.id, { onDelete: 'cascade' }),
    subject_id: uuid("subject_id").references(() => subjects.id, { onDelete: 'cascade' }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})

export const BookSubject = typeof bookSubjects.$inferSelect;

export const shelfEnum = pgEnum("shelf_enum", ["Want to read", "Currently reading", "Read"])

export type Shelf = (typeof shelfEnum.enumValues)[number]

export const shelves = pgTable("shelves", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").references(() => users.id, {onDelete: 'cascade'}).notNull(),
    book_id: uuid("book_id").references(() => books.id, { onDelete: 'cascade' }).notNull(),
    shelf: shelfEnum().notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
}, (t) => [
    unique("user_book_id").on(t.user_id, t.book_id),
])

export const Shelves = typeof shelves.$inferSelect;

export const ratings = pgTable("ratings", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").references(() => users.id, {onDelete: 'cascade'}).notNull(),
    book_id: uuid("book_id").references(() => books.id, { onDelete: 'cascade' }).notNull(),
    rating: integer("rating").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
}, (t) => [
    unique("user_book_rating_id").on(t.user_id, t.book_id),
])

export const Rating = typeof ratings.$inferSelect;

export const readingGoals = pgTable("reading_goals", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").references(() => users.id, {onDelete: 'cascade'}).notNull(),
    year: integer("year").notNull(),
    goal: integer("goal").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
}, (t) => [
    unique("user_year_reading_id").on(t.user_id, t.year),
])

export const ReadingGoal = typeof readingGoals.$inferSelect;