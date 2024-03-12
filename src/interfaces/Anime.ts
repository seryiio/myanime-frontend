import { Genre } from "./Genre";

export interface Anime {
    id?: number,
    title_japanese: string,
    title_english: string,
    synopsis: string,
    logo_image: string,
    puntuation: number,
    bookId: number,
    genres: Genre[]
}