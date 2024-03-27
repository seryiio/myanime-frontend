import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSeasons } from "../../services/SeasonService";
import { Season } from "../../interfaces/Season";

const SearchInput = () => {

    const [value, setValue] = useState('');

    const [seasons, setSeason] = useState<Season[]>([]);

    useEffect(() => {
        getAllSeasons(setSeason);
    }, [value])

    const onChange = (event: any) => {
        setValue(event.target.value);
    }

    const onSearch = (searchTerm: any) => {
        getAllSeasons(setSeason);
        console.log("search", searchTerm);
    }

    return (
        <div className="relative">
            <Input
                className='dark text-foreground bg-background'
                placeholder="Buscar..."
                value={value}
                onChange={onChange}
                endContent={
                    <button onClick={() => onSearch(value)}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                }
            />
            <div className="absolute flex flex-col w-full">
                {
                    seasons.filter(season => {
                        const searchTerm = value.toLowerCase();
                        const fullTitle = season.title_english.toLowerCase();

                        return searchTerm && fullTitle.startsWith(searchTerm) && fullTitle !== searchTerm;
                    })
                        .map(season => (
                            <div key={season.id}
                                onChange={onChange}
                                onClick={() => onSearch(season.title_english)}
                                className='bg-black/90 text-white p-2'>
                                <Link reloadDocument to={`animes/${season.animeId}/seasons/${season.id}`} className="flex justify-start items-center gap-2">
                                    <img src={season.image} width={25} alt="" />
                                    {season.title_english}
                                </Link>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default SearchInput;