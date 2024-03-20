import { useEffect, useState } from "react";

import './SeasonData.scss'

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Season } from "../../interfaces/Season";
import { getSeasonBySeasonId } from "../../services/AnimeService";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Song } from "../../interfaces/Song";
import { getSongsBySeasonId } from "../../services/SongService";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { IMyList } from "../../interfaces/MyList";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Userdata } from "../../interfaces/Userdata";

const SeasonData = () => {
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser<Userdata>();
    const userId = authUser ? authUser.uid : '';
    const navigate = useNavigate();

    const animeId = useParams().id;
    const seasonId = useParams().idSeason;

    const [animeSeasonById, setAnimeSeasonsById] = useState<Season | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [myList, setMyList] = useState<IMyList[]>([]);

    const [quantityEpisodesBySeason, setQuantityEpisodesById] = useState<number[]>([]);

    const episodes = animeSeasonById?.quantity_episodes;

    useEffect(() => {
        getSeasonBySeasonId(animeId, seasonId, setAnimeSeasonsById);
        getSongsBySeasonId(seasonId, setSongs);
        
        if (episodes !== undefined) {
            const numbers: number[] = [];
            for (let i = 1; i <= episodes; i++) {
                numbers.push(i);
            }
            setQuantityEpisodesById(numbers);
        } else {
            setQuantityEpisodesById([]);
        }
    }, [seasonId]);

    const handleClickAddList = () => {
        {
            !isAuthenticated() ?
                (
                    navigate('/login')
                )
                :
                <></>
        }
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <section className="sectionHeaderSeason">
                <div className="sectionHeaderSeason__content ">
                    <picture className="sectionHeaderSeason__content--picture">
                        <img src={animeSeasonById?.cover_image} alt="" />
                    </picture>
                    <div className="flex flex-col justify-end items-start h-full w-full lg:absolute top-0 left-0 px-4 py-4 bg-gradient-to-t from-black from-5%">
                        <h1>{animeSeasonById?.title_japanese}</h1>
                        <h2>{animeSeasonById?.title_english}</h2>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2-auto w-full place-content-between px-4 gap-8 bg-black">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                            <Button onPress={onOpen} onClick={handleClickAddList} color="primary" className="text-[--bg-button] border-[--bg-button] hover:bg-[--bg-button]" variant="ghost">
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

            <Modal isOpen={isOpen} className="dark text-white" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar a Mi Lista</ModalHeader>
                            <ModalBody>
                                <div className="flex justify-between items-center">
                                    <p>Reacción:</p>
                                    <Select
                                        size={"sm"}
                                        placeholder="Seleccionar estado"
                                        className="dark w-44"
                                    >
                                        <SelectItem key="TERMINADO">TERMINADO</SelectItem>
                                        <SelectItem key="MIRANDO">MIRANDO</SelectItem>
                                        <SelectItem key="POR VER">POR VER</SelectItem>
                                        <SelectItem key="EN ESPERA">EN ESPERA</SelectItem>
                                        <SelectItem key="OLVIDADO">OLVIDADO</SelectItem>
                                    </Select>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p>Estado: </p>
                                    <Select
                                        size={"sm"}
                                        placeholder="Seleccionar estado"
                                        className="dark w-44"
                                    >
                                        <SelectItem key="TERMINADO">TERMINADO</SelectItem>
                                        <SelectItem key="MIRANDO">MIRANDO</SelectItem>
                                        <SelectItem key="POR VER">POR VER</SelectItem>
                                        <SelectItem key="EN ESPERA">EN ESPERA</SelectItem>
                                        <SelectItem key="OLVIDADO">OLVIDADO</SelectItem>
                                    </Select>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p>Episodios vistos</p>
                                    <div className="flex justify-center items-center gap-2">
                                        <Select
                                            size={"sm"}
                                            placeholder="Episodios vistos"
                                            className="dark w-max"
                                        >
                                            {quantityEpisodesBySeason.map(num => (
                                                <SelectItem key={num}>{num}</SelectItem>
                                            ))}
                                        </Select>
                                        <p>/{animeSeasonById?.quantity_episodes}</p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default SeasonData;
