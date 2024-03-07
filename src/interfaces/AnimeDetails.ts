import { Genre } from "./Genre";
import { Season } from "./Season";

export interface AnimeDetails {
    id?: number,
    title_japanese: string,
    title_english: string,
    synopsis: string,
    logo_image: string,
    image: string,
    genres: Genre[],
    seasons: Season[]
}