import { Suspense, useEffect, useState } from "react";
import { IMyList, IMyListDetails } from "../../interfaces/MyList";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Userdata } from "../../interfaces/Userdata";
import { getMyListByUserId, URL_MY_LIST } from "../../services/MyListService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFaceFrown, faFaceFrownOpen, faFaceMeh, faFaceSadCry, faFaceSmile, faFaceSmileBeam, faFaceTired, faPlusCircle, faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { showAlert } from "../../utils/Alert";

const MyList = () => {
    const authUser = useAuthUser<Userdata>();
    const userId = authUser ? authUser.uid : '';
    const userIdString = userId ? userId.toString() : '';
    const userIdAuthNumber = userId ? Number(userId) : 0;

    const [myListByUserId, setmyListByUserId] = useState<IMyListDetails[]>([]);
    const [myListId, setMyListId] = useState<number | undefined>(0);
    const [favorite, setFavorite] = useState('');
    const [status, setStatus] = useState('');
    const [chapter, setChapter] = useState<number | undefined>(0);
    const [seasonId, setSeasonId] = useState<number | undefined>(0);

    const [quantityEpisodesBySeason, setQuantityEpisodesById] = useState<number[]>([]);
    const [episodesBySeasonId, setEpisodesBySeasonId] = useState(0);

    useEffect(() => {
        getMyListByUserId(userIdString, setmyListByUserId);
        if (episodesBySeasonId !== undefined && episodesBySeasonId > 0) {
            const numbers: number[] = [];
            for (let i = 1; i <= episodesBySeasonId; i++) {
                numbers.push(i);
            }
            setQuantityEpisodesById(numbers);
        } else {
            setQuantityEpisodesById([]);
        }
    }, [episodesBySeasonId]);

    const getStatusClass = (status: string) => {
        if (status === "MIRANDO") {
            return "bg-green-900 text-green-300";
        }
        else if (status === "POR VER") {
            return "bg-yellow-900 text-yellow-300";
        } else {
            return "bg-red-900 text-red-300";
        }
    };

    const openModalEdit = (id: number | undefined, favorite: string, status: string, chapter: number, seasonId: number | undefined, quantityEpisodes: number) => {
        setMyListId(id);
        setFavorite(favorite);
        setStatus(status);
        setChapter(chapter);
        setSeasonId(seasonId);
        setEpisodesBySeasonId(quantityEpisodes);
    }

    const validate = () => {
        let parameters: IMyList;
        let method: string;
        parameters = {
            favorite: favorite.trim(),
            status: status.trim(),
            chapter: chapter,
            seasonId: seasonId,
            userId: userIdAuthNumber,
        };

        method = 'PUT';
        sendRequest(method, parameters);

        console.log(parameters);
    }

    const deleteMyList = async (id: number | undefined) => {
        setMyListId(id);
        await axios({ method: 'DELETE', url: URL_MY_LIST + `/${myListId}`, data: id });
        showAlert('Se elimino correctamente', 'success');
        getMyListByUserId(userIdString, setmyListByUserId);
    }

    const sendRequest = async (method: string, parameters: IMyList) => {
        await axios({ method: method, url: URL_MY_LIST + `/${myListId}`, data: parameters });
        showAlert('Se registró correctamente', 'success');
        getMyListByUserId(userIdString, setmyListByUserId);
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSelectionFavoriteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFavorite(e.target.value);
    };
    const handleSelectionStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };
    const handleSelectionChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChapter(parseInt(e.target.value));
    };

    const favoriteIcon = (favorite: string) => {
        if (favorite === 'ME ENCANTA') {
            return <FontAwesomeIcon className="text-green-400" size="lg" icon={faFaceSmileBeam} />;
        } else if (favorite === 'ME GUSTA') {
            return <FontAwesomeIcon className="text-green-200" size="lg" icon={faFaceSmile} />;
        } else if (favorite === 'NEUTRAL') {
            return <FontAwesomeIcon className="text-yellow-400" size="lg" icon={faFaceMeh} />;
        } else if (favorite === 'NO ME GUSTA') {
            return <FontAwesomeIcon className="text-red-200" size="lg" icon={faFaceFrownOpen} />;
        } else if (favorite === 'NO ME GUSTA EN ABSOLUTO') {
            return <FontAwesomeIcon className="text-red-400" size="lg" icon={faFaceFrown} />;
        }
    }

    const buttonIncrementChapters = (chaptersViewed: number, quantityEpisodes: number) => {
        if (chaptersViewed === quantityEpisodes) {
            return null;
        }
        else {
            return <button className="text-white"><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon></button>
        }
    }

    return (
        <>
            <div className="flex flex-col h-full gap-y-12 p-4">
                <h1>Mi Lista</h1>
                <Suspense fallback={<div>Cargando...</div>}>
                    {myListByUserId.length > 0 ? (
                        <div className="grid grid-cols-auto-col gap-x-8 gap-y-12">
                            {myListByUserId.map((list) => (
                                <div key={list.id} className="relative w-[10em] h-max ">
                                    <span className="cursor-pointer" onClick={() => { onOpen(), openModalEdit(list.id, list.favorite, list.status, list.chapter, list.season.id, list.season.quantity_episodes) }}>
                                        <FontAwesomeIcon icon={faEdit} className="absolute -top-2 -right-2 bg-white text-black p-2 rounded-full"></FontAwesomeIcon>
                                    </span>
                                    <span className="text-white absolute -top-2 -left-2 bg-black rounded-full">
                                        {
                                            favoriteIcon(list.favorite)
                                        }
                                    </span>
                                    <Link className="flex h-[14em] bg-white" to={`/animes/${list.season.animeId}`}>
                                        <picture className="w-full h-full">
                                            {list.season &&
                                                <img src={list.season.image} className="w-full h-full object-fill" alt="" />
                                            }
                                        </picture>
                                    </Link>
                                    <div>
                                        <Link to={`/animes/${list.season.animeId}`}>
                                            <p>{list.season ? list.season.title_english : ''}</p>
                                        </Link>
                                        <div className="flex gap-2">
                                            <p className="text-gray-500">{list.season.type}</p>
                                            <div className="flex gap-0.5">
                                                <p className=" text-gray-500">{list.season.season_year}</p>
                                                <p className=" text-gray-500">|</p>
                                                <p className=" text-gray-500">{list.season.year}</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full h-full">
                                            <span
                                                className={`w-max text-xs font-medium me-2 px-2.5 py-0.5 rounded ${getStatusClass(list.status)}`}
                                            >{list.status}
                                            </span>
                                            <div className="flex gap-2">
                                                <span className=" text-white">
                                                    {list.chapter} / {list.season.quantity_episodes}
                                                </span>
                                                {
                                                    buttonIncrementChapters(list.chapter, list.season.quantity_episodes)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full">
                            <h2 className="text-white">No has registrado ningún anime</h2>
                        </div>
                    )}
                </Suspense>
            </div >

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
                                        placeholder="Seleccionar fav"
                                        className="dark w-64"
                                        selectedKeys={[favorite]}
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
                                        selectedKeys={[status]}
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
                                            selectedKeys={chapter ? [chapter.toString()] : ''}
                                            onChange={(handleSelectionChapterChange)}
                                        >
                                            {quantityEpisodesBySeason.map(num => (
                                                <SelectItem key={num}>{num}</SelectItem>
                                            ))}
                                        </Select>
                                        <p>/{episodesBySeasonId}</p>
                                    </div>
                                </div>

                                <div className="cursor-pointer flex justify-end items-center gap-2 text-red-500" onClick={() => deleteMyList(1)}>
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    <p className="text-red-500">Eliminar de Mi Lista</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => { validate() }}>
                                    Editar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default MyList;