import { Form, Link } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Genre } from "../../../interfaces/Genre";
import { getGenres, urlGenres } from "../../../services/GenreService";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const CrudGenre = () => {

    const [genres, setGenres] = useState<Genre[]>([]);
    const [id, setId] = useState<number | undefined>(undefined);
    const [name, setName] = useState('');

    useEffect(() => {
        getGenres(setGenres);
    }, []);

    const validate = async () => {
        let parameters: Genre = { name: '' };
        let method: string = '';

        if (name.trim() === '') {
            console.log("Please provide a name");
        } else {
            parameters = { name: name.trim() };
            method = 'POST';
        }

        await sendRequest(method, parameters);
    };

    const sendRequest = async (method: string, parameters: Genre) => {
        try {
            if (method === "PUT") {
            } else {
                await axios({ method: method, url: urlGenres, data: parameters });
                getGenres(setGenres);
            }
        } catch (error) {
            alert('Hubo un error');
        }
    };

    const deleteGenre = async (id: number | undefined) => {
        setId(id);
        await axios({ method: 'DELETE', url: urlGenres + `/${id}`, data: id });
        getGenres(setGenres);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita que se realice un salto de línea en el campo de texto
            validate();
        }
    };
    return (
        <>
            <div className="create">
                <h1>Crear</h1>

                <Form className="flex justify-center items-center h-max gap-8" method="post">
                    <label htmlFor="">Género: </label>
                    <input type="text" id="name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyPress} />
                    <Button variant="contained" color="success" onClick={() => validate()} >
                        Crear
                    </Button>
                </Form>
            </div>
            <div className="list">
                <h1>Lista de Generos</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Genero</TableCell>
                                <TableCell>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            genres.length ? (
                                <TableBody>
                                    {genres.map((genre) => (
                                        <TableRow
                                            key={genre.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {genre.id}
                                            </TableCell>
                                            <TableCell>{genre.name}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="warning">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Button>
                                                <Button onClick={() => deleteGenre(genre.id)} variant="contained" color="error">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : <TableBody><TableRow className="italic text-gray-500">No hay resultados</TableRow></TableBody>
                        }
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default CrudGenre;