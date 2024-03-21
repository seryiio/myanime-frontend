import axios from "axios";
import { Anime } from "../interfaces/Anime";
import { Season } from "../interfaces/Season";
import { AnimeDetails } from "../interfaces/AnimeDetails";

export const URL_ANIME = `https://myanime-api.onrender.com/api/v1/animes`;
export const URL_BOOKS = `https://myanime-api.onrender.com/api/v1/books`;

/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE TODOS LOS ANIMES
 */
export const getAnimes = async (setAnimes: React.Dispatch<React.SetStateAction<Anime[]>>) => {
    try {
        const response = await axios.get(URL_ANIME);
        setAnimes(response.data);
    } catch (error) {
        console.error('Error al obtener animes:', error);
    }
};


/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE UN ANIME POR SU ID CON SUS RESPECTIVOS GENEROS
 */
export const getAnimeById = async (
    animeId: string | undefined,
    setAnimeGenresById: React.Dispatch<React.SetStateAction<Anime | null>>
) => {
    try {
        const response = await axios.get(`${URL_ANIME}/${animeId}`);
        setAnimeGenresById(response.data);
    } catch (error) {
        console.error('Error al obtener géneros del anime por ID:', error);
    }
};

/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE UN ANIME POR SU ID CON SUS RESPECTIVOS GENEROS
 */
export const getSeasonsByAnimeId = async (
    animeId: string | undefined,
    setAnimeSeasonsById: React.Dispatch<React.SetStateAction<Season[]>>
) => {
    try {
        const response = await axios.get(`${URL_ANIME}/${animeId}/seasons`);
        setAnimeSeasonsById(response.data);
    } catch (error) {
        console.error('Error al obtener las temporadas del anime por ID:', error);
    }
};

export const getLastSeasonByAnime = async (setLastSeasonByAnime: React.Dispatch<React.SetStateAction<AnimeDetails[]>>) => {
    try {
        const response = await axios.get(`${URL_ANIME}/lastseason`);
        setLastSeasonByAnime(response.data);
    } catch (error) {
        console.error('Error al obtener la ultima temporada de cada anime:', error);
    }
};

export const getLastSeasonByAnimeId = async (animeId: string | undefined, setLastSeasonByAnimeId: React.Dispatch<React.SetStateAction<AnimeDetails | undefined>>) => {
    try {
        const response = await axios.get(`${URL_ANIME}/${animeId}/lastseason`);
        setLastSeasonByAnimeId(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('Error al obtener la ultima temporada de cada anime:', error);
    }
};

/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE UNA TEMPORADA POR SU ID DEPENDIENDO DEL ANIME SELECCIONADO
 */
export const getSeasonBySeasonId = async (animeId: string | undefined,
    seasonId: string | undefined,
    setSeasonById: React.Dispatch<React.SetStateAction<Season | null>>
) => {
    try {
        const response = await axios.get(`${URL_ANIME}/${animeId}/seasons/${seasonId}`);
        setSeasonById(response.data);
    } catch (error) {
        console.error('Error al obtener las temporadas del anime por ID:', error);
    }
};

//USE WITH BOOK ROUTE
export const getAnimesByBookId = async (bookId: string | undefined, setAnimesByBookId: React.Dispatch<React.SetStateAction<Anime[]>>) => {
    try {
        const response = await axios.get(URL_BOOKS + `/${bookId}` + `/animes`);
        setAnimesByBookId(response.data);
    } catch (error) {
        console.error('Error al obtener la lista de animes de este libro', error);
    }
}
