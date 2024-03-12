import { useEffect, useMemo, useState } from "react";

import '../Crud.scss'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, Chip, Selection, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { showAlert } from "../../../utils/Alert";
import { Genre } from "../../../interfaces/Genre";
import { getGenres } from "../../../services/GenreService";
import { Link } from "react-router-dom";
import { getBooks, URL_BOOK } from "../../../services/BookService";
import { Book } from "../../../interfaces/Book";

const CrudBook = () => {

    /**
     * *USESTATE FOR USERINTERFACE
     */
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState<number>(0);

    /**
     * *ATTRIBUTES FOR BOOK
     */
    const [book, setBook] = useState<Book[]>([]);

    const [id, setId] = useState<number | undefined>();
    const [titleJapanese, setTitleJapanese] = useState('');
    const [titleEnglish, setTitleEnglish] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [year, setYear] = useState(0);
    const [seasonYear, setSeasonYear] = useState('');
    const [bookType, setBookType] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [puntuation, setPuntuation] = useState(0);

    const [selectedGenreIdSet, setSelectedGenreIdSet] = useState<Selection>(new Set([]));
    const [selectedGenreIdArray, setSelectedGenreIdArray] = useState<number[]>([]);

    /**
     * *ALL USESTATE FOR GENRE SERVICE
     */
    const [genres, setGenres] = useState<Genre[]>([]);

    /**
     * *ARRAY NEEDED TO CAPTURE SELECTED IDS IN SELECTEDINPUT
     */

    /**
     * *ESTADOS NECESRIOS PARA EL MODAL DE MATERIALUI
     */
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        getBooks(setBook);
        getGenres(setGenres);
    }, []);

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(book.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return book.slice(start, end);
    }, [page, book]);

    const openModalRegister = (op: number) => {
        setTitleModal('Registrar Libro');
        setId(0);
        setTitleJapanese('');
        setTitleEnglish('');
        setSynopsis('');
        setSelectedGenreIdSet(new Set([]));
        setYear(0);
        setSeasonYear('');
        setBookType('');
        setAuthor('');
        setStatus('');
        setPuntuation(0);
        setOperation(op);

        window.setTimeout(() => {
            document.getElementById('name')?.focus();
        }, 500);
    }

    const openModalEdit = (op: number, id: number | undefined, titleJapanese: string, titleEnglish: string, synopsis: string, year: number, seasonYear: string, bookType: string, author: string, status: string, puntuation: number, genres: Selection) => {
        setTitleModal('Editar Libro');
        setId(id);
        setTitleJapanese(titleJapanese);
        setTitleEnglish(titleEnglish);
        setSynopsis(synopsis);
        setYear(year);
        setSeasonYear(seasonYear);
        setBookType(bookType);
        setAuthor(author);
        setStatus(status);
        setPuntuation(puntuation);
        setSelectedGenreIdSet(genres);
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
        let parameters: Book;
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
                    year: year,
                    season_year: seasonYear.trim(),
                    book_type: bookType.trim(),
                    author: author.trim(),
                    status: status.trim(),
                    puntuation: puntuation,
                    genres: genres,
                };

                method = 'POST';
            }
            else {
                parameters = {
                    id: id,
                    title_japanese: titleJapanese.trim(),
                    title_english: titleEnglish.trim(),
                    synopsis: synopsis.trim(),
                    year: year,
                    season_year: seasonYear.trim(),
                    book_type: bookType.trim(),
                    author: author.trim(),
                    status: status.trim(),
                    puntuation: puntuation,
                    genres: genres,
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
    const sendRequest = async (method: string, parameters: Book) => {
        if (method === 'PUT') {
            const responseBook = await axios({ method: method, url: URL_BOOK + `/${id}`, data: parameters });
            const bookId = responseBook.data.id;

            showAlert('Se actualizó correctamente', 'success');
            // CREATE RELATED GENRES
            for (let genreId of selectedGenreIdArray) {
                const parametersBookGenre = {
                    bookId: bookId,
                    genreId: genreId,
                };
                await axios({ method: 'PUT', url: URL_BOOK + `/${bookId}/genres/${id}`, data: parametersBookGenre });
            }
        } else {
            // CREATE ANIME AND OBTAIN ID
            const responseAnime = await axios({ method: method, url: URL_BOOK, data: parameters });
            const bookId = parseInt(responseAnime.data.id);

            // CREATE RELATED GENRES
            for (let genreId of selectedGenreIdArray) {
                const parametersBookGenre = {
                    bookId: bookId,
                    genreId: genreId,
                };
                await axios({ method: 'POST', url: URL_BOOK + `/${bookId}/genres`, data: parametersBookGenre });
            }

            showAlert('Se registró correctamente', 'success');
        }
        getBooks(setBook);
    };

    /**
     * 
     * * FUNCTION IS USED TO SEND DATA FOR EACH INPUT FROM THE MODAL, IF IS PUT OR POST REQUEST
     */
    const deleteBook = async (id: number | undefined) => {
        setId(id);
        await axios({ method: 'DELETE', url: URL_BOOK + `/${id}`, data: id });
        showAlert('Se elimino correctamente', 'success');
        getBooks(setBook);
    }

    /**
     * 
     * * EVENT FUNCTION USED WHEN THE USER SELECT ONE OR MORE GENRES IN THE SELECT INPUT
     */
    // const handleChangeGenres = (event: SelectChangeEvent<typeof genreName>) => {
    //     const { target: { value } } = event;

    //     const SELECTED_VALUES = Array.isArray(value) ? value : [value];

    //     const SELECTED_GENRE_IDS = SELECTED_VALUES
    //         .map((selectedGenreName: string) => {
    //             const selectedGenre = genres.find((genre) => genre.name === selectedGenreName);
    //             return selectedGenre ? selectedGenre.id : undefined;
    //         })
    //         .filter((id) => typeof id === 'number') as number[];

    //     setSelectedGenreIdSet(SELECTED_GENRE_IDS);
    //     setGenreName(SELECTED_VALUES);
    // };

    const handleSelectionGenresChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = e.target.value.split(",");
        const cleanedValues = values.map((value) => value.trim());

        // Eliminar espacio en blanco al inicio si existe
        if (cleanedValues[0] === "") {
            cleanedValues.shift();
        }

        const numericValues = cleanedValues.map((value) => parseInt(value, 10));

        setSelectedGenreIdSet(new Set(cleanedValues));
        setSelectedGenreIdArray(numericValues);
        console.log(selectedGenreIdArray);
    };

    const SEASON_LIST = ["Spring", "Summer", "Autumn", "Winter"];

    const handleSelectionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBookType(e.target.value);
    };

    const handleSelectionSeasonYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSeasonYear(e.target.value);
    };

    const handleSelectionBookStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    return (
        <>
            <section className="create">
                <Breadcrumbs className="dark">
                    <BreadcrumbItem> <Link to={`/crud`}>CRUD</Link> </BreadcrumbItem>
                    <BreadcrumbItem>Libros</BreadcrumbItem>
                </Breadcrumbs>
                <h1>Crear Libros</h1>
                <Button color="success" onPress={onOpen} onClick={() => { openModalRegister(1) }}>Crear</Button>
            </section>
            <section className="list">
                <h1>Lista de Libros</h1>

                <Table isStriped
                    aria-label="Table Libros"
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
                        <TableColumn>AÑO</TableColumn>
                        <TableColumn>TEMPORADA DEL AÑO</TableColumn>
                        <TableColumn>TIPO</TableColumn>
                        <TableColumn>AUTOR</TableColumn>
                        <TableColumn>ESTADO</TableColumn>
                        <TableColumn>PUNTUACIÓN</TableColumn>
                        <TableColumn>GÉNEROS</TableColumn>
                        <TableColumn>ANIMES</TableColumn>
                        <TableColumn>OPCIONES</TableColumn>
                    </TableHeader>

                    {
                        items.length ? (
                            <TableBody items={items}>
                                {
                                    (book) => (
                                        <TableRow key={book.id}>
                                            <TableCell>{book.id}</TableCell>
                                            <TableCell>{book.title_japanese}</TableCell>
                                            <TableCell>{book.title_english}</TableCell>
                                            <TableCell>{book.synopsis}</TableCell>
                                            <TableCell>{book.year}</TableCell>
                                            <TableCell>{book.season_year}</TableCell>
                                            <TableCell>{book.book_type}</TableCell>
                                            <TableCell>{book.author}</TableCell>
                                            <TableCell>{book.status}</TableCell>
                                            <TableCell>{book.puntuation}</TableCell>
                                            <TableCell className="flex flex-col gap-2">
                                                {book.genres && book.genres.map((genre) => (
                                                    <Chip key={genre.id} >{genre.name}</Chip>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip content="Ver Animes">
                                                    <Link to={`${book.id}/animes`}>

                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </span>
                                                    </Link>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip content="Editar">
                                                    <Button className="bg-transparent" onPress={onOpen} onClick={() => { openModalEdit(2, book.id, book.title_japanese, book.title_english, book.synopsis, book.year, book.season_year, book.book_type, book.author, book.status, book.puntuation) }}>
                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </span>
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Eliminar">
                                                    <Button className="bg-transparent" onClick={() => deleteBook(book.id)}>
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
                size="2xl"
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{titleModal}</ModalHeader>
                            <ModalBody className="formBook">
                                <Input
                                    autoFocus
                                    className="formBook__input-titleJapanese"
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
                                    className="formBook__input-titleEnglish"
                                    variant="bordered"
                                    value={titleEnglish}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Agregue un título en inglés"}
                                    onChange={(e) => setTitleEnglish(e.target.value)}
                                />
                                <Input
                                    label="Sinopsis"
                                    className="formBook__input-synopsis"
                                    variant="bordered"
                                    value={synopsis}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Agregue una sinopsis"}
                                    onChange={(e) => setSynopsis(e.target.value)}
                                />
                                <Input
                                    type="number"
                                    className="formBook__input-year"
                                    autoFocus
                                    label="Año"
                                    variant="bordered"
                                    value={year.toString()}
                                    onChange={(e) => setYear(parseInt(e.target.value))}
                                />
                                <Select
                                    className="formBook__input-seasonYear"
                                    label="Estación del año"
                                    variant="bordered"
                                    selectedKeys={[seasonYear]}
                                    onChange={(handleSelectionSeasonYearChange)}
                                >
                                    {
                                        SEASON_LIST.map(sl => (
                                            <SelectItem key={sl} value={sl}>{sl}</SelectItem>
                                        ))
                                    }
                                </Select>

                                <Select
                                    className="formBook__input-bookType"
                                    label="Tipo de Libro"
                                    variant="bordered"
                                    selectedKeys={[bookType]}
                                    onChange={(handleSelectionTypeChange)}
                                >
                                    <SelectItem key={"MANGA"} value={"MANGA"}>MANGA</SelectItem>
                                    <SelectItem key={"NOVELA"} value={"NOVELA"}>NOVELA</SelectItem>
                                    <SelectItem key={"SPECIAL"} value={"SPECIAL"}>SPECIAL</SelectItem>
                                </Select>
                                <Input
                                    label="Autor"
                                    className="formBook__input-author"
                                    variant="bordered"
                                    value={author}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Agregue una sinopsis"}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                                <Select
                                    className="formBook__input-status"
                                    label="Estado"
                                    variant="bordered"
                                    selectedKeys={[status]}
                                    onChange={(handleSelectionBookStatus)}
                                >
                                    <SelectItem key={"TERMINADO"} value={"TERMINADO"}>TERMINADO</SelectItem>
                                    <SelectItem key={"EN EMISIÓN"} value={"EN EMISIÓN"}>EN EMISIÓN</SelectItem>
                                    <SelectItem key={"EN PAUSA"} value={"EN PAUSA"}>EN PAUSA</SelectItem>
                                </Select>
                                <Input
                                    type="number"
                                    className="formBook__input-puntuation"
                                    autoFocus
                                    label="Puntuación"
                                    variant="bordered"
                                    value={puntuation.toString()}
                                    onChange={(e) => setPuntuation(parseInt(e.target.value))}
                                />
                                <Select
                                    label="Géneros"
                                    className="formBook__input-genres"
                                    selectionMode="multiple"
                                    variant="bordered"
                                    isInvalid={isInvalid}
                                    selectedKeys={selectedGenreIdSet}
                                    onChange={handleSelectionGenresChange}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Seleccione un género"}
                                >
                                    {genres.map((genre) => (
                                        <SelectItem key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </SelectItem>
                                    ))}
                                </Select>
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

export default CrudBook;