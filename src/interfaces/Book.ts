import { Genre } from "./Genre";

export interface Book {
    id?: number,
    title_japanese: string,
    title_english: string,
    synopsis: string,
    year: number,
    season_year: string,
    book_type: string,
    author: string,
    status: string,
    puntuation?: number,
    genres: Genre[]
}