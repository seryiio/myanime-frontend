import { AnimeDetails } from "./AnimeDetails";

export interface GenreDetails {
    id?: number | undefined,
    name: string,
    animes: AnimeDetails[],
}