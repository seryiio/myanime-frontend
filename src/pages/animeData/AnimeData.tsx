import { useEffect, useState } from 'react';

import './AnimeData.scss'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Link, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { AnimeGenre } from '../../interfaces/AnimeGenre';
import { getAnimeGenresById, getAnimeSeasonsById } from '../../services/AnimeService';
import { Anime } from '../../interfaces/Anime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { Season } from '../../interfaces/Season';

export const AnimeData = () => {

    const ADD_LIST = "Agregar a mi lista";
    const ADD_FAVORITE = "Agregar a mis favoritos";

    const animeId = useParams().id;

    const [animeGenresById, setAnimeGenresById] = useState<Anime | null>(null);
    const [animeSeasonById, setAnimeSeasonsById] = useState<Season[]>([]);

    useEffect(() => {
        getAnimeGenresById(animeId, setAnimeGenresById);
        getAnimeSeasonsById(animeId, setAnimeSeasonsById);
    }, [animeId]);
    return (
        <>
            <section className="grid lg:grid-cols-3-max-content-center w-full h-max gap-4">
                <div className='relative top-0 left-0 flex justify-center items-center w-full h-full p-4'>
                    <picture className='z-30'>
                        <img src={animeGenresById?.image} className='object-cover h-full w-64' alt="" />
                    </picture>
                    <div className='opacity absolute top-0 left-0 w-full h-full bg-transparent/40 z-20'></div>
                    <div className='absolute top-0 left-0 w-full h-full blur-sm z-10'>
                        <img src={animeGenresById?.image} className='w-full h-full' alt="" />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center text-center gap-2 flex-1 p-4'>
                    <motion.div
                        className='title flex-col flex justify-center items-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <img src={animeGenresById?.logo_image} width={350} alt="" /></motion.div>
                    <div className="save-anime flex justify-between items-center gap-y-2 gap-x-10">
                        <a href="" className='flex justify-center items-center gap-2'>
                            <FontAwesomeIcon icon={faBookmark} style={{ color: "#ffffff", }} />
                            <h3>{ADD_FAVORITE}</h3>
                        </a>
                        <a href="" className='flex justify-center items-center gap-2'>
                            <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff", }} />
                            <h3>{ADD_LIST}</h3>
                        </a>
                    </div>
                    <div className="genres">
                        {animeGenresById?.genres.map((genre) => (
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
                <p>{animeGenresById?.synopsis}</p>
            </section>
            <section className=" content w-full px-4 pt-8">
                <h1>Temporadas</h1>
                {
                    animeSeasonById.length ? (
                        <Swiper
                            freeMode={true}
                            breakpoints={{
                                120: {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                                720: {
                                    slidesPerView: 4,
                                    spaceBetween: 20
                                },
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 20
                                }
                            }}
                            modules={[FreeMode, Pagination]}
                            className="swiper-card ml-0 mr-0"
                        >
                            {
                                animeSeasonById.map((season) => (
                                    <SwiperSlide key={season.id} className='content-swiper-slide__card'>
                                        <Link to={`seasons/${season.id}`}>
                                            <div className="card">
                                                <div className="card__img">
                                                    <img src={season.image} alt={season.title_english} />
                                                </div>
                                                <div className="card__description">
                                                    {season.title_english}
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper >
                    ) : <div className='text-white'>No hay registro de temporadas</div>}
            </section>
        </>
    )
}
export default AnimeData;