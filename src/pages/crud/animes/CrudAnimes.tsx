import { useEffect, useMemo, useState } from "react";

import '../Crud.scss'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Anime } from "../../../interfaces/Anime";
import { getAnimes, URL_ANIME } from "../../../services/AnimeService";
import { showAlert } from "../../../utils/Alert";
import { Link } from "react-router-dom";

const CrudAnime = () => {

    /**
     * *USESTATE FOR USERINTERFACE
     */
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState<number>(0);

    /**
     * *ALL USESTATE FOR ANIME SERVICE
     */
    const [animes, setAnimes] = useState<Anime[]>([]);
    /**
     * *ATTRIBUTES FOR ANIME
     */
    const [id, setId] = useState<number | undefined>();
    const [titleJapanese, setTitleJapanese] = useState('');
    const [titleEnglish, setTitleEnglish] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [logoImage, setLogoImage] = useState('');
    const [puntuation, setPuntuation] = useState(0);
    const [bookId, setBookId] = useState(0);

    /**
     * *ESTADOS NECESRIOS PARA EL MODAL DE MATERIALUI
     */
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        getAnimes(setAnimes);
    }, []);

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(animes.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return animes.slice(start, end);
    }, [page, animes]);

    const openModalRegister = (op: number) => {
        setTitleModal('Registrar Anime');
        setId(0);
        setTitleJapanese('');
        setTitleEnglish('');
        setSynopsis('');
        setLogoImage('');
        setPuntuation(0);
        setBookId(0);
        setOperation(op);

        window.setTimeout(() => {
            document.getElementById('name')?.focus();
        }, 500);
    }

    const openModalEdit = (op: number, id: number | undefined, titleJapanese: string, titleEnglish: string, synopsis: string, logoImage: string, puntuation: number, bookId: number) => {
        setTitleModal('Editar Anime');
        setId(id);
        setTitleJapanese(titleJapanese);
        setTitleEnglish(titleEnglish);
        setSynopsis(synopsis);
        setLogoImage(logoImage);
        setPuntuation(puntuation);
        setBookId(bookId);
        setOperation(op);

        window.setTimeout(() => {
            document.getElementById('name')?.focus();
        }, 500);
    }

    /**
     * * THIS FUNCTION IS USED FOR VALIDATE DATA INPUTS, IF IN THE CASE THE BUTTON RETURN PUT OR POST
     */
    const [isInvalid, setIsInvalid] = useState(false);

    const validate = () => {
        let parameters: Anime;
        let method: string;

        if (titleJapanese.trim() === '' || titleEnglish.trim() === ''
            || synopsis.trim() === '') {
            setIsInvalid(true);
        }
        else {

            if (operation === 1) {
                parameters = {
                    title_japanese: titleJapanese.trim(),
                    title_english: titleEnglish.trim(),
                    synopsis: synopsis.trim(),
                    logo_image: logoImage.trim(),
                    puntuation: puntuation,
                    bookId: bookId,
                };

                method = 'POST';
            }
            else {
                parameters = {
                    id: id,
                    title_japanese: titleJapanese.trim(),
                    title_english: titleEnglish.trim(),
                    synopsis: synopsis.trim(),
                    logo_image: logoImage.trim(),
                    puntuation: puntuation,
                    bookId: bookId,
                };
                method = 'PUT';
            }
            sendRequest(method, parameters);
        };
    }


    /**
     * 
     * * FUNCTION IS USED TO SEND DATA FOR EACH INPUT FROM THE MODAL, IF IS PUT OR POST REQUEST
     */
    const sendRequest = async (method: string, parameters: Anime) => {
        if (method === 'PUT') {
            await axios({ method: method, url: URL_ANIME + `/${id}`, data: parameters });
            showAlert('Se actualizó correctamente', 'success');
        } else {
            // CREATE ANIME AND OBTAIN ID
            await axios({ method: method, url: URL_ANIME, data: parameters });
            showAlert('Se registró correctamente', 'success');
        }
        getAnimes(setAnimes);
    };

    /**
     * 
     * * FUNCTION IS USED TO SEND DATA FOR EACH INPUT FROM THE MODAL, IF IS PUT OR POST REQUEST
     */
    const deleteAnime = async (id: number | undefined) => {
        setId(id);
        await axios({ method: 'DELETE', url: URL_ANIME + `/${id}`, data: id });
        showAlert('Se elimino correctamente', 'success');
        getAnimes(setAnimes);
    }

    return (
        <>
            <section className="create">
                <Breadcrumbs className="dark">
                    <BreadcrumbItem> <Link to={`/crud`}>CRUD</Link> </BreadcrumbItem>
                    <BreadcrumbItem>Animes</BreadcrumbItem>
                </Breadcrumbs>
                <h1>Crear Animes</h1>
                <Button color="success" onPress={onOpen} onClick={() => { openModalRegister(1) }}>Crear</Button>
            </section>
            <section className="list">
                <h1>Lista de Animes</h1>
                <Table isStriped
                    aria-label="Table Animes"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}>
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>TÍTULO JAPONES</TableColumn>
                        <TableColumn>TÍTULO INGLÉS</TableColumn>
                        <TableColumn>SINOPSIS</TableColumn>
                        <TableColumn>LOGO</TableColumn>
                        <TableColumn>PUNTUACIÓN</TableColumn>
                        <TableColumn>BOOK ID</TableColumn>
                        <TableColumn>TEMPORADAS</TableColumn>
                        <TableColumn>OPCIONES</TableColumn>
                    </TableHeader>

                    {
                        items.length ? (
                            <TableBody items={items}>
                                {
                                    (anime) => (
                                        <TableRow key={anime.id}>
                                            <TableCell>{anime.id}</TableCell>
                                            <TableCell>{anime.title_japanese}</TableCell>
                                            <TableCell>{anime.title_english}</TableCell>
                                            <TableCell>{anime.synopsis}</TableCell>
                                            <TableCell>
                                                <img src={anime.logo_image} width={56} alt={anime.title_english} />
                                            </TableCell>
                                            <TableCell>{anime.puntuation}</TableCell>
                                            <TableCell>{anime.bookId}</TableCell>
                                            <TableCell>
                                                <Tooltip content="Ver Temporadas">
                                                    <Link to={`${anime.id}/seasons`}>

                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </span>
                                                    </Link>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip content="Editar">
                                                    <Button className="bg-transparent" onPress={onOpen} onClick={() => { openModalEdit(2, anime.id, anime.title_japanese, anime.title_english, anime.synopsis, anime.logo_image, anime.puntuation, anime.bookId) }}>
                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </span>
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Eliminar">
                                                    <Button className="bg-transparent" onClick={() => deleteAnime(anime.id)}>
                                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </span>
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        ) : <TableBody emptyContent={"No hay contenido."}>{[]}</TableBody>
                    }
                </Table>
            </section>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{titleModal}</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Título Japonés"
                                    variant="bordered"
                                    value={titleJapanese}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Agregue un titulo en japonés"}
                                    onChange={(e) => setTitleJapanese(e.target.value)}
                                />
                                <Input
                                    label="Título Inglés"
                                    variant="bordered"
                                    value={titleEnglish}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Agregue un título en inglés"}
                                    onChange={(e) => setTitleEnglish(e.target.value)}
                                />
                                <Input
                                    label="Sinopsis"
                                    variant="bordered"
                                    value={synopsis}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Agregue una sinopsis"}
                                    onChange={(e) => setSynopsis(e.target.value)}
                                />
                                <Input
                                    label="Logo"
                                    variant="bordered"
                                    value={logoImage}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Agregue la imagen del logo"}
                                    onChange={(e) => setLogoImage(e.target.value)}
                                />
                                <Input
                                    type="number"
                                    className="formAnime__input-puntuation"
                                    autoFocus
                                    label="Puntuación"
                                    variant="bordered"
                                    value={puntuation.toString()}
                                    onChange={(e) => setPuntuation(parseInt(e.target.value))}
                                />
                                <Input
                                    type="number"
                                    className="formAnime__input-bookId"
                                    autoFocus
                                    label="Book ID"
                                    variant="bordered"
                                    value={bookId.toString()}
                                    onChange={(e) => setBookId(parseInt(e.target.value))}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button type="submit" color="primary" onPress={onOpen} onClick={() => { validate() }}>
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    )
}

export default CrudAnime;