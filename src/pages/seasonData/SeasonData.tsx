import { useEffect, useState } from "react";

import './SeasonData.scss'

import { useNavigate, useParams } from "react-router-dom";
import { Season } from "../../interfaces/Season";
import { getSeasonBySeasonId } from "../../services/AnimeService";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Song } from "../../interfaces/Song";
import { getSongsBySeasonId } from "../../services/SongService";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { IMyList } from "../../interfaces/MyList";
import axios from "axios";
import { URL_MY_LIST } from "../../services/MyListService";
import { showAlert } from "../../utils/Alert";
import { Userdata } from "../../interfaces/Userdata";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ModalMyList from "../../components/modalMyList/ModalMyList";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import { Userdata } from "../../interfaces/Userdata";

const SeasonData = () => {
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser<Userdata>();
    const userIdAuth = authUser ? authUser.uid : '';
    const userIdAuthNumber = userIdAuth ? Number(userIdAuth) : 0;

    const navigate = useNavigate();

    const animeId = useParams().id;
    const seasonIdParam = useParams().idSeason;
    let seasonIdParamNumber: number | undefined;

    if (seasonIdParam !== undefined) {
        seasonIdParamNumber = parseInt(seasonIdParam);
    }

    const [animeSeasonById, setAnimeSeasonsById] = useState<Season | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [favorite, setFavorite] = useState('');
    const [status, setStatus] = useState('');
    const [chapter, setChapter] = useState<number | undefined>(0);

    const [quantityEpisodesBySeason, setQuantityEpisodesById] = useState<number[]>([]);

    const episodes = animeSeasonById?.quantity_episodes;

    useEffect(() => {
        getSeasonBySeasonId(animeId, seasonIdParam, setAnimeSeasonsById);
        getSongsBySeasonId(seasonIdParam, setSongs);

        if (episodes !== undefined && episodes > 0) {
            const numbers: number[] = [];
            for (let i = 1; i <= episodes; i++) {
                numbers.push(i);
            }
            setQuantityEpisodesById(numbers);
        } else {
            setQuantityEpisodesById([]);
        }
    }, [seasonIdParam, episodes]);

    const openModalRegister = () => {
        quantityEpisodesBySeason
        setFavorite('');
        setStatus('');
        setChapter(0);
    }

    // const openModalEdit = (id: number | undefined, favorite: string, status: string, chapter: number, userId: number, seasonId: number, volumeId: number) => {
    //     setMyListId(id);
    //     setFavorite(favorite);
    //     setStatus(status);
    //     setChapter(chapter);
    //     setUserId(userId);
    //     setSeasonId(seasonId);
    //     setVolumeId(volumeId);
    // }

    const validate = () => {
        let parameters: IMyList;
        let method: string;
        parameters = {
            favorite: favorite.trim(),
            status: status.trim(),
            chapter: chapter,
            userId: userIdAuthNumber,
            seasonId: seasonIdParamNumber,
        };

        method = 'POST';
        sendRequest(method, parameters);
    }

    const sendRequest = async (method: string, parameters: IMyList) => {
        await axios({ method: method, url: URL_MY_LIST, data: parameters });
        showAlert('Se registró correctamente', 'success');
    };

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

    const handleSelectionFavoriteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFavorite(e.target.value);
    };
    const handleSelectionStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };
    const handleSelectionChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChapter(parseInt(e.target.value));
    };

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
                            <Button onPress={onOpen} onClick={() => { handleClickAddList(), openModalRegister() }} color="primary" className="text-[--bg-button] border-[--bg-button] hover:bg-[--bg-button]" variant="ghost">
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
                                    <p>Valoración:</p>
                                    <Select
                                        size={"sm"}
                                        placeholder="Seleccionar estado"
                                        className="dark w-64"
                                        onChange={(handleSelectionFavoriteChange)}
                                    >
                                        <SelectItem key="AÚN NO LO SÉ">AÚN NO LO SÉ</SelectItem>
                                        <SelectItem key="NO ME GUSTA EN ABSOLUTO">NO ME GUSTA EN ABSOLUTO</SelectItem>
                                        <SelectItem key="NO ME GUSTA">NO ME GUSTA</SelectItem>
                                        <SelectItem key="NEUTRAL">NEUTRAL</SelectItem>
                                        <SelectItem key="ME GUSTA">ME GUSTA</SelectItem>
                                        <SelectItem key="ME ENCANTA">ME ENCANTA</SelectItem>
                                    </Select>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p>Estado: </p>
                                    <Select
                                        size={"sm"}
                                        placeholder="Seleccionar estado"
                                        className="dark w-64"
                                        onChange={(handleSelectionStatusChange)}
                                    >
                                        <SelectItem key="TERMINADO">TERMINADO</SelectItem>
                                        <SelectItem key="MIRANDO">MIRANDO</SelectItem>
                                        <SelectItem key="POR VER">POR VER</SelectItem>
                                        <SelectItem key="EN ESPERA">EN ESPERA</SelectItem>
                                    </Select>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p>Episodios vistos</p>
                                    <div className="flex justify-center items-center gap-2">
                                        <Select
                                            size={"sm"}
                                            placeholder="Episodios vistos"
                                            className="dark w-44"
                                            value={(chapter ? chapter.toString() : '')}
                                            onChange={(handleSelectionChapterChange)}
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
                                <Button color="primary" onPress={onClose} onClick={() => { validate() }}>
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
