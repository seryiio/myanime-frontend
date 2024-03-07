import { useEffect, useMemo, useState } from "react";

import '../Crud.scss'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { URL_SEASON } from "../../../services/SeasonService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { showAlert } from "../../../utils/Alert";
import { Link, useParams } from "react-router-dom";
import { Song } from "../../../interfaces/Song";
import { getSongsBySeasonId } from "../../../services/SongService";

const CrudSong = () => {

    const idseason = useParams().idseason;


    const [titleModal, setTitleModal] = useState('');
    const [labelButton, setLabelButton] = useState('');
    const [operation, setOperation] = useState<number>(0);

    const [songs, setSongs] = useState<Song[]>([]);
    const [id, setId] = useState<number | undefined>();
    const [number, setNumber] = useState(0);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');

    const CONVERT_ID_SEASON = idseason ? parseInt(idseason) : NaN;


    useEffect(() => {
        getSongsBySeasonId(idseason, setSongs);
    }, [idseason]);



    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(songs.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return songs.slice(start, end);
    }, [page, songs]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };


    const openModalRegister = (op: number) => {
        setTitleModal('Registrar Canción');
        setLabelButton('Agregar');
        setId(0);
        setNumber(0);
        setTitle('');
        setType('');
        setLink('');
        setOperation(op);
    }

    const openModalEdit = (op: number, id: number | undefined, number: number, title: string, link: string, type: string) => {
        setTitleModal('Editar Canción');
        setLabelButton('Editar');
        setId(id);
        setNumber(number);
        setTitle(title);
        setLink(link);
        setType(type);
        setOperation(op);
    }

    const validate = () => {
        let parameters: Song;
        let method: string;
        if (operation === 1) {
            parameters = {
                number: number,
                title: title,
                link: link,
                type: type,
                seasonId: CONVERT_ID_SEASON,
            };

            method = 'POST';
        }
        else {
            parameters = {
                number: number,
                title: title,
                link: link,
                type: type,
                seasonId: CONVERT_ID_SEASON,
            };
            method = 'PUT';
        }
        sendRequest(method, parameters);
    }

    const deleteSong = async (id: number | undefined) => {
        setId(id);
        await axios({ method: 'DELETE', url: URL_SEASON + `/${idseason}` + `/songs/${id}`, data: id });
        showAlert('Se elimino correctamente', 'success');
        getSongsBySeasonId(idseason, setSongs);
    }

    const sendRequest = async (method: string, parameters: Song) => {
        if (method === 'PUT') {
            await axios({ method: method, url: URL_SEASON + `/${idseason}/songs/${id}`, data: parameters });
            showAlert('Se actualizó correctamente', 'success');
        } else {
            await axios({ method: method, url: URL_SEASON + `/${idseason}/songs`, data: parameters });
            showAlert('Se registró correctamente', 'success');
        }
        getSongsBySeasonId(idseason, setSongs);
    };

    return (
        <>
            <section className="title">
                <Breadcrumbs className="dark">
                    <BreadcrumbItem> <Link to={`/crud`}>CRUD</Link> </BreadcrumbItem>
                    <BreadcrumbItem>Canciones</BreadcrumbItem>
                </Breadcrumbs>
                <h1>Agregar Canción</h1>
                <Button color="success" onPress={onOpen} onClick={() => { openModalRegister(1) }}>Crear</Button>
            </section>
            <section className="list">
                <h1>Lista de Canciones</h1>
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
                        <TableColumn>NÚMERO</TableColumn>
                        <TableColumn>TÍTULO</TableColumn>
                        <TableColumn>TIPO</TableColumn>
                        <TableColumn>ENLACE</TableColumn>
                        <TableColumn>OPCIONES</TableColumn>
                    </TableHeader>

                    {
                        items.length ? (
                            <TableBody items={items}>
                                {
                                    (songs) => (
                                        <TableRow key={songs.id}>
                                            <TableCell>{songs.id}</TableCell>
                                            <TableCell>{songs.number}</TableCell>
                                            <TableCell>{songs.title}</TableCell>
                                            <TableCell>{songs.type}</TableCell>
                                            <TableCell><a href={songs.link}>{songs.link}</a></TableCell>
                                            <TableCell className="flex gap-2">
                                                <Tooltip content="Editar">
                                                    <Button onPress={onOpen} onClick={() => {
                                                        openModalEdit(2, songs.id,
                                                            songs.number, songs.title, songs.link, songs.type)
                                                    }}>
                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </span>
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Eliminar">
                                                    <Button onClick={() => deleteSong(songs.id)}>
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
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{titleModal}</ModalHeader>
                            <ModalBody className="formSongbS">
                                <Input
                                    type="number"
                                    className="formSongbS__inputNumber"
                                    autoFocus
                                    label="Número"
                                    variant="bordered"
                                    value={number}
                                    onChange={(e) => setNumber(parseInt(e.target.value))}
                                />
                                <Input
                                    className="formSongbS__inputTitle"
                                    autoFocus
                                    label="Titulo"
                                    variant="bordered"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Input
                                    className="formSongbS__inputLink"
                                    label="Link"
                                    variant="bordered"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                                <Select
                                    className="form__inputType"
                                    label="Tipo"
                                    variant="bordered"
                                    selectedKeys={[type]}
                                    onChange={handleSelectionChange}
                                >
                                    <SelectItem key={"Opening"} value={"Opening"}>Opening</SelectItem>
                                    <SelectItem key={"Ending"} value={"Ending"}>Ending</SelectItem>
                                    <SelectItem key={"Character Song"} value={"Character Song"}>Character Song</SelectItem>
                                    <SelectItem key={"Soundtrack"} value={"Soundtrack"}>Soundtrack</SelectItem>
                                    <SelectItem key={"Tematic Song"} value={"Tematic Song"}>Tematic Song</SelectItem>
                                </Select>
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

export default CrudSong;