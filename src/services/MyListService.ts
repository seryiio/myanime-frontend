import axios from "axios";
import { IMyList, IMyListDetails } from "../interfaces/MyList";

export const URL_MY_LIST = 'https://myanime-api.onrender.com/api/v1/mylist';

export const getMyList = async (setMyList: React.Dispatch<React.SetStateAction<IMyList[]>>) => {
    try {
        const response = await axios.get(URL_MY_LIST);
        setMyList(response.data);
    } catch (error) {
        console.error('Error al obtener la lista de animes', error);
    }
}

export const getMyListByUserId = async (userId: string, setMyList: React.Dispatch<React.SetStateAction<IMyListDetails[]>>) => {
    try {
        const response = await axios.get(URL_MY_LIST + `/${userId}`);
        setMyList(response.data);
    } catch (error) {
        console.error('Error al obtener la lista de animes', error);
    }
}