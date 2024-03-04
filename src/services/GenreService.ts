import axios from "axios";
import { useState } from "react";
import { Genre } from "../interfaces/Genre";

export const urlGenres = 'http://192.168.1.89:8080/api/v1/genres';

export const getGenres = async (setGenres: React.Dispatch<React.SetStateAction<Genre[]>>) => {
    const genres = await axios.get(urlGenres);
    setGenres(genres.data);
}