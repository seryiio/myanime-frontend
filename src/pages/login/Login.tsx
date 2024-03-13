import './Login.scss'
import Logo from '../../assets/images/Branding/Logo.svg';
import { Link } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';

const Login = () => {
    return (
        <>
            <section className='content'>
                <header className='flex justify-center items-center p-4 w-full h-max bg-[#22242b]'>
                    <Link to={'/'} className='flex justify-center items-center gap-2'>
                        <picture>
                            <img src={Logo} width={50} height={50} alt="Logo My Anime" />
                        </picture>
                        <h1>MyAnimes</h1></Link>
                </header>
                <div className='flex flex-col justify-center items-center w-full h-full gap-2 p-4'>
                    <div className="title">
                        <h1>Iniciar Sesion</h1>
                    </div>
                    <form action="" className='form flex flex-col bg-[#141418] md:w-96 h-max px-8 py-8 gap-8'>
                        <div className='flex flex-col gap-4'>
                            <Input type="email" className='dark' variant={'underlined'} label="Correo electrónico" />
                            <Input type="password" className='dark' variant={'underlined'} label="Contraseña" />
                            <Link to={`/`} className='text-white hover:text-[#46b3e6]'>¿Has olvidado tu contraseña?</Link>
                        </div>
                        <Button size="md">
                            Ingresar
                        </Button>
                    </form>
                    <p>No tienes una cuenta? <span className='text-[#46b3e6] font-bold'> <Link to={'/register'}>CREAR CUENTA</Link></span>
                    </p>
                </div>
                <footer className='flex flex-wrap w-full justify-center md:justify-between  items-center mt-8 py-4 px-8'>
                    <div><p>© Todos los derechos reservados</p></div>
                    <div className='developerName text-white'><p>WaynasCorp ♣</p></div>
                </footer>
            </section>
        </>
    )
}
export default Login;