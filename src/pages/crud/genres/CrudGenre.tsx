import { Form, Link } from "react-router-dom";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Pagination, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { useEffect, useMemo, useState } from "react";
import { Genre } from "../../../interfaces/Genre";
import { URL_GENRES, getGenres } from "../../../services/GenreService";
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

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(genres.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return genres.slice(start, end);
    }, [page, genres]);

    const validate = async () => {
        let parameters: Genre;
        let method: string = '';

        if (name.trim() === '') {
            parameters = { name: '' }
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
                await axios({ method: method, url: URL_GENRES, data: parameters });
            }
        } catch (error) {
            alert('Hubo un error');
        }
        getGenres(setGenres);
    };

    const deleteGenre = async (id: number | undefined) => {
        setId(id);
        await axios({ method: 'DELETE', url: URL_GENRES + `/${id}`, data: id });
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
                <Breadcrumbs className="dark">
                    <BreadcrumbItem> <Link to={`/crud`}>CRUD</Link> </BreadcrumbItem>
                    <BreadcrumbItem>Géneros</BreadcrumbItem>
                </Breadcrumbs>
                <h1>Crear</h1>

                <Form className="flex justify-center items-center h-max gap-8" method="post">
                    <label htmlFor="">Género: </label>
                    <input type="text" id="name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyPress} />
                    <Button color="success" onClick={() => validate()} >
                        Crear
                    </Button>
                </Form>
            </div>
            <div className="list">
                <h1>Lista de Generos</h1>
                <Table
                    aria-label="Table Genres"
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
                        <TableColumn>GÉNERO</TableColumn>
                        <TableColumn>OPCIONES</TableColumn>
                    </TableHeader>

                    {
                        items.length ? (
                            <TableBody items={items}>
                                {
                                    (genre) => (
                                        <TableRow key={genre.id}>
                                            <TableCell>{genre.id}</TableCell>
                                            <TableCell>{genre.name}</TableCell>
                                            <TableCell className="flex gap-2">
                                                <Tooltip content="Editar">
                                                    <a>
                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </span>
                                                    </a>
                                                </Tooltip>
                                                <Tooltip content="Eliminar">
                                                    <a onClick={() => deleteGenre(genre.id)}>
                                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </span>
                                                    </a>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        ) : <TableBody emptyContent={"No hay contenido."}>{[]}</TableBody>
                    }
                </Table>
            </div>
        </>
    )
}

export default CrudGenre;