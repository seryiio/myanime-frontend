import { useEffect, useMemo, useState } from "react";

import '../Crud.scss'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, Chip, Selection, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Anime } from "../../../interfaces/Anime";
import { getAnimeGenres, getAnimes, urlAnimeGenres, urlAnimes } from "../../../services/AnimeService";
import { showAlert } from "../../../utils/Alert";
import { Genre } from "../../../interfaces/Genre";
import { getGenres } from "../../../services/GenreService";
import { Link } from "react-router-dom";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
    const [image, setImage] = useState('');
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
        getAnimes(setAnimes);
        getGenres(setGenres);
        getAnimeGenres(setAnimes);
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
        setSelectedGenreIdSet(new Set([]));
        setLogoImage('');
        setImage('');
        setOperation(op);

        window.setTimeout(() => {
            document.getElementById('name')?.focus();
        }, 500);
    }

    const openModalEdit = (op: number, id: number | undefined, titleJapanese: string, titleEnglish: string, synopsis: string, logoImage: string, image: string, genres: Selection) => {
        setTitleModal('Editar Anime');
        setId(id);
        setTitleJapanese(titleJapanese);
        setTitleEnglish(titleEnglish);
        setSynopsis(synopsis);
        setLogoImage(logoImage);
        setImage(image);
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
        let parameters: Anime;
        let method: string;

        if (titleJapanese.trim() === '' || titleEnglish.trim() === ''
            || synopsis.trim() === '' || image.trim() === '') {
            setIsInvalid(true);
        }
        else {

            if (operation === 1) {
                parameters = {
                    title_japanese: titleJapanese.trim(),
                    title_english: titleEnglish.trim(),
                    synopsis: synopsis.trim(),
                    logo_image: logoImage.trim(),
                    image: image.trim(),
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
                    logo_image: logoImage.trim(),
                    image: image.trim(),
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
    const sendRequest = async (method: string, parameters: Anime) => {
        if (method === 'PUT') {
            const responseAnime = await axios({ method: method, url: urlAnimes + `/${id}`, data: parameters });
            const animeId = responseAnime.data.id;

            showAlert('Se actualizó correctamente', 'success');
            // CREATE RELATED GENRES
            for (let genreId of selectedGenreIdArray) {
                const parametersAnimeGenre = {
                    animeId: animeId,
                    genreId: genreId,
                };
                await axios({ method: 'PUT', url: urlAnimeGenres + `/${animeId}/genres/${id}`, data: parametersAnimeGenre });
            }
        } else {
            // CREATE ANIME AND OBTAIN ID
            const responseAnime = await axios({ method: method, url: urlAnimes, data: parameters });
            const animeId = parseInt(responseAnime.data.id);

            // CREATE RELATED GENRES
            for (let genreId of selectedGenreIdArray) {
                const parametersAnimeGenre = {
                    animeId: animeId,
                    genreId: genreId,
                };
                await axios({ method: 'POST', url: urlAnimeGenres + `/${animeId}/genres`, data: parametersAnimeGenre });
            }

            showAlert('Se registró correctamente', 'success');
        }
        getAnimes(setAnimes);
        getAnimeGenres(setAnimes);
    };

    /**
     * 
     * * FUNCTION IS USED TO SEND DATA FOR EACH INPUT FROM THE MODAL, IF IS PUT OR POST REQUEST
     */
    const deleteAnime = async (id: number | undefined) => {
        setId(id);
        await axios({ method: 'DELETE', url: urlAnimes + `/${id}`, data: id });
        showAlert('Se elimino correctamente', 'success');
        getAnimes(setAnimes);
        getAnimeGenres(setAnimes);
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
                        <TableColumn>IMAGEN</TableColumn>
                        <TableColumn>GÉNEROS</TableColumn>
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
                                            <TableCell>
                                                <img src={anime.image} width={56} alt={anime.title_english} />
                                            </TableCell>
                                            <TableCell className="flex flex-col gap-2">
                                                {anime.genres && anime.genres.map((genre) => (
                                                    <Chip key={genre.id} >{genre.name}</Chip>
                                                ))}
                                            </TableCell>
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
                                                    <Button className="bg-transparent" onPress={onOpen} onClick={() => { openModalEdit(2, anime.id, anime.title_japanese, anime.title_english, anime.synopsis, anime.logo_image, anime.image) }}>
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
                                <Select
                                    label="Géneros"
                                    selectionMode="multiple"
                                    variant="bordered"
                                    className="w-full"
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
                                    label="Imagen"
                                    variant="bordered"
                                    value={image}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Agregue una imagen"}
                                    onChange={(e) => setImage(e.target.value)}
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