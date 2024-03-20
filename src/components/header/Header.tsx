import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Branding/Logo.svg';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Userdata } from '../../interfaces/Userdata';

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
                <DropdownItem key="delete" className="text-danger" color="danger" onClick={logout}>
                    Cerrar Sesión
                </DropdownItem>
            ];
        } else {
            return [
                <DropdownItem key="copy"><Link className='flex' to={`/register`}>Registrarse</Link></DropdownItem>,
                <DropdownItem key="edit"><Link className='flex' to={`/login`}>Acceder</Link></DropdownItem>
            ];
        }
    };
    return (
        <>
            <div>
                <div className="aside__header w-1/3"><Link to={'/'}>
                    <img src={Logo} alt="Logo MyAnimes" /></Link>
                </div>
            </div>
            <div className='w-1/3'>
                <Input className='dark text-white' variant={'bordered'} placeholder="Buscar..." />
            </div>
            <Dropdown className='aside__content-2--bottom dark text-white'>
                <DropdownTrigger className='dropdownTrigger'>
                    <Button className='profile'
                        variant="light"
                    >
                        <picture>
                            <FontAwesomeIcon icon={faUser} size='xl' style={{ color: 'white' }} />
                        </picture>
                        <p className='text-list'>{username}</p>
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