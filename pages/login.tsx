/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Page } from '../types/types';
import Image from 'next/image';
import portada from '../public/images/portada.jpg'
import logo from '../public/layout/images/logo-bibliotec.png'

import styles from '../styles/Login.module.scss';

import { useSession, signIn, signOut } from "next-auth/react"

const LoginPage: Page = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();

    const { data: session } = useSession()

    const handleLoginGoogle = () => {
        signIn("google")
    }


    if (session) {
        window.location.replace('/');
    }

    return (
        <div className='h-screen p-4 md:py-5 m-auto w-full md:w-9'>

            <div className='grid h-full bg-white shadow-4'>
                <div className='hidden lg:inline col-0 md:col-5 p-0'>
                    <Image
                        src={portada}
                        alt="Portada"
                        className='w-full h-full bg-cover m-0'
                        style={{ objectFit: "cover", margin: 0 }}
                    />
                </div>
                <div className="col-12 lg:col-7">
                    <div className='p-4 lg:p-7'>
                        <Image
                            src={logo}
                            alt="Logo Bibliotec"
                            className='w-10rem lg:w-15rem h-auto'
                        />
                        <p className='text-5xl font-bold mt-3'>¡Bienvenido!</p>
                        <div className="linea-divisora w-full lg:w-6"></div>
                        <div className='flex flex-column gap-3 align-items-center m-auto md:m-0 w-fit md:flex-row '>
                            <i className='pi pi-user text-7xl md:text-5xl'></i>
                            <p className='text-3xl md:text-5xl'>Inicio de Sesión</p>
                        </div>

                        <div className='w-full md:w-9'>
                            <div className={styles.google_btn} onClick={handleLoginGoogle}>
                                <div className={styles.google_icon_wrapper}>
                                    <img className={styles.google_icon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                                </div>
                                <p className={styles.btn_text}><b>Iniciar sesión con cuenta institucional</b></p>
                            </div>
                        </div>


                        <p className='mt-5 text-center text-blue-800 md:text-left md:text-xl '>Debe de ser una cuenta institucional</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
        </React.Fragment>
    );
};
export default LoginPage;
