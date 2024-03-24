import './BottomNavBar.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faCompass, faHouse, faLayerGroup, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Userdata } from '../../interfaces/Userdata';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { Genre } from '../../interfaces/Genre';
import { useEffect, useState } from 'react';
import { getGenres } from '../../services/GenreService';

const BottomNavBar = () => {
    const authUser = useAuthUser<Userdata>();
    const role = authUser ? authUser.role : '';
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getGenres(setGenres);
    }, [])
    return (
        <>
            <div className="flex justify-between items-end px-8 py-4 gap-8 text-white z-[999]">
                <Link reloadDocument className='flex flex-col justify-center items-center' to={'/'}>
                    <FontAwesomeIcon icon={faHouse} />
                    <p className='text-list'>Inicio</p>
                </Link>

                <Dropdown className='list w-96 dark text-white' type='menu'>
                    <DropdownTrigger>
                        <div className='flex flex-col justify-start items-center gap-2 cursor-pointer'
                        >
                            <FontAwesomeIcon icon={faChevronUp} color='white' size='2xs' />
                            <FontAwesomeIcon icon={faCompass} color='white' /> <p className='text-list'>Explorar </p>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                        <DropdownSection title="Libros" showDivider>
                            <DropdownItem
                            >
                                <Link reloadDocument className='link' to={`/books`}>
                                    <p className='text-list'>
                                        Ver Libros</p>
                                </Link>
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection title="Géneros" showDivider>
                            {
                                genres.map(genre => (
                                    <DropdownItem key={genre.id} className='w-max'>
                                        <Link reloadDocument to={`/genres/${genre.id}/animes`} className='link' >
                                            <p className='text-list'>{genre.name}</p>
                                        </Link>
                                    </DropdownItem>
                                ))
                            }
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
                <Link reloadDocument className='flex flex-col justify-center items-center' to={'/'}>
                    <FontAwesomeIcon icon={faLayerGroup} />
                    <p className='text-list'>Lista</p>
                </Link>
                {role.includes('ADMIN') && (
                    <Link reloadDocument className='flex flex-col justify-center items-center' to={'/crud'}>
                        <FontAwesomeIcon icon={faLock} /> <p className='text-list'>CRUD</p>
                    </Link>
                )}
            </div>
        </>
    )
}
export default BottomNavBar;