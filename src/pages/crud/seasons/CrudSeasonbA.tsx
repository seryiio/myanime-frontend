import { useEffect, useMemo, useState } from "react";

import '../Crud.scss'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Select, SelectItem, Chip, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { Season } from "../../../interfaces/Season";
import { URL_SEASON, URL_SEASON_BY_ANIME, getAllSeasonsById } from "../../../services/SeasonService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "@mui/joy/ModalDialog";
import axios from "axios";
import { showAlert } from "../../../utils/Alert";
import { Link, useParams } from "react-router-dom";

export const CrudSeasonbA = () => {

    const animeIdparam = useParams().id;

    const [titleModal, setTitleModal] = useState('');
    const [labelButton, setLabelButton] = useState('');
    const [operation, setOperation] = useState<number>(0);

    const [seasons, setSeasons] = useState<Season[]>([]);
    const [id, setId] = useState<number | undefined>();
    const [number, setNumber] = useState(0);
    const [titleJapanese, setTitleJapanese] = useState('');
    const [titleEnglish, setTitleEnglish] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [year, setYear] = useState(0);
    const [seasonYear, setSeasonYear] = useState('');
    const [type, setType] = useState('');
    const [studio, setStudio] = useState('');
    const [image, setImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [coverImageSecondary, setCoverImageSecondary] = useState('');
    const [urlTrailer, setUrlTrailer] = useState('');
    const [status, setStatus] = useState(false);

    const convertIdAnime = animeIdparam ? parseInt(animeIdparam) : NaN;

    useEffect(() => {
        getAllSeasonsById(animeIdparam, setSeasons);
    }, [animeIdparam]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(seasons.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return seasons.slice(start, end);
    }, [page, seasons]);

    const SEASON_LIST = ["Spring", "Summer", "Autumn", "Winter"];

    const openModalRegister = (op: number) => {
        setId(0);
        setNumber(0);
        setTitleJapanese('');
        setTitleEnglish('');
        setSynopsis('');
        setYear(0);
        setSeasonYear('');
        setType('');
        setStudio('');
        setImage('');
        setCoverImage('');
        setCoverImageSecondary('');
        setUrlTrailer('');
        setStatus(false);
        setTitleModal('Registrar Temporada');
        setLabelButton('Agregar');
        setOperation(op);
    }

    const openModalEdit = (op: number, id: number | undefined, number: number, titleJapanese: string, titleEnglish: string, synopsis: string, year: number, seasonYear: string, type: string, studio: string, image: string, coverImage: string, coverImageSecondary: string,urlTrailer: string, status: boolean) => {
        setTitleModal('Editar Temporada');
        setLabelButton('Editar');
        setId(id);
        setNumber(number);
        setTitleJapanese(titleJapanese);
        setTitleEnglish(titleEnglish);
        setSynopsis(synopsis);
        setYear(year);
        setSeasonYear(seasonYear);
        setType(type);
        setStudio(studio);
        setImage(image);
        setCoverImage(coverImage);
        setCoverImageSecondary(coverImageSecondary);
        setUrlTrailer(urlTrailer);
        setStatus(status);
        setOperation(op);
    }

    const validate = () => {
        let parameters: Season;
        let method: string;
        if (operation === 1) {
            parameters = {
                number: number,
                title_japanese: titleJapanese.trim(),
                title_english: titleEnglish.trim(),
                synopsis: synopsis.trim(),
                year: year,
                season_year: seasonYear.trim(),
                type: type.trim(),
                studio: studio.trim(),
                image: image.trim(),
                cover_image: coverImage.trim(),
                cover_image_secondary: coverImageSecondary.trim(),
                url_trailer: urlTrailer.trim(),
                animeId: convertIdAnime,
                status: status,
            };

            method = 'POST';
        }
        else {
            parameters = {
                number: number,
                title_japanese: titleJapanese.trim(),
                title_english: titleEnglish.trim(),
                synopsis: synopsis.trim(),
                year: year,
                season_year: seasonYear.trim(),
                type: type.trim(),
                studio: studio.trim(),
                image: image.trim(),
                cover_image: coverImage.trim(),
                cover_image_secondary: coverImageSecondary.trim(),
                url_trailer: urlTrailer.trim(),
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


    const handleSelectionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };
    const handleSelectionSeasonYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSeasonYear(e.target.value);
    };


    return (
        <>
            <section className="title">

                <Breadcrumbs className="dark">
                    <BreadcrumbItem> <Link to={`/crud`}>CRUD</Link> </BreadcrumbItem>
                    <BreadcrumbItem><Link to={`/crud/animes`}>Animes</Link></BreadcrumbItem>
                    <BreadcrumbItem>Seasons</BreadcrumbItem>
                </Breadcrumbs>
                <h1>Crear Temporadas</h1>

                <Button color="success" onPress={onOpen} onClick={() => { openModalRegister(1) }}>Crear</Button>
            </section>
            <section className="list">
                <h1>Lista de Temporadas</h1>
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
                        <TableColumn>NÚMERO</TableColumn>
                        <TableColumn>TÍTULO JAPONES</TableColumn>
                        <TableColumn>TÍTULO INGLÉS</TableColumn>
                        <TableColumn>SINOPSIS</TableColumn>
                        <TableColumn>AÑO</TableColumn>
                        <TableColumn>TEMPORADA</TableColumn>
                        <TableColumn>TIPO</TableColumn>
                        <TableColumn>STUDIO</TableColumn>
                        <TableColumn>IMAGEN</TableColumn>
                        <TableColumn>COVER IMAGE</TableColumn>
                        <TableColumn>COVER IMAGE SECONDARY</TableColumn>
                        <TableColumn>URL TRAILER</TableColumn>
                        <TableColumn>ESTADO</TableColumn>
                        <TableColumn>CANCIONES</TableColumn>
                        <TableColumn>EPISODIOS</TableColumn>
                        <TableColumn>OPCIONES</TableColumn>
                    </TableHeader>

                    {
                        items.length ? (
                            <TableBody items={items}>
                                {
                                    (season) => (
                                        <TableRow key={season.id}>
                                            <TableCell>{season.id}</TableCell>
                                            <TableCell>{season.number}</TableCell>
                                            <TableCell>{season.title_japanese}</TableCell>
                                            <TableCell>{season.title_english}</TableCell>
                                            <TableCell>{season.synopsis}</TableCell>
                                            <TableCell>{season.year}</TableCell>
                                            <TableCell>{season.season_year}</TableCell>
                                            <TableCell>{season.type}</TableCell>
                                            <TableCell>{season.studio}</TableCell>
                                            <TableCell>
                                                <img src={season.image} width={56} alt={season.title_english} />
                                            </TableCell>
                                            <TableCell>
                                                <img src={season.cover_image} width={56} alt={season.title_english} />
                                            </TableCell>
                                            <TableCell>
                                                <img src={season.cover_image_secondary} width={56} alt={season.title_english} />
                                            </TableCell>
                                            <TableCell>{season.url_trailer}</TableCell>
                                            <TableCell>{season.status ? <Chip color="success">En Emisión</Chip> : <Chip color="danger">Terminado</Chip>}</TableCell>
                                            <TableCell>
                                                <Tooltip content="Ver Canciones">
                                                    <Link to={`${season.id}/songs`}>

                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </span>
                                                    </Link>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip content="Ver Temporadas">
                                                    <Link to={`${season.id}/episodes`}>

                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </span>
                                                    </Link>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Tooltip content="Editar">
                                                    <Button className="bg-transparent" onPress={onOpen} onClick={() => {
                                                        openModalEdit(2, season.id, season.number, season.title_japanese, season.title_english, season.synopsis, season.year, season.season_year, season.type, season.studio, season.image, season.cover_image, season.cover_image_secondary,season.url_trailer,
                                                            season.status)
                                                    }}>
                                                        <span className="text-lg cursor-pointer active:opacity-50">
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </span>
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Eliminar">
                                                    <Button className="bg-transparent" onClick={() => deleteSeason(season.id)}>
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
                                    type="number"
                                    className="form__inputNumber"
                                    autoFocus
                                    label="Número"
                                    variant="bordered"
                                    value={number.toString()}
                                    onChange={(e) => setNumber(parseInt(e.target.value))}
                                />
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
                                    type="number"
                                    className="form__inputYear"
                                    label="Año"
                                    variant="bordered"
                                    value={(year).toString()}
                                    onChange={(e) => setYear(parseInt(e.target.value))}
                                />
                                <Select
                                    className="form__inputSeasonYear"
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
                                    className="form__inputType"
                                    label="Tipo"
                                    variant="bordered"
                                    selectedKeys={[type]}
                                    onChange={(handleSelectionTypeChange)}
                                >
                                    <SelectItem key={"TV"} value={"TV"}>TV</SelectItem>
                                    <SelectItem key={"Movie"} value={"Movie"}>Movie</SelectItem>
                                </Select>
                                <Input
                                    className="form__inputStudio"
                                    label="Studio"
                                    variant="bordered"
                                    value={studio}
                                    onChange={(e) => setStudio(e.target.value)}
                                />
                                <Input
                                    className="form__inputImage"
                                    label="Imagen"
                                    variant="bordered"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <Input
                                    className="form__inputCoverImage"
                                    label="Cover Imagen"
                                    variant="bordered"
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                />
                                <Input
                                    className="form__inputCoverImageSecondary"
                                    label="Cover Imagen Secondary"
                                    variant="bordered"
                                    value={coverImageSecondary}
                                    onChange={(e) => setCoverImageSecondary(e.target.value)}
                                />
                                <Input
                                    className="form__inputUrlTrailer"
                                    label="URL Trailer"
                                    variant="bordered"
                                    value={urlTrailer}
                                    onChange={(e) => setUrlTrailer(e.target.value)}
                                />
                                <Checkbox isSelected={status} className="form__CheckboxStatus" onChange={(e) => setStatus(e.target.checked)}>Estado</Checkbox>
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

export default CrudSeasonbA;