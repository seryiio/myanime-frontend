import axios from "axios";
import { Anime } from "../interfaces/Anime";
import { AnimeGenre } from "../interfaces/AnimeGenre";

export const urlAnimes = 'http://192.168.1.89:8080/api/v1/animes';
export const urlAnimesGenres = 'http://192.168.1.89:8080/api/v1/animesGenres';


/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE TODOS LOS ANIMES
 */
export const getAnimes = async (setAnimes: React.Dispatch<React.SetStateAction<Anime[]>>) => {
    try {
        const response = await axios.get(urlAnimes);
        setAnimes(response.data);
    } catch (error) {
        console.error('Error al obtener animes:', error);
    }
};

/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE TODOS LOS ANIMES CON SUS RESPECTIVOS GENEROS
 */
export const getAnimeGenres = async (setAnimeGenres: React.Dispatch<React.SetStateAction<Anime[]>>) => {
    const animes = await axios.get(urlAnimesGenres);
    setAnimeGenres(animes.data);
    console.log(animes.data);
}

/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE UN ANIME POR SU ID CON SUS RESPECTIVOS GENEROS
 */
export const getAnimeGenresById = async (
    animeId: string | undefined,
    setAnimeGenresById: React.Dispatch<React.SetStateAction<Anime | null>>
) => {
    try {
        const response = await axios.get(`${urlAnimes}/${animeId}/genres`);
        setAnimeGenresById(response.data);
    } catch (error) {
        console.error('Error al obtener géneros del anime por ID:', error);
    }
};
