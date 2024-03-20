import axios from "axios";

export const URL_LOGIN = "http://localhost:3000/api/v1/login";
export const URL_REGISTER = "http://localhost:3000/api/v1/register";

// export const getLogin = async (setLogin: React.Dispatch<React.SetStateAction<Genre[]>>) => {
//     const genres = await axios.get(URL_LOGIN);
//     setLogin(genres.data);
// }