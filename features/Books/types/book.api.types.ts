export interface OpenLibraryAuthorRef {
    author: { key: string };
    type: { key: string };
}

export interface OpenLibraryWork {
    key: string;
    title: string;
    description?: string;
    first_publish_date?: string;
    subjects?: string[];
    authors: OpenLibraryAuthorRef[];
    covers?: number[];
    links?: { title: string; url: string; type: { key: string } }[];
    type: { key: string };
    latest_revision: number;
    revision: number;
    created: { type: string; value: string };
    last_modified: { type: string; value: string };
}

export interface OpenLibraryEdition {
    key: string;
    title: string;
    subtitle?: string;
    full_title?: string;
    publishers: string[];
    publish_date?: string;
    isbn_13?: string[];
    isbn_10?: string[];
    covers?: number[];
    languages: { key: string }[];
    subjects?: string[];
    number_of_pages?: number;
    source_records?: string[];
    works: { key: string }[];
    type: { key: string };
    latest_revision: number;
    revision: number;
    created: { type: string; value: string };
    last_modified: { type: string; value: string };
}

export interface OpenLibraryEditionsResponse {
    links: {
        self: string;
        work: string;
        next?: string;
        prev?: string;
    };
    size: number;
    entries: OpenLibraryEdition[];
}

export interface OpenLibraryAuthor {
    key: string;
    name: string;
    personal_name?: string;
    birth_date?: string;
    death_date?: string;
    bio?: string | { type: string; value: string };
}
