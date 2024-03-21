import axios from "axios";
import { Genre } from "../interfaces/Genre";
import { Anime } from "../interfaces/Anime";
import { GenreDetails } from "../interfaces/GenreDetails";

export const URL_GENRES = 'https://myanime-api.onrender.com/api/v1/genres';
export const URL_GENRE_BOOKS = 'https://myanime-api.onrender.com/api/v1/books/genres';

export const getGenres = async (setGenres: React.Dispatch<React.SetStateAction<Genre[]>>) => {
    const genres = await axios.get(URL_GENRES);
    setGenres(genres.data);
}

// export const getAnimesByGenre = async (genreId:string | undefined,setAnimesByGenres: React.Dispatch<React.SetStateAction<AnimesByGenre | undefined>>) => {
//     const genres = await axios.get(urlGenres + `/${genreId}/animes`);
//     setAnimesByGenres(genres.data);
// }

export const getAnimesByGenreId = async (genreId:string | undefined,setAnimesByGenreId: React.Dispatch<React.SetStateAction<GenreDetails | undefined>>) => {
    const genres = await axios.get(URL_GENRES + `/${genreId}/animes`);
    setAnimesByGenreId(genres.data);
}


export const getBooksByGenreId = async (genreId:string | undefined,setBooksByGenreId: React.Dispatch<React.SetStateAction<Anime | undefined>>) => {
    const genres = await axios.get(URL_GENRES + `/${genreId}/books`);
    setBooksByGenreId(genres.data);
}