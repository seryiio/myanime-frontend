import { Anime } from "./Anime";
import { Book } from "./Book";
import { Season } from "./Season";

export interface IMyListDetails {
    id?: number,
    favorite: string,
    status: string,
    chapter: number,
    userId: number,
    season: Season,
    volume: Book,
}

export interface IMyList {
    id?: number,
    favorite: string,
    status: string,
    chapter?: number,
    userId: number,
    seasonId?: number,
    volumeId?: number,
}