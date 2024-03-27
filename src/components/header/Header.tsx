import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Branding/Logo.svg';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Userdata } from '../../interfaces/Userdata';
import SearchInput from '../searchInput/SearchInput';
import { useState } from 'react';
import { Anime } from '../../interfaces/Anime';
import { getAnimes } from '../../services/AnimeService';

const Header = () => {
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const navigate = useNavigate();
    const authUser = useAuthUser<Userdata>();
    const username = authUser ? authUser.username : '';

    const logout = () => {
        signOut();
        navigate("/");
    }

    const MenuAuthenticated = () => {
        if (isAuthenticated()) {
            return [
                <DropdownItem showDivider>
                    <div className='flex gap-x-4'>
                        <picture>
                            <FontAwesomeIcon icon={faUser} size='xl' style={{ color: 'white' }} />
                        </picture>
                        <p className='font-semibold'>{username}</p>
                    </div>
                </DropdownItem>,
                <DropdownItem className='text-list'>
                    <p>Ver Perfil</p>
                </DropdownItem>,
                <DropdownItem className='text-list' showDivider><p>Configuración</p></DropdownItem>,
                <DropdownItem key="delete" className="text-danger" color="danger">
                    <Link reloadDocument to={`/`} onClick={logout}>Cerrar Sesión</Link>
                </DropdownItem>
            ];
        } else {
            return [
                <DropdownItem key="copy"><Link reloadDocument className='flex' to={`/register`}>Registrarse</Link></DropdownItem>,
                <DropdownItem key="edit"><Link reloadDocument className='flex' to={`/login`}>Acceder</Link></DropdownItem>
            ];
        }
    };

    return (
        <>
            <div>
                <div className="aside__header w-1/3"><Link reloadDocument to={'/'}>
                    <img src={Logo} alt="Logo MyAnimes" /></Link>
                </div>
            </div>
            <div className='w-1/2 lg:w-1/3 bg-white z-50'>
                <SearchInput />
            </div>
            <Dropdown className='aside__content-2--bottom dark text-white'>
                <DropdownTrigger className='dropdownTrigger'>
                    <Button className='profile'
                        variant="light"
                    >
                        <picture>
                            <FontAwesomeIcon icon={faUser} size='xl' style={{ color: 'white' }} />
                        </picture>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" items={MenuAuthenticated()}>
                    {MenuAuthenticated()}
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default Header;