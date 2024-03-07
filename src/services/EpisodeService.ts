import { Episodes } from "../interfaces/Episodes"

export const getAllEpisodesBySeason = async (seasonId: string | undefined, setEpisodesBySeasonId: React.Dispatch<React.SetStateAction<Episodes | null>>) => {
    try {

    } catch (error) {
        console.error('Error al obtener los episodios', error);
    }
}