import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './Card.scss'

import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Anime } from '../../interfaces/Anime';
import { getAnimes, getLastSeasonByAnime } from '../../services/AnimeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AnimeDetails } from '../../interfaces/AnimeDetails';

export const CardAnime = () => {

    const [animes, setAnimes] = useState<Anime[]>([]);
    const [lastSeasonByAnime, setLastSeasonByAnime] = useState<AnimeDetails[]>([]);

    useEffect(() => {
        getAnimes(setAnimes);
        getLastSeasonByAnime(setLastSeasonByAnime);
    }, []);

    console.log(lastSeasonByAnime);

    return (
        <>
            <Swiper
                freeMode={true}
                slidesPerView='auto'
                spaceBetween={10}
                navigation={{
                    nextEl: '.swiper-card--btnNext',
                    prevEl: '.swiper-card--btnPrev',
                }}
                modules={[FreeMode, Navigation]}
                className="swiper-card"
            >
                {
                    lastSeasonByAnime.map((anime) => (
                        <>
                            <SwiperSlide key={anime.id} className='swiper-card__slide'>
                                <div className='swiper-card__slide--content'>
                                    <a href={`/animes/${anime.id}`}>
                                        <div className="card">
                                            {
                                                anime.seasons.map((dataseason) => (
                                                    <>
                                                        <div className="card__img">
                                                            <img src={dataseason.image} alt={dataseason.title_english} />
                                                        </div>
                                                        <div className="card__description h-5 truncate">
                                                            {dataseason.title_english}
                                                        </div>
                                                    </>
                                                ))
                                            }

                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                        </>
                    ))
                }
                <button className="swiper-card--btnPrev z-[998]">
                    <FontAwesomeIcon icon={faChevronLeft} size='2xl' style={{ color: 'white' }} />
                </button>
                <button className="swiper-card--btnNext z-[998]">
                    <FontAwesomeIcon icon={faChevronRight} size='2xl' style={{ color: 'white' }} />
                </button>
            </Swiper >
        </>
    )
}

export default CardAnime;