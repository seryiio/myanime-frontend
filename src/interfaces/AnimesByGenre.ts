import { Anime } from "./Anime";

export interface AnimesByGenre {
    id?: number | undefined,
    name: string,
    animes: Anime[],
}