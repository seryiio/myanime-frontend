import { AnimeGenre } from "./BookGenre";

export interface Genre {
    id?: number | undefined,
    name: string,
    animes_genre: AnimeGenre
}