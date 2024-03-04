import { AnimeGenre } from "./AnimeGenre";

export interface Genre {
    id?: number | undefined,
    name: string,
    animes_genre: AnimeGenre
}