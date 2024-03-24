// import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
// import { useEffect, useState } from "react";
// import { Season } from "../../interfaces/Season";
// import axios from "axios";
// import { showAlert } from "../../utils/Alert";
// import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
// import { Userdata } from "../../interfaces/Userdata";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import { useParams } from "react-router-dom";
// import { IMyList, IMyListDetails } from "../../interfaces/MyList";
// import { getMyListByUserId, URL_MY_LIST } from "../../services/MyListService";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";

// interface MyInterface {
//     isOpen: boolean;
//     onOpenChange: () => void;
//     isDismissable: boolean;
//     isKeyboardDismissDisabled: boolean;
// }


// const ModalMyList = (props: MyInterface) => {
//     const isAuthenticated = useIsAuthenticated();
//     const authUser = useAuthUser<Userdata>();
//     const userId = authUser ? authUser.uid : '';
//     const userIdString = userId ? userId.toString() : '';
//     const userIdAuthNumber = userId ? Number(userId) : 0;

//     const animeId = useParams().id;
//     const seasonIdParam = useParams().idSeason;
//     let seasonIdParamNumber: number | undefined;

//     if (seasonIdParam !== undefined) {
//         seasonIdParamNumber = parseInt(seasonIdParam);
//     }

//     const [animeSeasonById, setAnimeSeasonsById] = useState<Season | null>(null);

//     const [myListByUserId, setmyListByUserId] = useState<IMyListDetails[]>([]);
//     const [myListId, setMyListId] = useState<number | undefined>(0);
//     const [favorite, setFavorite] = useState('');
//     const [status, setStatus] = useState('');
//     const [chapter, setChapter] = useState<number | undefined>(0);

//     const [quantityEpisodesBySeason, setQuantityEpisodesById] = useState<number[]>([]);

//     const episodes = animeSeasonById?.quantity_episodes;

//     useEffect(() => {

//         if (episodes !== undefined && episodes > 0) {
//             const numbers: number[] = [];
//             for (let i = 1; i <= episodes; i++) {
//                 numbers.push(i);
//             }
//             setQuantityEpisodesById(numbers);
//         } else {
//             setQuantityEpisodesById([]);
//         }
//     }, [episodes]);

//     const { isOpen, onOpen, onOpenChange } = useDisclosure();

//     const openModalRegister = () => {
//         quantityEpisodesBySeason
//         setFavorite('');
//         setStatus('');
//         setChapter(0);
//     }

//     const validate = () => {
//         let parameters: IMyList;
//         let method: string;
//         parameters = {
//             favorite: favorite.trim(),
//             status: status.trim(),
//             chapter: chapter,
//             userId: userIdAuthNumber,
//             seasonId: seasonIdParamNumber,
//         };

//         method = 'POST';
//         sendRequest(method, parameters);
//     }

//     const sendRequest = async (method: string, parameters: IMyList) => {
//         await axios({ method: method, url: URL_MY_LIST, data: parameters });
//         showAlert('Se registró correctamente', 'success');
//     };

//     const deleteMyList = async (id: number | undefined) => {
//         setMyListId(id);
//         await axios({ method: 'DELETE', url: URL_MY_LIST + `/${myListId}`, data: id });
//         showAlert('Se elimino correctamente', 'success');
//         getMyListByUserId(userIdString, setmyListByUserId);
//     }

//     const handleSelectionFavoriteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setFavorite(e.target.value);
//     };
//     const handleSelectionStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setStatus(e.target.value);
//     };
//     const handleSelectionChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setChapter(parseInt(e.target.value));
//     };

//     return (
//         <Modal isOpen={isOpen} className="dark text-white" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
//             <ModalContent>
//                 {(onClose) => (
//                     <>
//                         <ModalHeader className="flex flex-col gap-1">Agregar a Mi Lista</ModalHeader>
//                         <ModalBody>
//                             <div className="flex justify-between items-center">
//                                 <p>Valoración:</p>
//                                 <Select
//                                     size={"sm"}
//                                     placeholder="Seleccionar estado"
//                                     className="dark w-64"
//                                     onChange={(handleSelectionFavoriteChange)}
//                                 >
//                                     <SelectItem key="AÚN NO LO SÉ">AÚN NO LO SÉ</SelectItem>
//                                     <SelectItem key="NO ME GUSTA EN ABSOLUTO">NO ME GUSTA EN ABSOLUTO</SelectItem>
//                                     <SelectItem key="NO ME GUSTA">NO ME GUSTA</SelectItem>
//                                     <SelectItem key="NEUTRAL">NEUTRAL</SelectItem>
//                                     <SelectItem key="ME GUSTA">ME GUSTA</SelectItem>
//                                     <SelectItem key="ME ENCANTA">ME ENCANTA</SelectItem>
//                                 </Select>
//                             </div>
//                             <div className="flex justify-between items-center">
//                                 <p>Estado: </p>
//                                 <Select
//                                     size={"sm"}
//                                     placeholder="Seleccionar estado"
//                                     className="dark w-64"
//                                     onChange={(handleSelectionStatusChange)}
//                                 >
//                                     <SelectItem key="TERMINADO">TERMINADO</SelectItem>
//                                     <SelectItem key="MIRANDO">MIRANDO</SelectItem>
//                                     <SelectItem key="POR VER">POR VER</SelectItem>
//                                     <SelectItem key="EN ESPERA">EN ESPERA</SelectItem>
//                                 </Select>
//                             </div>
//                             <div className="flex justify-between items-center">
//                                 <p>Episodios vistos</p>
//                                 <div className="flex justify-center items-center gap-2">
//                                     <Select
//                                         size={"sm"}
//                                         placeholder="Episodios vistos"
//                                         className="dark w-44"
//                                         value={chapter ? (chapter).toString() : ''}
//                                         onChange={(handleSelectionChapterChange)}
//                                     >
//                                         {quantityEpisodesBySeason.map(num => (
//                                             <SelectItem key={num}>{num}</SelectItem>
//                                         ))}
//                                     </Select>
//                                     <p>/{animeSeasonById?.quantity_episodes}</p>
//                                 </div>
//                                 <div className="cursor-pointer flex justify-end items-center gap-2 text-red-500" onClick={() => deleteMyList(1)}>
//                                     <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
//                                     <p className="text-red-500">Eliminar de Mi Lista</p>
//                                 </div>
//                             </div>
//                         </ModalBody>
//                         <ModalFooter>
//                             <Button color="danger" variant="light" onPress={onClose}>
//                                 Cerrar
//                             </Button>
//                             <Button color="primary" onPress={onClose} onClick={() => { validate() }}>
//                                 Agregar
//                             </Button>
//                         </ModalFooter>
//                     </>
//                 )}
//             </ModalContent>
//         </Modal>
//     )
// }

// export default ModalMyList;