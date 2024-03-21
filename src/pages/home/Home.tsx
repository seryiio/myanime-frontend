import { Link } from 'react-router-dom';
import './Home.scss'
import { CardAnime } from '../../components/card/CardAnime';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { getLastSeasonByAnime } from '../../services/AnimeService';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
import { AnimeDetails } from '../../interfaces/AnimeDetails';
import { Genre } from '../../interfaces/Genre';
import { getGenres } from '../../services/GenreService';

export const Home = () => {

    const [genres, setGenres] = useState<Genre[]>([]);
    const [lastSeasonByAnime, setLastSeasonByAnime] = useState<AnimeDetails[]>([]);

    useEffect(() => {
        getLastSeasonByAnime(setLastSeasonByAnime);
        getGenres(setGenres);
    }, []);

    return (
        <>
            <Suspense fallback={<div className='bg-white'>Cargando...</div>}>
                <Swiper centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }} pagination={true} modules={[Autoplay, Pagination]} className="swiper-carousel-home">
                    {
                        lastSeasonByAnime.map((anime) => (
                            <SwiperSlide key={anime.id} className='swiper-carousel-home__slide'>
                                <div className='swiper-carousel-home__slide--content'>
                                    <div className='opacity'></div>
                                    <div className="section-1__description">
                                        <div className="section-1__description--content">
                                            <div className="title">
                                                <img src={anime.logo_image} alt={anime.title_english} />
                                            </div>
                                            <p className='p-8 w-full h-32 text-ellipsis overflow-hidden'>{anime.synopsis}</p>
                                            <Link reloadDocument className='button' to={`/animes/${anime.id}`}>Ver anime</Link>
                                        </div>
                                    </div>
                                    <div className="section-1__img">
                                        {
                                            anime.seasons.map((season) =>
                                                <Fragment key={season.id}>
                                                    <img src={season.cover_image_secondary} alt={season.title_english} />
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Suspense>
            <section className='section-2'>
                <h1 className='p-2'>TOP Animes Winter 2024</h1>
                <div className="section-2__slide">
                    <CardAnime props={'WINTER'}/>
                </div>
            </section>
            <section className='section-3'>
                <h1>Mi Lista</h1>
                <CardAnime props={'WINTER'}/>
            </section>
            <section className='section-4'>
                <h1>Nuevos Episodios</h1>
                <CardAnime props={true}/>
            </section>
            {
                genres.map(genre => (
                    <section className='section-genres'>
                        {
                            <Fragment key={genre.id}>
                                <h1>{genre.name}</h1>
                                <CardAnime props={genre.name} />
                            </Fragment>
                        }
                    </section>
                ))
            }
        </>
    )
}

export default Home;