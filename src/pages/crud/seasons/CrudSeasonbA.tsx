import { useEffect, useState } from "react";
import { Box, Button, Checkbox, DialogTitle, FormControl, FormLabel, Input, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { Season } from "../../../interfaces/Season";
import { URL_SEASON, getAllSeasons, getAllSeasonsById } from "../../../services/SeasonService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "@mui/joy/ModalDialog";
import axios from "axios";
import { showAlert } from "../../../utils/Alert";
import { useParams } from "react-router-dom";

export const CrudSeasonbA = () => {

    const animeIdparam = useParams().id;

    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState<number>(0);

    const [seasons, setSeasons] = useState<Season[]>([]);
    const [id, setId] = useState<number | undefined>();
    const [number, setNumber] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);
    const [animeId, setAnimeId] = useState(0);

    const convertIdAnime = animeIdparam ? parseInt(animeIdparam) : NaN;

    useEffect(() => {
        getAllSeasonsById(animeIdparam, setSeasons);
    }, [animeIdparam]);


    /**
     * *ESTADOS NECESRIOS PARA EL MODAL DE MATERIALUI
     */
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false) };

    const openModalRegister = (op: number) => {
        setId(0);
        setNumber(0);
        setStartDate('');
        setEndDate('');
        setDescription('');
        setStatus(false);
        setTitleModal('Registrar Temporada');
        setOperation(op);
    }

    const openModalEdit = (op: number, id: number | undefined, number: number, start_date: string, end_date: string, description: string, status: boolean) => {
        setTitleModal('Editar Temporada');
        setId(id);
        setNumber(number);
        setStartDate(start_date);
        setEndDate(end_date);
        setDescription(description);
        setStatus(status);
        setOperation(op);
    }

    const validate = () => {
        let parameters: Season;
        let method: string;
        if (operation === 1) {
            parameters = {
                number: number,
                start_date: startDate.trim(),
                end_date: endDate.trim(),
                description: description.trim(),
                animeId: convertIdAnime,
                status: status,
            };

            method = 'POST';
        }
        else {
            parameters = {
                number: number,
                start_date: startDate.trim(),
                end_date: endDate.trim(),
                description: description.trim(),
                animeId: convertIdAnime,
                status: status,
            };
            method = 'PUT';
        }
        sendRequest(method, parameters);
    }

    const deleteSeason = async (id: number | undefined) => {
        setId(id);
        await axios({ method: 'DELETE', url: URL_SEASON + `/${id}`, data: id });
        showAlert('Se elimino correctamente', 'success');
        getAllSeasonsById(animeIdparam, setSeasons);
    }

    const sendRequest = async (method: string, parameters: Season) => {
        if (method === 'PUT') {
            await axios({ method: method, url: URL_SEASON + `/${id}`, data: parameters });
            showAlert('Se actualizó correctamente', 'success');
        } else {
            await axios({ method: method, url: URL_SEASON, data: parameters });
            showAlert('Se registró correctamente', 'success');
        }
        getAllSeasonsById(animeIdparam, setSeasons);
    };


    return (
        <>
            <section className="title">
                <h1>Crear Temporadas</h1>

                <Button variant="contained" color="success" onClick={() => { handleOpen(); openModalRegister(1) }}>Crear</Button>
            </section>
            <section className="list">
                <h1>Lista de Temporadas</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Numero</TableCell>
                                <TableCell>Inicio</TableCell>
                                <TableCell>Fin</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell>AnimeID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        {seasons.length > 0 ? (
                            <TableBody>
                                {seasons.map((season) => (
                                    <TableRow
                                        key={season.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {season.id}
                                        </TableCell>
                                        <TableCell>{season.number}</TableCell>
                                        <TableCell>{season.start_date}</TableCell>
                                        <TableCell>{season.end_date}</TableCell>
                                        <TableCell>{season.description}</TableCell>
                                        <TableCell>{season.animeId}</TableCell>
                                        <TableCell>{season.status ? 'true' : 'false'}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                onClick={() => { handleOpen(); openModalEdit(2, season.id, season.number, season.start_date, season.end_date, season.description, season.status) }}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => deleteSeason(season.id)}
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
                                    <FormControl className="form">
                                        <FormLabel>Numero</FormLabel>
                                        <NumberInput
                                            aria-label="Demo number input"
                                            placeholder="Type a number…"
                                            value={number}
                                            onChange={(event, val) => setNumber(val)} />
                                    </FormControl>
                                    <FormControl className="modal__form--year flex-1">
                                        <FormLabel>Descripción</FormLabel>
                                        <Input required type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </FormControl>
                                    <FormControl className="modal__form--status">
                                        <FormLabel>Status</FormLabel>
                                        <Checkbox
                                            id="status"
                                            checked={status}
                                            onChange={(e) => setStatus(e.target.checked)} />
                                    </FormControl>
                                </Stack>
                                <Stack spacing={{ xs: 1, sm: 4 }} direction="row" useFlexGap flexWrap="wrap">
                                    <FormControl className="form flex-1">
                                        <FormLabel>Inicio</FormLabel>
                                        <Input autoFocus required type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                    </FormControl>
                                    <FormControl className="modal__form--year flex-1">
                                        <FormLabel>Fin</FormLabel>
                                        <Input required type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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

export default CrudSeasonbA;