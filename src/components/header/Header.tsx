import React, { FunctionComponent, useState } from "react";

import './Header.scss'

import Logo from '../../assets/images/Branding/Logo.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Box, FormControl, InputAdornment, TextField, colors } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { deepOrange } from "@mui/material/colors";
import Dropdown from "../dropdown/Dropdown";
import { Link } from "react-router-dom";

const Header = () => {

    const [showClearIcon, setShowClearIcon] = useState("none");

    const [showDropdown, setShowDropdown] = useState(false);

    function toggleDropdown() {
        setShowDropdown(true);
        if (showDropdown === true) { setShowDropdown(false); }
    }

    const commonStyles = {
        bgcolor: 'black',
        border: 1,
        borderRadius: '8px',
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
    };

    const handleClick = (): void => {
        // TODO: Clear the search input
        console.log("clicked the clear icon...");
    };
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
                    <input className="input-search w-44 lg:w-96 py-1 px-3 rounded-md bg-transparent border-[1px] border-gray-600 text-white" type="text" placeholder="Buscar" />

                </div>
                <div className="header__right">
                    <button onClick={toggleDropdown}>
                        <Avatar sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}> <PersonIcon /> </Avatar>
                    </button>
                </div>
            </header>
            <div id="dropdownLogin" className={showDropdown ? "top-11 animate-fade-down" : "-top-full animate-fade-up"}>
                <Dropdown />
            </div>
        </>
    )
}
export default Header;