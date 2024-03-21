import { Fragment, useEffect, useState } from 'react';

import './AnimeData.scss'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Link, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { getAnimeById, getLastSeasonByAnimeId, getSeasonsByAnimeId } from '../../services/AnimeService';
import { Anime } from '../../interfaces/Anime';
import { Season } from '../../interfaces/Season';
import { AnimeDetails } from '../../interfaces/AnimeDetails';

export const AnimeData = () => {

    const animeIdParam = useParams().id;

    const [animeId, setAnimeById] = useState<Anime | null>(null);
    const [animeSeasonById, setAnimeSeasonsById] = useState<Season[]>([]);
    const [lastSeasonByAnimeId, setLastSeasonByAnimeId] = useState<AnimeDetails | undefined>();

    useEffect(() => {
        getAnimeById(animeIdParam, setAnimeById);
        getSeasonsByAnimeId(animeIdParam, setAnimeSeasonsById);
        getLastSeasonByAnimeId(animeIdParam, setLastSeasonByAnimeId);
    }, [animeIdParam]);
    return (
        <>
            <section className="grid lg:grid-cols-3-max-content-center w-full h-max gap-4">
                <div className='relative top-0 left-0 flex justify-center items-center w-full h-full p-4'>
                    {
                        lastSeasonByAnimeId && (
                            lastSeasonByAnimeId.seasons && lastSeasonByAnimeId.seasons.map((season) => (
                                <Fragment key={season.id}>
                                    <picture className='z-30'>
                                        <img src={season.image} className='object-cover h-full w-64' alt="" />
                                    </picture>
                                    <div className='opacity absolute top-0 left-0 w-full h-full bg-transparent/40 z-20'></div>
                                    <div className='absolute top-0 left-0 w-full h-full blur-sm z-10'>
                                        <img src={season?.image} className='w-full h-full' alt="" />
                                    </div>
                                </Fragment>
                            ))
                        )
                    }
                </div >
                <div className='flex flex-col justify-center items-center text-center gap-2 flex-1 p-4'>
                    <motion.div
                        className='title flex-col flex justify-center items-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <img src={animeId?.logo_image} width={350} alt="" /></motion.div>
                    <div className="genres">
                        {animeId?.genres?.map((genre) => (
                            <span key={genre.id} className="w-max bg-cyan-400 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                {genre.name}</span>
                        ))}
                    </div>
                </div>
                <div className="ranking flex flex-col justify-start items-center p-4">
                    <h2>Ranking del anime</h2>
                </div>
            </section >
            <section className='description text-left p-4'>
                <h2>Sinopsis</h2>
                <p>{animeId?.synopsis}</p>
            </section>
            <section className=" text-left p-4">
                <h1>Temporadas</h1>
                <div className="grid grid-cols-auto-col gap-x-4 gap-y-12">
                    {
                        animeSeasonById?.length > 0 ? (
                            animeSeasonById?.map((season) => (
                                <Link reloadDocument to={`seasons/${season.id}`}>
                                    {
                                        <picture key={season.id} className="w-[10em] h-[10em]">
                                            <img src={season.image} className="w-full h-full object-fill" alt="" />
                                        </picture>
                                    }
                                    <div className="h-5 truncate">
                                        <p>{season.title_english}</p>
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
            </section>
            
            <section className=" text-left p-4">
                <h1>Libros</h1>
                <div className="grid grid-cols-auto-col gap-x-4 gap-y-12">
                    {
                        animeSeasonById?.length > 0 ? (
                            animeSeasonById?.map((season) => (
                                <Link reloadDocument to={`seasons/${season.id}`}>
                                    {
                                        <picture key={season.id} className="w-[10em] h-[10em]">
                                            <img src={season.image} className="w-full h-full object-fill" alt="" />
                                        </picture>
                                    }
                                    <div className="h-5 truncate">
                                        <p>{season.title_english}</p>
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
            </section>
        </>
    )
}
export default AnimeData;