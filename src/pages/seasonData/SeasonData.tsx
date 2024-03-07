import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Season } from "../../interfaces/Season";
import { getSeasonsByIdForAnime } from "../../services/AnimeService";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Song } from "../../interfaces/Song";

const SeasonData = () => {
    const animeId = useParams().id;
    const seasonId = useParams().idSeason;

    const [animeSeasonById, setAnimeSeasonsById] = useState<Season | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);


    useEffect(() => {
        getSeasonsByIdForAnime(animeId, seasonId, setAnimeSeasonsById);
    }, [seasonId]);

    console.log(animeSeasonById);

    return (
        <>
            <section className="flex flex-col h-max">
                <div className="relative top-0 left-0 flex w-full h-[50%]">
                    <img src={animeSeasonById?.cover_image} className="w-full h-full overflow-hidden" alt="" />
                    <div className="flex flex-col justify-end items-start h-full w-full absolute top-0 left-0 px-4 py-4 bg-gradient-to-t from-black from-25%">
                        <h1>{animeSeasonById?.title_english}</h1>
                        <div className="flex justify-start items-center gap-8">
                            <div className="flex gap-2">
                                <p>{animeSeasonById?.season_year}</p>
                                <p>|</p>
                                <p>{animeSeasonById?.year}</p>
                            </div>
                            <div>
                                <p>{animeSeasonById?.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2-auto w-full place-content-between px-4 gap-8">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                            <Button>
                                <FontAwesomeIcon icon={faBookmark} />
                                Agregar a Favoritos
                            </Button>
                            <Button color="primary" className="text-[--bg-button] border-[--bg-button] hover:bg-[--bg-button]" variant="ghost">
                                <FontAwesomeIcon icon={faPlus} />
                                Agregar a Mi Lista
                            </Button>
                        </div>
                        <div className="synopsis">
                            <h2>Sinopsis</h2>
                            <p>{animeSeasonById?.synopsis}</p>
                        </div>
                    </div>
                    <div className='aspect-video'>
                        <iframe
                            className='w-full h-full'
                            src={animeSeasonById?.url_trailer}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className="flex p-4">
                    <Table className="dark text-white" hideHeader aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>ROLE</TableColumn>
                            <TableColumn>NAME</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>EDITOR</TableCell>
                                <TableCell>{animeSeasonById?.studio}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
            <section className="w-full px-4">
                <h1>Canciones</h1>
                {
                    songs.length ? (
                        <>{
                            songs.map((song) => (
                                <div key={song.id} className='content-swiper-slide__card'>
                                    <h1>{song.title}</h1>
                                    <div className='flex justify-center items-start lg:aspect-video bg-slate-400'>
                                        <iframe
                                            className='w-full h-full'
                                            src={song.link}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            ))
                        }
                        </>
                    ) : <div className='text-white'>No hay registro de canciones</div>}

            </section>
        </>
    )
}

export default SeasonData;
