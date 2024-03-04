import './Login.scss'
import Logo from '../../assets/images/Branding/Logo.svg';
import { Link } from 'react-router-dom';
import { FormControl, FormLabel, Input, Stack, TextField, createTheme } from '@mui/material';

const Login = () => {
    const labelStyles = {
        color: '#FFFFFF',
    };

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
                    <form action="" className='form flex flex-col bg-[#141418] md:w-96 h-max px-8 py-8'>
                        <Stack className='flex flex-col gap-10'>
                            <FormControl className="modal__form--title flex-1">
                                <TextField sx={{ borderBottom: 2, borderColor: 'white' }} color="secondary" label="Correo Electrónico" autoFocus required id="outlined-basic" InputLabelProps={{ style: labelStyles }} variant="outlined" />
                            </FormControl>
                            <FormControl className="modal__form--title flex-1">
                                <TextField sx={{ borderBottom: 2, borderColor: 'white' }} color="primary" label="Contraseña" autoFocus required id="outlined-basic" InputLabelProps={{ style: labelStyles }} variant="outlined" />
                            </FormControl>
                            <button>
                                <Link to={`/`} className='px-4 py-2 w-max bg-[#46b3e6]'>INGRESAR</Link>
                            </button>
                        </Stack>
                    </form>
                    <p>No tienes una cuenta? <span className='text-[#46b3e6] font-bold'> <Link to={'/register'}>CREAR CUENTA</Link></span>
                    </p>
                </div>
            </section>
        </>
    )
}
export default Login;