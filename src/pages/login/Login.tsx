import './Login.scss'
import { jwtDecode } from "jwt-decode";
import Logo from '../../assets/images/Branding/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { useFormik } from "formik";
import axios, { AxiosError } from 'axios';
import { URL_LOGIN } from '../../services/AuthenticationService'; import useSignIn from 'react-auth-kit/hooks/useSignIn';

const Login = () => {
    const [error, setError] = useState("");
    const signIn = useSignIn();
    const navigate = useNavigate();
    const onSubmit = async (values: any) => {
        setError("");
        try {
            const response = await axios.post(URL_LOGIN, values);
            const { tokenSession } = response.data;

            const decodedToken: any = jwtDecode(tokenSession);

            signIn({
                auth: {
                    token: tokenSession,
                    type: "Bearer",
                },
                userState: {
                    username: values.username,
                    role: decodedToken.role,
                    uid: decodedToken.id,
                }
            });

            navigate("/")

        } catch (error) {
            if (error && error instanceof AxiosError)
                setError(
                    "El usuario o contraseña son incorrectos"
                    // error.response?.data?.message || error.message
                );
            else if (error && error instanceof Error) setError(error.message)
            console.log("Error: ", error);
        }
    }
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit,
    });
    return (
        <>
            <section className='content_login'>
                <header className='flex justify-center items-center p-4 w-full h-max bg-[#22242b]'>
                    <Link reloadDocument to={'/'} className='flex justify-center items-center gap-2'>
                        <picture>
                            <img src={Logo} width={50} height={50} alt="Logo My Anime" />
                        </picture>
                        <h1>MyAnimes</h1></Link>
                </header>
                <div className='flex flex-col justify-center items-center w-full h-full gap-2 p-4'>
                    <div className="title">
                        <h1>Iniciar Sesion</h1>
                    </div>
                    <form action="POST" onSubmit={formik.handleSubmit} className='form flex flex-col bg-[#141418] md:w-96 h-max px-8 py-8 gap-8'>
                        <label className='text-red-400' >{error}</label>
                        <div className='flex flex-col gap-4'>
                            <Input
                                id='username'
                                className='dark'
                                variant={'underlined'}
                                label="Nombre de Usuario"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                            <Input
                                id='password'
                                type="password"
                                className='dark'
                                variant={'underlined'} label="Contraseña"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <Link reloadDocument to={`/`} className='text-white hover:text-[#46b3e6]' >¿Has olvidado tu contraseña?</Link>
                        </div>
                        <Button type='submit' size="md" isLoading={formik.isSubmitting}>
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