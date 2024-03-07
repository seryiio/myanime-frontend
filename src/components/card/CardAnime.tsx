import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './Card.scss'

import { FreeMode, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Anime } from '../../interfaces/Anime';
import { getAnimes } from '../../services/AnimeService';

export const CardAnime = () => {

    const [animes, setAnimes] = useState<Anime[]>([]);

    useEffect(() => {
        getAnimes(setAnimes);
    }, []);


    return (
        <>
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
                    animes.map((anime) => (
                        <>
                            <SwiperSlide key={anime.id} className='content-swiper-slide__card'>
                                <a href={`/animes/${anime.id}`}>
                                    <div className="card">
                                        <div className="card__img">
                                            <img src={anime.image} alt={anime.title_english} />
                                        </div>
                                        <div className="card__description">
                                            {anime.title_english}
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>

                        </>
                    ))
                }
            </Swiper >
        </>
    )
}

export default CardAnime;