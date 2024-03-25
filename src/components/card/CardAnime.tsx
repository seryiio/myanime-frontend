import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './Card.scss'

import { FreeMode, Navigation } from 'swiper/modules';
import { Fragment, useEffect, useState } from 'react';
import { getLastSeasonByAnime } from '../../services/AnimeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AnimeDetails } from '../../interfaces/AnimeDetails';
import { Link } from 'react-router-dom';
import { Card, Skeleton } from '@nextui-org/react';

export const CardAnime = ({ props }: any) => {

    const [lastSeasonByAnime, setLastSeasonByAnime] = useState<AnimeDetails[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getLastSeasonByAnime(setLastSeasonByAnime)
                .then(() => setLoading(false))
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }, 1000);
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
                {loading ? (
                    <Card className="dark swiper-card__slide h-60" radius="lg">
                        <Skeleton className="rounded-lg">
                            <div className=" h-60 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </Card>
                ) : (
                    lastSeasonByAnime.length > 0 ? (
                        lastSeasonByAnime
                            .filter((anime) => anime.genres.some((g) => g.name === props || anime.seasons.some((s) => s.season_year === props
                                || anime.seasons.some((s) => s.status === props))))
                            .map((anime) => (
                                <SwiperSlide key={anime.id} className='swiper-card__slide'>
                                    <div className='swiper-card__slide--content'>
                                        <Link reloadDocument to={`/animes/${anime.id}`}>
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
                            ))
                    ) : (
                        <p>No existen animes registrados</p>
                    ))
                }
                <button className="swiper-card--btnPrev z-[998]">
                    <FontAwesomeIcon icon={faChevronLeft} size='2xl' style={{ color: 'white' }} />
                </button>
                <button className="swiper-card--btnNext z-[998]">
                    <FontAwesomeIcon icon={faChevronRight} size='2xl' style={{ color: 'white' }} />
                </button>
            </Swiper>
        </>
    )
}

export default CardAnime;