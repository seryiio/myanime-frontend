import { Anime } from "./Anime";
import { Book } from "./Book";
import { Season } from "./Season";

export interface IMyList {
    id: number,
    favorite: string,
    status: string,
    anime: Anime,
    season: Season,
    book: Book,
}