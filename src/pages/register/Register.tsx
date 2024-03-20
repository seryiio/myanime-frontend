import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Branding/Logo.svg';
import './Register.scss';
import { Button, Input } from '@nextui-org/react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatpasswordError, setRepeatPasswordError] = useState('');

    const validateEmail = (value: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!validateEmail(email)) {
            setEmailError('Por favor, introduce un correo electrónico válido.');
            return;
        }
        
        if (password !== repeatPassword) {
            setPasswordError('Las contraseñas deben ser iguales');
            setRepeatPasswordError('Las contraseñas deben ser iguales');
            return;
        }
    }

    return (
        <>
            <section className='content_register'>
                <header className='flex justify-center items-center p-4 w-full h-max bg-[#22242b]'>
                    <Link to={'/'} className='flex justify-center items-center gap-2'>
                        <picture>
                            <img src={Logo} width={50} height={50} alt="Logo My Anime" />
                        </picture>
                        <h1>MyAnimes</h1></Link>
                </header>
                <div className='flex flex-col justify-center items-center w-full gap-2 p-4'>
                    <div className="title">
                        <h1>CREAR CUENTA</h1>
                    </div>
                    <form onSubmit={handleSubmit} className='form flex flex-col bg-[#141418] md:w-96 h-max px-8 py-8 gap-8'>
                        <div className='flex flex-col gap-4'>
                            <Input
                                value={email}
                                type="email"
                                label="Email"
                                variant={'underlined'}
                                isInvalid={!!emailError}
                                color={!!emailError ? "danger" : "default"}
                                errorMessage={emailError}
                                onValueChange={setEmail}
                                className="max-w-xs dark"
                            />
                            <Input
                                type="text"
                                className='dark'
                                variant={'underlined'}
                                label="Nombre de Usuario"
                            />
                            <Input
                                value={password}
                                type="password"
                                className='dark'
                                variant={'underlined'}
                                label="Contraseña"
                                color={!!passwordError ? "danger" : "default"}
                                errorMessage={passwordError}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                value={repeatPassword}
                                type="password"
                                className='dark'
                                variant={'underlined'}
                                label="Repetir Contraseña"
                                color={!!repeatpasswordError ? "danger" : "default"}
                                errorMessage={repeatpasswordError}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <Link to={`/`} className='text-white hover:text-[#46b3e6]'>¿Has olvidado tu contraseña?</Link>
                        </div>
                        <Button type='submit' size="md">
                            Ingresar
                        </Button>
                    </form>
                    <p>¿Ya tienes una cuenta? <span className='text-[#46b3e6] font-bold'> <Link to={'/login'}>ACCEDER</Link></span>
                    </p>
                </div>
            </section>
            <footer className='flex flex-wrap w-full justify-center md:justify-between  items-center mt-8 py-4 px-8'>
                <div><p>© Todos los derechos reservados</p></div>
                <div className='developerName text-white'><p>WaynasCorp ♣</p></div>
            </footer>
        </>
    )
}

export default Register;
