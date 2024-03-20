import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './Card.scss'

import { FreeMode, Navigation } from 'swiper/modules';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { getLastSeasonByAnime } from '../../services/AnimeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AnimeDetails } from '../../interfaces/AnimeDetails';
import { Genre } from '../../interfaces/Genre';
import { Link } from 'react-router-dom';

export const CardAnime = ({ props }: { props: any }) => {

    const [lastSeasonByAnime, setLastSeasonByAnime] = useState<AnimeDetails[]>([]);

    useEffect(() => {
        getLastSeasonByAnime(setLastSeasonByAnime);
    }, [props]);

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
                {lastSeasonByAnime.length > 0 ? (
                    lastSeasonByAnime
                        .filter((anime) => anime.genres.some((g) => g.name === props || anime.seasons.some((s) => s.season_year === props
                        || anime.seasons.some((s) => s.status === props))))
                        .map((anime) => (
                            <Suspense key={anime.id} fallback={<h1>Cargando...</h1>}>
                                <SwiperSlide className='swiper-card__slide'>
                                    <div className='swiper-card__slide--content'>
                                        <Link to={`/animes/${anime.id}`}>
                                            <div className="card">
                                                {anime.seasons.map((dataseason) => (
                                                    <Fragment key={dataseason.id}>
                                                        <div className="card__img">
                                                            <img src={dataseason.image} alt={dataseason.title_english} />
                                                        </div>
                                                        <div className="card__description h-5 truncate">
                                                            {dataseason.title_english}
                                                        </div>
                                                    </Fragment>
                                                ))}
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            </Suspense>
                        ))
                ) : (
                    <p>No existen animes registrados</p>
                )}
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