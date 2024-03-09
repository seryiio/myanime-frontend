import { useEffect, useState } from "react";

import { Genre } from "../../interfaces/Genre";
import { getGenres } from "../../services/GenreService";
import { Link } from "react-router-dom";

const ListGenres = () => {
    const [listGenres, setListGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getGenres(setListGenres);
    }, []);

    return (
        <>
            <div className="grid grid-cols-auto-col gap-x-4 gap-y-8 p-2 text-white">
                {
                    listGenres.map(genre => (
                        <Link to={`${genre.id}`} className="flex justify-center items-center rounded-md bg-cyan-400/5">
                            {genre.name}
                        </Link>
                    ))
                }
            </div>
        </>
    )
}
export default ListGenres;