import { Book } from "./Book";

export interface BooksByGenre {
    id?: number | undefined,
    name: string,
    books: Book[],
}