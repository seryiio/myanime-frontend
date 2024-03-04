import { Link } from 'react-router-dom';
import './Home.scss'
import { CardAnime } from '../../components/card/CardAnime';
import { Anime } from '../../interfaces/Anime';
import { useEffect, useState } from 'react';
import { getAnimes } from '../../services/AnimeService';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export const Home = () => {

    const [animes, setAnimes] = useState<Anime[]>([]);

    useEffect(() => {
        getAnimes(setAnimes);
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
                        animes.map((anime) => (
                            <SwiperSlide className='content-swiper-slide'>
                                <div className='opacity'></div>
                                <div className="section-1__description">
                                    <div className="section-1__description--content">
                                        <div className="title text-center">
                                            <h1>{anime.title}</h1>
                                        </div>
                                        <div className="description">
                                            <p>{anime.description}</p>
                                        </div>
                                        <Link className='button' to={`/animes/${anime.id}`}>Ver anime</Link>
                                    </div>
                                </div>
                                <div className="section-1__img">
                                    <img src={anime.cover_image} alt="" />
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