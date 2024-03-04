import { Genre } from "./Genre";

export interface Anime {
    id?: number,
    title: string,
    type: string,
    description: string,
    year: string,
    image: string,
    cover_image: string,
    url: string,
    url_trailer: string,
    status?: boolean,
    genres: Genre[]
}