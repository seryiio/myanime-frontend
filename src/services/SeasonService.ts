import axios from "axios";
import { Season } from "../interfaces/Season";
import { URL_ANIME } from "./AnimeService";

export const URL_SEASON = 'https://myanime-backend.onrender.com/api/v1/seasons';
export const URL_LAST_SEASON = 'https://myanime-backend.onrender.com/api/v1/animes/lastseason';

export const getAllSeasons = async (setSeasons: React.Dispatch<React.SetStateAction<Season[]>>) => {
    try {
        const response = await axios.get(URL_SEASON);
        setSeasons(response.data);
    } catch (error) {
        console.error('Error al obtener la lista de temporadas', error);
    }
}

export const getAllSeasonsByAnimeId = async (animeId: string | undefined, setSeasonsById: React.Dispatch<React.SetStateAction<Season[]>>) => {
    try {
        const response = await axios.get(URL_ANIME + `/${animeId}/seasons`);
        setSeasonsById(response.data);
    } catch (error) {
        console.error('Error al obtener la lista de temporadas de este anime', error);
    }
}