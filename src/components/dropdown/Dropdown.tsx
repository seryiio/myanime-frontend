import { Link } from 'react-router-dom';
import './Dropdown.scss'

const Dropdown = () => {
    return (
        <>
            <div className='dropdown'>
                <nav className='dropdown__nav'>
                    <ul className='dropdown__nav--ul'>
                        <Link to={'/register'}>Crear Cuenta</Link>
                        <Link to={'/login'}>Acceder</Link>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Dropdown;