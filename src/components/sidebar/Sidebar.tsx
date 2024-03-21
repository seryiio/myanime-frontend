import { Link } from 'react-router-dom';

import './Sidebar.scss'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCompass, faEarthAmericas, faHouse, faLayerGroup, faLock, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Userdata } from '../../interfaces/Userdata';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Genre } from '../../interfaces/Genre';
import { getGenres } from '../../services/GenreService';

export const Sidebar = () => {
    const authUser = useAuthUser<Userdata>();
    const role = authUser ? authUser.role : '';
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getGenres(setGenres);
    }, [])

    return (
        <>
            <div className="aside__content-1">
                <div className="aside__content-1--home">
                    <Link reloadDocument className='link' to={'/'}>
                        <FontAwesomeIcon icon={faHouse} /> <p className='text-list'>Inicio</p></Link>
                </div>
            </div>
            <div className="aside__content-2">
                <div className="aside__content-2--top">
                    <Dropdown className='list w-96 dark text-white' type='menu'>
                        <DropdownTrigger>
                            <div className='flex justify-start items-center gap-2 cursor-pointer'
                            >
                                <FontAwesomeIcon icon={faCompass} color='white' /> <p className='text-list'>Explorar </p>
                                <FontAwesomeIcon icon={faChevronRight} color='white' size='2xs' />
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
                                            <Link reloadDocument className='link' to={`/genres/${genre.id}/animes`}>
                                                <p className='text-list'>{genre.name}</p>
                                            </Link>
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                    <div className="list">
                        <Link reloadDocument className='link' to={'/mylist'}>
                            <FontAwesomeIcon icon={faLayerGroup} /> <p className='text-list'>Mi Lista</p></Link>
                    </div>
                    <div className="list">
                        <Link reloadDocument className='link' to={'/'}>
                            <FontAwesomeIcon icon={faNewspaper} /> <p className='text-list'>Noticias</p></Link>
                    </div>
                    <div className="list">
                        <Link reloadDocument className='link' to={'/'}><FontAwesomeIcon icon={faEarthAmericas} /> <p className='text-list'>Comunidad</p></Link>
                    </div>
                    {role.includes('ADMIN') && (
                        <div className="list">
                            <Link reloadDocument className='link' to={'/crud'}>
                                <FontAwesomeIcon icon={faLock} /> <p className='text-list'>CRUD</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Sidebar;