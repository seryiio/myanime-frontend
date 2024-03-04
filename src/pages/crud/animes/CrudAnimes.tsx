import React, { useEffect, useState } from "react";

import '../Crud.scss'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Checkbox from '@mui/material/Checkbox';

import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Anime } from "../../../interfaces/Anime";
import { getAnimeGenres, getAnimes, urlAnimes } from "../../../services/AnimeService";
import { showAlert } from "../../../utils/Alert";
import { Box, Chip, DialogTitle, FormControl, FormLabel, Input, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack } from "@mui/material";
import { Genre } from "../../../interfaces/Genre";
import { getGenres } from "../../../services/GenreService";
import { AnimeGenre } from "../../../interfaces/AnimeGenre";
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
    const [id, setId] = useState<number | undefined>(undefined);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [image, setImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [url, setUrl] = useState('');
    const [urlTrailer, setUrlTrailer] = useState('');
    const [status, setStatus] = useState<boolean | undefined>(false);

    /**
     * *ALL USESTATE FOR GENRE SERVICE
     */
    const [genres, setGenres] = useState<Genre[]>([]);

    /**
     * *ATTRIBUTES FOR GENRE
     */
    const [genreName, setGenreName] = useState<string[]>([]);

    /**
     * *ARRAY NEEDED TO CAPTURE SELECTED IDS IN SELECTEDINPUT
     */
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

    /**
     * *ALL USESTATE FOR ANIMEGENRE SERVICE
     */
    const [animeGenres, setAnimeGenres] = useState<AnimeGenre[]>([]);

    useEffect(() => {
        getAnimes(setAnimes);
        getGenres(setGenres);
        getAnimeGenres(setAnimes);
    }, []);
    console.log(animeGenres);

    const genreNames = genres.map((genre) => genre.name);

    const listGenres = genreNames;

    /**
     * * THIS FUNCTION IS USED FOR VALIDATE DATA INPUTS, IF IN THE CASE THE BUTTON RETURN PUT OR POST
     */
    const validate = () => {
        let parameters: Anime;
        let method: string;

        if (operation === 1) {
            parameters = {
                title: title.trim(),
                type: type.trim(),
                description: description.trim(),
                year: year.trim(),
                image: image.trim(),
                cover_image: coverImage.trim(),
                url: url.trim(),
                url_trailer: urlTrailer.trim(),
                status: status,
                genres: genres,
            };

            method = 'POST';
        }
        else {
            parameters = {
                id: id,
                title: title.trim(),
                type: type.trim(),
                description: description.trim(),
                year: year.trim(),
                image: image.trim(),
                cover_image: coverImage.trim(),
                url: url.trim(),
                url_trailer: urlTrailer.trim(),
                status: status,
                genres: genres,
            };
            method = 'PUT';
        }
        sendRequest(method, parameters);
    };

    /**
     * 
     * * EVENT FUNCTION USED WHEN THE USER SELECT ONE OR MORE GENRES IN THE SELECT INPUT
     */
    const handleChangeGenres = (event: SelectChangeEvent<typeof genreName>) => {
        const { target: { value } } = event;

        const SELECTED_VALUES = Array.isArray(value) ? value : [value];

        const SELECTED_GENRE_IDS = SELECTED_VALUES
            .map((selectedGenreName: string) => {
                const selectedGenre = genres.find((genre) => genre.name === selectedGenreName);
                return selectedGenre ? selectedGenre.id : undefined;
            })
            .filter((id) => typeof id === 'number') as number[];

        setSelectedGenreIds(SELECTED_GENRE_IDS);
        setGenreName(SELECTED_VALUES);
    };


    /**
     * 
     * * FUNCTION IS USED TO SEND DATA FOR EACH INPUT FROM THE MODAL, IF IS PUT OR POST REQUEST
     */
    const sendRequest = async (method: string, parameters: Anime) => {
        if (method === 'PUT') {
            await axios({ method: method, url: urlAnimes + `/${id}`, data: parameters });
            showAlert('Se actualizó correctamente', 'success');
        } else {
            // CREATE ANIME AND OBTAIN ID
            const responseAnime = await axios({ method: method, url: urlAnimes, data: parameters });
            const animeId = responseAnime.data.id;

            // CREATE RELATED GENRES
            for (let genreId of selectedGenreIds) {
                const parametersAnimeGenre = {
                    animeId: animeId,
                    genreId: genreId,
                };
                await axios({ method: 'POST', url: urlAnimes + `/${animeId}/genres`, data: parametersAnimeGenre });
            }

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
        await axios({ method: 'DELETE', url: urlAnimes + `/${id}`, data: id });
        showAlert('Se elimino correctamente', 'success');
        getAnimes(setAnimes);
    }

    const openModal = (op: number, id: number | undefined, title: string, type: string, description: string, year: string, image: string, coverImage: string, url: string, urlTrailer: string, status: boolean | undefined) => {
        setId(0);
        setTitle('');
        setType('');
        setDescription('');
        setGenreName([]);
        setYear('');
        setImage('');
        setCoverImage('');
        setUrl('');
        setUrlTrailer('');
        setStatus(false);
        if (op === 1) {
            setTitleModal('Registrar Anime');
        }
        else if (op === 2) {
            setTitleModal('Editar Anime');
            setId(id);
            setTitle(title);
            setType(type);
            setDescription(description);
            setYear(year);
            setImage(image);
            setCoverImage(coverImage);
            setUrl(url);
            setUrlTrailer(urlTrailer);
            setStatus(status);
        }
        setOperation(op);
        window.setTimeout(() => {
            document.getElementById('name')?.focus();
        }, 500);
    }

    /**
     * *ESTADOS NECESRIOS PARA EL MODAL DE MATERIALUI
     */
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false) };

    const handleChangeSelectType = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    return (
        <>
            <section className="create">
                <h1>Crear Animes</h1>
                <Button variant="contained" color="success" onClick={() => { handleOpen(); openModal(1) }}>Crear</Button>
            </section>
            <section className="list">
                <h1>Lista de Animes</h1>
                <TableContainer className="list__tableContainer" component={Paper}>
                    <Table className="list__tableContainer--table" sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Titulo</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell>Año</TableCell>
                                <TableCell>Imagen</TableCell>
                                <TableCell>Cover Image</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell>URL Trailer</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Géneros</TableCell>
                                <TableCell>Temporadas</TableCell>
                                <TableCell>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        {animes.length > 0 ? (
                            <TableBody>
                                {animes.map((anime) => (
                                    <TableRow
                                        key={anime.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {anime.id}
                                        </TableCell>
                                        <TableCell>{anime.title}</TableCell>
                                        <TableCell>{anime.type}</TableCell>
                                        <TableCell>{anime.description}</TableCell>
                                        <TableCell>{anime.year}</TableCell>
                                        <TableCell>{anime.image}</TableCell>
                                        <TableCell>{anime.cover_image}</TableCell>
                                        <TableCell>{anime.url}</TableCell>
                                        <TableCell>{anime.url_trailer}</TableCell>
                                        <TableCell>{anime.status ? 'true' : 'false'}</TableCell>
                                        <TableCell>
                                            {anime.genres && anime.genres.map((genre) => (
                                                <Chip key={genre.id} label={genre.name} />
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                            >
                                                <Link to={`${anime.id}`}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    validate();
                                                    handleOpen();
                                                    openModal(
                                                        2,
                                                        anime.id,
                                                        anime.title,
                                                        anime.type,
                                                        anime.description,
                                                        anime.year,
                                                        anime.image,
                                                        anime.cover_image,
                                                        anime.url,
                                                        anime.url_trailer,
                                                        anime.status
                                                    );
                                                }}
                                                variant="contained"
                                                color="warning"
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                            <Button
                                                onClick={() => deleteAnime(anime.id)}
                                                variant="contained"
                                                color="error"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={12} className="italic text-gray-500">
                                        No hay resultados
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>

            </section>
            <Modal className="modal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <ModalDialog
                        className="modal__dialog" sx={{ width: 922 }}>
                        <DialogTitle className="modal__dialog--title" >{titleModal}</DialogTitle>
                        <form
                            className="modal__dialog--form"
                            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                        >
                            <Stack spacing={{ xs: 1, sm: 2 }}>
                                <Stack spacing={{ xs: 1, sm: 4 }} direction="row" useFlexGap flexWrap="wrap">
                                    <FormControl className="form flex-1">
                                        <FormLabel>Titulo</FormLabel>
                                        <Input autoFocus required type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </FormControl>
                                    <FormControl className="modal__form--year">
                                        <FormLabel>Año</FormLabel>
                                        <Input required type="date" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                                    </FormControl>
                                    <FormControl className="modal__form--status">
                                        <FormLabel>Status</FormLabel>
                                        <Checkbox
                                            id="status"
                                            checked={status}
                                            onChange={(e) => setStatus(e.target.checked)} />
                                    </FormControl>
                                    <FormControl className="w-56">
                                        <FormLabel>Tipo</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            onChange={(e) => {
                                                handleChangeSelectType(e);
                                                setType(e.target.value);
                                            }}
                                            placeholder="Tipo..."
                                            id="type"
                                            value={type}
                                        >
                                            <MenuItem value="">
                                                <em>Tipo...</em>
                                            </MenuItem>
                                            <MenuItem value="TV">TV</MenuItem>
                                            <MenuItem value="Movie">Movie</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>

                                <Stack spacing={{ xs: 1, sm: 4 }} direction="row" useFlexGap flexWrap="wrap">
                                    <FormControl className="flex-1">
                                        <FormLabel>Descripcion</FormLabel>
                                        <Input required type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </FormControl>
                                    <FormControl className="w-96">
                                        <FormLabel>Generos</FormLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={genreName}
                                            onChange={handleChangeGenres}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {listGenres.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>

                                <Stack spacing={{ xs: 1, sm: 4 }} direction="row" useFlexGap flexWrap="wrap">
                                    <FormControl className="flex-1">
                                        <FormLabel>Imagen</FormLabel>
                                        <Input required type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                                    </FormControl>
                                    <FormControl className="flex-1">
                                        <FormLabel>Cover Image</FormLabel>
                                        <Input required type="text" id="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
                                    </FormControl>
                                </Stack>
                                <Stack spacing={{ xs: 1, sm: 4 }} direction="row" useFlexGap flexWrap="wrap">
                                    <FormControl className="flex-1">
                                        <FormLabel>URL</FormLabel>
                                        <Input required type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                                    </FormControl>
                                    <FormControl className="flex-1">
                                        <FormLabel>URL Trailer</FormLabel>
                                        <Input required type="text" id="urlTrailer" value={urlTrailer} onChange={(e) => setUrlTrailer(e.target.value)} />
                                    </FormControl>
                                </Stack>
                                <Button variant="contained" color="success" type="submit" onClick={() => { validate(); handleOpen(); }}>Enviar</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Box >
            </Modal >
        </>
    )
}

export default CrudAnime;