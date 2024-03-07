import axios from "axios";
import { Song } from "../interfaces/Song";

export const URL_SEASON = 'http://192.168.1.89:8080/api/v1/seasons';

export const getSongsBySeasonId = async (seasonId: string | undefined, setSongBySeasonId: React.Dispatch<React.SetStateAction<Song[]>>) => {
    try {
        const response = await axios.get(URL_SEASON + `/${seasonId}` + `/songs`);
        setSongBySeasonId(response.data);
    } catch (error) {
        console.error('Error al obtener la lista de canciones de esta temporada', error);
    }
}