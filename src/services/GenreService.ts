import axios from "axios";
import { useState } from "react";
import { Genre } from "../interfaces/Genre";
import { AnimesByGenre } from "../interfaces/AnimesByGenre";

export const urlGenres = 'http://192.168.1.89:8080/api/v1/genres';

export const getGenres = async (setGenres: React.Dispatch<React.SetStateAction<Genre[]>>) => {
    const genres = await axios.get(urlGenres);
    setGenres(genres.data);
}

export const getAnimesByGenre = async (genreId:string | undefined,setAnimesByGenres: React.Dispatch<React.SetStateAction<AnimesByGenre | undefined>>) => {
    const genres = await axios.get(urlGenres + `/${genreId}/animes`);
    setAnimesByGenres(genres.data);
}