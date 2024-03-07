import React, { FunctionComponent, useState } from "react";

import './Header.scss'

import Logo from '../../assets/images/Branding/Logo.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import PersonIcon from '@mui/icons-material/Person';
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";

const Header = () => {



    return (
        <>
            <header className='header'>
                <div className="header__left">
                    <FontAwesomeIcon className="flex lg:hidden" icon={faBars} />
                    <div className="img"><Link to={'/'}>
                        <img src={Logo} alt="Logo MyAnimes" /></Link>
                    </div>
                </div>
                <div className="header__center">
                    <Input className="dark" type="email" variant={"bordered"} placeholder="Buscar..." />
                </div>
                <div className="header__right">
                    <Dropdown className="dark">
                        <DropdownTrigger>
                            <Button
                                variant="light"
                            >
                            <Avatar showFallback src='https://images.unsplash.com/broken' />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu className="text-white" aria-label="Static Actions">
                            <DropdownItem key="register"><Link className="flex justify-center items-center" to={`/register`}>Registrarse</Link></DropdownItem>
                            <DropdownItem key="access"><Link className="flex justify-center items-center" to={`/login`}>Acceder</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </header>
            <div id="dropdownLogin">
            </div>
        </>
    )
}
export default Header;