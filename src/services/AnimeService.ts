import axios from "axios";
import { Anime } from "../interfaces/Anime";
import { Season } from "../interfaces/Season";

export const urlAnimes = 'http://192.168.1.89:8080/api/v1/animes';
export const urlAnimeGenres = 'http://192.168.1.89:8080/api/v1/animegenres';


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
    const animes = await axios.get(urlAnimeGenres);
    setAnimeGenres(animes.data);
}

export const getSeasonsByAnimeId = async (setSeasonsByAnimeId: React.Dispatch<React.SetStateAction<Season[]>>) => {
    const animes = await axios.get(urlAnimeGenres + `/2/seasons`);
    setSeasonsByAnimeId(animes.data);
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
        const response = await axios.get(`${urlAnimeGenres}/${animeId}`);
        setAnimeGenresById(response.data);
    } catch (error) {
        console.error('Error al obtener géneros del anime por ID:', error);
    }
};


/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE UN ANIME POR SU ID CON SUS RESPECTIVOS GENEROS
 */
export const getAnimeSeasonsById = async (
    animeId: string | undefined,
    setAnimeSeasonsById: React.Dispatch<React.SetStateAction<Season[]>>
) => {
    try {
        const response = await axios.get(`${urlAnimeGenres}/${animeId}/seasons`);
        setAnimeSeasonsById(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('Error al obtener las temporadas del anime por ID:', error);
    }
};

/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE UNA TEMPORADA POR SU ID DEPENDIENDO DEL ANIME SELECCIONADO
 */
export const getSeasonsByIdForAnime = async (animeId: string | undefined,
    seasonId: string | undefined,
    setSeasonById: React.Dispatch<React.SetStateAction<Season | null>>
) => {
    try {
        const response = await axios.get(`${urlAnimeGenres}/${animeId}/seasons/${seasonId}`);
        setSeasonById(response.data);
    } catch (error) {
        console.error('Error al obtener las temporadas del anime por ID:', error);
    }
};

