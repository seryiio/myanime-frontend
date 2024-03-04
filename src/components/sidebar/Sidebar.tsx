import { Link } from 'react-router-dom';

import './Sidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight, faCompass, faEarthAmericas, faHouse, faLayerGroup, faMagnifyingGlass, faNewspaper, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const Sidebar = () => {

    const [openSidebar, setOpenSidebar] = useState(false);

    function toggleSidebar() {
        setOpenSidebar(true);
        if (openSidebar === true) { setOpenSidebar(false); }
    }

    return (
        <>
            <aside id='aside' className={openSidebar ? 'aside close' : 'aside'}>
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
                            <FontAwesomeIcon icon={faHouse} /> <p className='text-list'>Home</p></Link>
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
                </div>
            </aside>
        </>
    )
}

export default Sidebar;