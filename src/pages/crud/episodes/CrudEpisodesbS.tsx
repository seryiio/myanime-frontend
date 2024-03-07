import { Box, Button, Checkbox, DialogTitle, FormControl, FormLabel, Input, MenuItem, Modal, Paper, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { Season } from "../../../interfaces/Season";
import { URL_SEASON, getAllSeasonsById } from "../../../services/SeasonService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "@mui/joy/ModalDialog";
import axios from "axios";
import { showAlert } from "../../../utils/Alert";
import { Link, useParams } from "react-router-dom";

export const CrudEpisodesbS = () => {

    return (
        <>
            <section className="title">
                <h1>Agregar Episodios</h1>

                <Button variant="contained" color="success">Agregar</Button>
            </section>
            <section className="list">
                <h1>Lista de Episodios</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>SINOPSIS</TableCell>
                                <TableCell>Número</TableCell>
                                <TableCell>Duración</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>

            </section>
        </>
    )
}

export default CrudEpisodesbS;