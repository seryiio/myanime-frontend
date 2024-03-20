import './BottomNavBar.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faHouse, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BottomNavBar = () => {
    return (
        <>
            <div className="flex justify-between items-center px-8 py-4 gap-8 text-white z-[999]">
                <Link className='flex flex-col justify-center items-center' to={'/'}>
                    <FontAwesomeIcon icon={faHouse} />
                    <p className='text-list'>Inicio</p>
                </Link>
                <Link className='flex flex-col justify-center items-center' to={'/'}>
                    <FontAwesomeIcon icon={faCompass} />
                    <p className='text-list'>Explorar</p>
                </Link>
                <Link className='flex flex-col justify-center items-center' to={'/'}>
                    <FontAwesomeIcon icon={faLayerGroup} />
                    <p className='text-list'>Lista</p>
                </Link>
            </div>
        </>
    )
}
export default BottomNavBar;