import { Genre } from "./Genre";
import { Volume } from "./Volume";

export interface BookDetails {
    id?: number,
    title_japanese: string,
    title_english: string,
    synopsis: string,
    logo_image: string,
    genres: Genre[],
    volumes: Volume[]
}