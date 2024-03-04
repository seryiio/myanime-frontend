import { useEffect, useState } from 'react';

import './AnimeData.scss'
import { useParams } from 'react-router-dom';
import { AnimeGenre } from '../../interfaces/AnimeGenre';
import { getAnimeGenresById } from '../../services/AnimeService';
import { Anime } from '../../interfaces/Anime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';

export const AnimeData = () => {

    const ADD_LIST = "Agregar a mi lista";
    const ADD_FAVORITE = "Agregar a mis favoritos";

    const animeId = useParams().id;
    const [animeGenresById, setAnimeGenresById] = useState<Anime | null>(null);

    useEffect(() => {
        getAnimeGenresById(animeId, setAnimeGenresById);
    }, [animeId]);

    console.log(animeGenresById);

    return (
        <>
            <section className=" w-full h-max bg-slate-500">
                <picture className='flex w-full h-full bg-red-400'>
                    <img src={animeGenresById?.cover_image} className='object-cover h-full w-full' alt="" />
                </picture>
            </section>
            <section className="relative -top-1/4 lg:-top-[75%] left-0 content w-full px-4 pt-8 bg-gradient-to-t from-black from-75%">
                <div className="title">
                    <h1 className=''>{animeGenresById?.title}</h1>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8'>
                    <div className='flex flex-col flex-wrap gap-y-2'>
                        <div className="ranking">
                            <h2>Ranking del anime</h2>
                        </div>
                        <div className="save-anime flex flex-wrap justify-between items-center gap-y-2">
                            <a href="" className='flex justify-center items-center gap-2'>
                            <FontAwesomeIcon icon={faBookmark} style={{color: "#ffffff", }} />
                                <h3>{ADD_FAVORITE}</h3>
                            </a>
                            <a href="" className='flex justify-center items-center gap-2'>
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff", }} />
                                <h3>{ADD_LIST}</h3>
                            </a>
                        </div>
                        <div className="description">
                            <p>{animeGenresById?.description}</p>
                        </div>
                        <div className="genres">
                            {animeGenresById?.genres.map((genre) => (
                                <span key={genre.id} className="w-max bg-cyan-400 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                    {genre.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-center items-start aspect-video bg-slate-400'>
                        <iframe
                            className='w-full h-full'
                            src={animeGenresById?.url_trailer}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                </div>
            </section>
        </>
    )
}
export default AnimeData;