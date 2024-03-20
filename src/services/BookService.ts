import axios from "axios";
import { Book } from "../interfaces/Book";

export const URL_BOOK = 'https://myanime-api.onrender.com//api/v1/books';

/**
 * 
 * *FUNCION QUE SIRVE PARA RECOGER LOS DATOS DE TODOS LOS ANIMES
 */
export const getBooks = async (setBooks: React.Dispatch<React.SetStateAction<Book[]>>) => {
    try {
        const response = await axios.get(URL_BOOK);
        setBooks(response.data);
    } catch (error) {
        console.error('Error al obtener libros:', error);
    }
};