import { Link } from 'react-router-dom';

import './Sidebar.scss'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faEarthAmericas, faHouse, faLayerGroup, faLock, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Userdata } from '../../interfaces/Userdata';

export const Sidebar = () => {
    const authUser = useAuthUser<Userdata>();
    const role = authUser ? authUser.role : '';

    return (
        <>
            <div className="aside__content-1">
                <div className="aside__content-1--home">
                    <Link className='link' to={'/'}>
                        <FontAwesomeIcon icon={faHouse} /> <p className='text-list'>Inicio</p></Link>
                </div>
            </div>
            <div className="aside__content-2">
                <div className="aside__content-2--top">
                    <div className="list">
                        <Link className='link' to={'/'}>
                            <FontAwesomeIcon icon={faCompass} /> <p className='text-list'>Explorar</p></Link>
                    </div>
                    <div className="list">
                        <Link className='link' to={'/mylist'}>
                            <FontAwesomeIcon icon={faLayerGroup} /> <p className='text-list'>Mi Lista</p></Link>
                    </div>
                    <div className="list">
                        <Link className='link' to={'/'}>
                            <FontAwesomeIcon icon={faNewspaper} /> <p className='text-list'>Noticias</p></Link>
                    </div>
                    <div className="list">
                        <Link className='link' to={'/'}><FontAwesomeIcon icon={faEarthAmericas} /> <p className='text-list'>Comunidad</p></Link>
                    </div>
                    {role.includes('ADMIN') && (
                        <div className="list">
                            <Link className='link' to={'/crud'}>
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