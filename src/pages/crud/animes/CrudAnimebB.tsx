import { useEffect, useMemo, useState } from "react";

import '../Crud.scss'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { showAlert } from "../../../utils/Alert";
import { Link, useParams } from "react-router-dom";
import { URL_ANIME, getAnimesByBookId } from "../../../services/AnimeService";
import { Anime } from "../../../interfaces/Anime";

export const CrudAnimebB = () => {

    const bookIdparam = useParams().id;

    const [titleModal, setTitleModal] = useState('');
    const [labelButton, setLabelButton] = useState('');
    const [operation, setOperation] = useState<number>(0);

    const [animes, setAnimes] = useState<Anime[]>([]);
    const [id, setId] = useState<number | undefined>();
    const [titleJapanese, setTitleJapanese] = useState('');
    const [titleEnglish, setTitleEnglish] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [logoImage, setLogoImage] = useState('');
    const [puntuation, setPuntuation] = useState(0);
    const [bookId, setBookId] = useState(0);

    const convertIdBook = bookIdparam ? parseInt(bookIdparam) : NaN;

    useEffect(() => {
        getAnimesByBookId(bookIdparam, setAnimes);
    }, [bookIdparam]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(animes.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return animes.slice(start, end);
    }, [page, animes]);

    const openModalRegister = (op: number) => {
        setId(0);
        setTitleJapanese('');
        setTitleEnglish('');
        setSynopsis('');
        setLogoImage('');
        setPuntuation(0);
        setBookId(0);
        setTitleModal('Registrar Anime');
        setLabelButton('Agregar');
        setOperation(op);
    }

    const openModalEdit = (op: number, id: number | undefined, titleJapanese: string, titleEnglish: string, synopsis: string, logoImage: string, puntuation: number) => {
        setTitleModal('Editar Anime');
        setLabelButton('Editar');
        setId(id);
        setTitleJapanese(titleJapanese);
        setTitleEnglish(titleEnglish);
        setSynopsis(synopsis);
        setLogoImage(logoImage);
        setPuntuation(puntuation);
        setBookId(convertIdBook);
        setOperation(op);
    }

    const validate = () => {
        let parameters: Anime;
        let method: string;
        if (operation === 1) {
            parameters = {
                title_japanese: titleJapanese.trim(),
                title_english: titleEnglish.trim(),
                synopsis: synopsis.trim(),
                logo_image: logoImage.trim(),
                puntuation: puntuation,
                bookId: bookId
            };

            method = 'POST';
        }
        else {
            parameters = {
                title_japanese: titleJapanese.trim(),
                title_english: titleEnglish.trim(),
                synopsis: synopsis.trim(),
                logo_image: logoImage.trim(),
                puntuation: puntuation,
                bookId: bookId
            };
            method = 'PUT';
        }
        sendRequest(method, parameters);
    }

    const deleteAnime = async (id: number | undefined) => {
        setId(id);
        await axios({ method: 'DELETE', url: URL_ANIME + `/${id}`, data: id });
        showAlert('Se elimino correctamente', 'success');
        getAnimesByBookId(bookIdparam, setAnimes);
    }

    const sendRequest = async (method: string, parameters: Anime) => {
        if (method === 'PUT') {
            await axios({ method: method, url: URL_ANIME + `/${id}`, data: parameters });
            showAlert('Se actualizó correctamente', 'success');
        } else {
            await axios({ method: method, url: URL_ANIME, data: parameters });
            showAlert('Se registró correctamente', 'success');
        }
        getAnimesByBookId(bookIdparam, setAnimes);
    };

    return (
        <>
            <section className="title">

                <Breadcrumbs className="dark">
                    <BreadcrumbItem> <Link to={`/crud`}>CRUD</Link> </BreadcrumbItem>
                    <BreadcrumbItem><Link to={`/crud/books`}>Libros</Link></BreadcrumbItem>
                    <BreadcrumbItem>Animes</BreadcrumbItem>
                </Breadcrumbs>
                <h1>Crear Animes</h1>

                <Button color="success" onPress={onOpen} onClick={() => { openModalRegister(1) }}>Crear</Button>
            </section>
            <section className="list">
                <h1>Lista de Animes</h1>
                <Table
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
                        <TableColumn>PUNTUACION</TableColumn>
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
                                            <TableCell>
                                                <Tooltip content="Ver Temporadas">
                                                    <Link to={`/crud/animes/${anime.id}/seasons`}>
                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </span>
                                                    </Link>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Tooltip content="Editar">
                                                    <Button className="bg-transparent" onPress={onOpen} onClick={() => {
                                                        openModalEdit(2, anime.id, anime.title_japanese, anime.title_english, anime.synopsis, anime.logo_image, anime.puntuation)
                                                    }}>
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

            </section >

            <Modal
                size="5xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{titleModal}</ModalHeader>
                            <ModalBody className="formSeasonbA">
                                <Input
                                    className="form__inputTitleJapanese"
                                    autoFocus
                                    label="Título Japonés"
                                    variant="bordered"
                                    value={titleJapanese}
                                    onChange={(e) => setTitleJapanese(e.target.value)}
                                />
                                <Input
                                    className="form__inputTitleEnglish"
                                    label="Título Inglés"
                                    variant="bordered"
                                    value={titleEnglish}
                                    onChange={(e) => setTitleEnglish(e.target.value)}
                                />
                                <Input
                                    className="form__inputDescription"
                                    label="Sinopsis"
                                    variant="bordered"
                                    value={synopsis}
                                    onChange={(e) => setSynopsis(e.target.value)}
                                />
                                <Input
                                    className="form__inputDescription"
                                    label="Logo"
                                    variant="bordered"
                                    value={logoImage}
                                    onChange={(e) => setLogoImage(e.target.value)}
                                />
                                <Input
                                    className="form__inputDescription"
                                    label="Logo"
                                    variant="bordered"
                                    value={logoImage}
                                    onChange={(e) => setLogoImage(e.target.value)}
                                />

                                <Input
                                    type="number"
                                    className="formBook__input-puntuation"
                                    autoFocus
                                    label="Puntacion"
                                    variant="bordered"
                                    value={puntuation.toString()}
                                    onChange={(e) => setPuntuation(parseInt(e.target.value))}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button type="submit" color="primary" onPress={onOpen} onClick={() => { validate() }}>
                                    {labelButton}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    )
}

export default CrudAnimebB;