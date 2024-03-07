import { Link } from 'react-router-dom';
import './Home.scss'
import { CardAnime } from '../../components/card/CardAnime';
import { Anime } from '../../interfaces/Anime';
import { useEffect, useState } from 'react';
import { getAnimes, getSeasonsByAnimeId } from '../../services/AnimeService';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Season } from '../../interfaces/Season';
import { getLastSeasonWithDataAnime } from '../../services/SeasonService';
import { AnimeDetails } from '../../interfaces/AnimeDetails';

export const Home = () => {

    const [animes, setAnimes] = useState<Anime[]>([]);
    const [animeId, setAnimeId] = useState<number | undefined>();
    const [lastSeasonWithDataAnime, setLastSeasonWithDataAnime] = useState<AnimeDetails[]>([]);

    console.log(lastSeasonWithDataAnime);

    useEffect(() => {
        getAnimes(setAnimes);
        getLastSeasonWithDataAnime(setLastSeasonWithDataAnime);
    }, []);

    return (
        <>
            <section className='section-1'>
                <Swiper centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }} pagination={true} modules={[Autoplay, Pagination]} className="swiper-section-1">
                    {
                        lastSeasonWithDataAnime.map((anime) => (
                            <SwiperSlide key={anime.id} className='content-swiper-slide'>
                                <div className='opacity'></div>
                                <div className="section-1__description">
                                    <div className="section-1__description--content">
                                        <div className="title text-center">
                                            <img src={anime.logo_image} alt={anime.title_english} />
                                        </div>
                                        <Link className='button' to={`/animes/${anime.id}`}>Ver anime</Link>
                                    </div>
                                </div>
                                <div className="section-1__img">
                                    {
                                        anime.seasons.map((season) =>
                                            <img src={season.cover_image_secondary} alt={season.title_english} />
                                        )
                                    }
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </section>
            <section className='section-2'>
                <h1>TOP Animes Winter 2024</h1>
                <div className="section-2__slide">
                    <CardAnime />
                </div>
            </section>
            <section className='section-3'>
                <h1>Mi Lista</h1>
                <CardAnime />
            </section>
            <section className='section-4'>
                <h1>Nuevos Episodios</h1>
                <CardAnime />
            </section>
        </>
    )
}

export default Home;