import { Suspense, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getLastSeasonByAnime } from "../../services/AnimeService";
import { AnimeDetails } from "../../interfaces/AnimeDetails";
import { Card, Skeleton } from "@nextui-org/react";

const ListAnimes = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const [animes, setAnimes] = useState<AnimeDetails[]>([]);

    useEffect(() => {
        getLastSeasonByAnime(setAnimes);
    }, []);


    const anime = searchParams.get('anime');

    function handleSubmit() {
        setSearchParams({ anime: 'hola' });
    }
    return (
        <>
            <button onClick={handleSubmit} className="text-white">Enviar</button>
            {
                anime?.search ? <h1>a</h1> : <h2>hola</h2>
            }
            <div className="grid grid-cols-auto-col gap-x-4 gap-y-20 p-2">
                {
                    animes.map(anime => (
                        <>
                            <Suspense fallback={
                                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                                    <Skeleton className="rounded-lg">
                                        <div className="h-24 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </Card>}>
                                {
                                    <Link reloadDocument to={`/animes/${anime.id}`} key={anime.id} className="w-[10em] h-[14em] bg-white">
                                        {
                                            anime.seasons.map((season) => (
                                                <picture key={season.id} className="w-[10em] h-[10em]">
                                                    <img src={season.image} className="w-full h-full object-fill" alt="" />
                                                </picture>
                                            ))
                                        }
                                        <div className="w-full h-[4em]">
                                            <p>{anime.title_english}</p>
                                        </div>
                                    </Link>
                                }
                            </Suspense>
                        </>
                    ))
                }
            </div>

        </>
    )
}

export default ListAnimes;