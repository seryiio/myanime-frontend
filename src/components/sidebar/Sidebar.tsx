import { Link } from 'react-router-dom';

import './Sidebar.scss'

import Logo from '../../assets/images/Branding/Logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight, faCompass, faEarthAmericas, faHouse, faLayerGroup, faMagnifyingGlass, faNewspaper, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';

export const Sidebar = () => {

    const [openSidebar, setOpenSidebar] = useState(false);

    function toggleSidebar() {
        setOpenSidebar(true);
        if (openSidebar === true) { setOpenSidebar(false); }
    }

    return (
        <>
            <aside id='aside' className={openSidebar ? 'aside close' : 'aside'}>
                <div className="w-1/3"><Link to={'/'}>
                    <img src={Logo} alt="Logo MyAnimes" /></Link>
                </div>
                <button onClick={toggleSidebar}>
                    {
                        openSidebar ?
                            <FontAwesomeIcon icon={faCircleRight} size="lg" /> :
                            <FontAwesomeIcon icon={faCircleLeft} size="lg" />
                    }
                </button>
                <div className="aside__content-1">
                    <div className="aside__content-1--home">
                        <Link className='link' to={'/'}>
                            <FontAwesomeIcon icon={faHouse} /> <p className='text-list'>Inicio</p></Link>
                    </div>
                    <div className="aside__content-1--search">
                        <Link className='link' to={'/'}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} /> <p className='text-list'>Buscar</p></Link>
                    </div>
                </div>
                <div className="aside__content-2">
                    <div className="aside__content-2--top">
                        <div className="list">
                            <Link className='link' to={'/'}>
                                <FontAwesomeIcon icon={faCompass} /> <p className='text-list'>Explorar</p></Link>
                        </div>
                        <div className="list">
                            <Link className='link' to={'/'}>
                                <FontAwesomeIcon icon={faLayerGroup} /> <p className='text-list'>Mi Lista</p></Link>
                        </div>
                        <div className="list">
                            <Link className='link' to={'/'}>
                                <FontAwesomeIcon icon={faNewspaper} /> <p className='text-list'>Noticias</p></Link>
                        </div>
                        <div className="list">
                            <Link className='link' to={'/'}><FontAwesomeIcon icon={faEarthAmericas} /> <p className='text-list'>Comunidad</p></Link>
                        </div>
                    </div>
                    <Dropdown className='aside__content-2--bottom dark text-white'>
                        <DropdownTrigger>
                            <Button className='aside__content-2--bottom'
                                variant="light"
                            >
                                <User
                                    className='text-white text-list'
                                    name="Usuario"
                                    description="@usuario"
                                    avatarProps={{
                                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                    }}
                                />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="copy"><Link className='flex' to={`/register`}>Registrarse</Link></DropdownItem>
                            <DropdownItem key="edit"><Link className='flex' to={`/login`}>Acceder</Link></DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                Cerrar Sesión
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;