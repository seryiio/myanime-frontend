import axios from "axios";
import { Genre } from "../interfaces/Genre";
import { Anime } from "../interfaces/Anime";

export const URL_GENRES = 'https://myanime-backend.onrender.com/api/v1/genres';
export const URL_GENRE_BOOKS = 'https://myanime-backend.onrender.com/api/v1/books/genres';

export const getGenres = async (setGenres: React.Dispatch<React.SetStateAction<Genre[]>>) => {
    const genres = await axios.get(URL_GENRES);
    setGenres(genres.data);
}

// export const getAnimesByGenre = async (genreId:string | undefined,setAnimesByGenres: React.Dispatch<React.SetStateAction<AnimesByGenre | undefined>>) => {
//     const genres = await axios.get(urlGenres + `/${genreId}/animes`);
//     setAnimesByGenres(genres.data);
// }

export const getBooksByGenre = async (genreId:string | undefined,setAnimesByGenres: React.Dispatch<React.SetStateAction<Anime | undefined>>) => {
    const genres = await axios.get(URL_GENRE_BOOKS + `/${genreId}/animes`);
    setAnimesByGenres(genres.data);
}