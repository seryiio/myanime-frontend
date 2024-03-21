import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnimesByGenreId } from "../../services/GenreService";
import { GenreDetails } from "../../interfaces/GenreDetails";

const ListAnimesByGenre = () => {

    const id = useParams().id;

    const [animesByGenreId, setAnimesByGenreId] = useState<GenreDetails | undefined>(undefined);
    useEffect(() => {
        getAnimesByGenreId(id, setAnimesByGenreId);
    }, []);

    console.log(animesByGenreId);

    return (
        <div className="flex flex-col h-full gap-y-12 p-4">
            <h1 className="text-center">{animesByGenreId?.name}</h1>
            <Suspense fallback={<div>Cargando...</div>}>
                <div className="grid grid-cols-auto-col gap-x-4 gap-y-12">
                    {
                        animesByGenreId?.animes && animesByGenreId.animes.length > 0 ? (
                            animesByGenreId?.animes.map((anime) => (
                                <Link reloadDocument to={`/animes/${anime.id}`} key={anime.id} className="w-[10em] h-[14em]">
                                    {
                                        anime.seasons.map((season) => (
                                            <picture key={season.id} className="w-[10em] h-[10em]">
                                                <img src={season.image} className="w-full h-full object-fill" alt="" />
                                            </picture>
                                        ))
                                    }
                                    <div className="h-5 truncate">
                                        <p>{anime.title_english}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex justify-center items-start">
                                <h2 className="text-white">No hay animes disponibles</h2>
                            </div>
                        )
                    }
                </div>
            </Suspense>
        </div>
    )
}

export default ListAnimesByGenre;