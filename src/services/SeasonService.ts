import axios from "axios";
import { Season } from "../interfaces/Season";

export const URL_SEASON = 'http://192.168.1.89:8080/api/v1/seasons';
export const URL_SEASON_BY_ANIME = 'http://192.168.1.89:8080/api/v1/animes';

export const getAllSeasons = async (setSeasons: React.Dispatch<React.SetStateAction<Season[]>>) => {
    try {
        const response = await axios.get(URL_SEASON);
        setSeasons(response.data);
    } catch (error) {
        console.error('Error al obtener la lista de temporadas', error);
    }
}


export const getAllSeasonsById = async (animeId: string | undefined,setSeasonsById: React.Dispatch<React.SetStateAction<Season[]>>) => {
    try {
        const response = await axios.get(URL_SEASON_BY_ANIME + `/${animeId}`+ `/seasons`);
        setSeasonsById(response.data);
    } catch (error) {
        console.error('Error al obtener la lista de temporadas de este anime', error);
    }
}