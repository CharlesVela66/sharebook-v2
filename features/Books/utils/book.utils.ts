import { Book } from "@/db/schema";
import { OpenLibraryEdition, OpenLibraryEditionsResponse, OpenLibraryWork } from "../types/book.api.types";
import { BookCard, RawBookData } from "../types/book.types";

function parsePublishYear(publishDate?: string): number | null {
    const match = publishDate?.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : null;
}

function getFirstEdition(entries: OpenLibraryEdition[]): OpenLibraryEdition {
    return entries.reduce((earliest, edition) => {
        const year = parsePublishYear(edition.publish_date);
        if (year === null) return earliest;

        const earliestYear = parsePublishYear(earliest.publish_date);
        return earliestYear === null || year < earliestYear ? edition : earliest;
    }, entries[0]);
}

function getModeYear(entries: OpenLibraryEdition[]): number | null {
    const yearCounts = new Map<number, number>();

    for (const edition of entries) {
        const year = parsePublishYear(edition.publish_date);
        if (year === null) continue;

        yearCounts.set(year, (yearCounts.get(year) ?? 0) + 1);
    }

    let modeYear: number | null = null;
    let modeCount = 0;
    for (const [year, count] of yearCounts) {
        if (count > modeCount) {
            modeYear = year;
            modeCount = count;
        }
    }

    return modeYear;
}

function determineYear(bookWork: OpenLibraryWork, entries: OpenLibraryEdition[]): number {
    return parsePublishYear(bookWork.first_publish_date) ?? getModeYear(entries) ?? 0;
}

export function convertRawBookDataToBookCard(data: RawBookData[]): BookCard[] {
    const books: BookCard[] = [];
    for (const b of data) {
        if (!b.key) continue;
        const book: BookCard = {
            work_id: b.key.slice(7) ,
            author: b.author_name ? b.author_name.join(", ") : "Anonymous",
            title: b.title ? b.title : "Untitled",
            image_url: b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : "/book-placeholder",
        }
        books.push(book);
    }
    return books;
}

export function prepareApiBookForDb(bookWork: OpenLibraryWork, bookEditions: OpenLibraryEditionsResponse, authorNames: string[], id: string){
    const firstEdition = getFirstEdition(bookEditions.entries);
    const coverId = firstEdition.covers?.[0] ?? bookWork.covers?.[0];

    const bookObject: Omit<Book, "id"> = {
        title: bookWork.title,
        description: bookWork.description ?? "",
        author: authorNames.join(", "),
        publisher: firstEdition.publishers && firstEdition.publishers.length > 0 ? firstEdition.publishers.join(", ") : "",
        isbn: firstEdition.isbn_13?.[0] ?? "",
        page_count: null,
        year: determineYear(bookWork, bookEditions.entries),
        genre: null,
        image_url: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : "",
        language: firstEdition.languages && firstEdition.languages.length > 0
                    ? firstEdition.languages[0].key.split("/").pop() ?? ""
                    : "",
        open_library_work_id: id,
        open_library_edition_id: firstEdition.key.split("/").pop() ?? "",
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    }

    return bookObject;
}