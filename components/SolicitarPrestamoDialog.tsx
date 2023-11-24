/* eslint-disable @next/next/no-img-element */
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useRef, useState } from 'react'
import { DialogComponent } from './DialogComponent'
import { DialogComponentProps } from '@/types/typesDialog'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';
import { LibroItem } from '@/types/custom'
import moment from 'moment';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postPrestamo } from '@/services/prestamo/api'
import { useSession } from 'next-auth/react'
import { jwtDecode } from "jwt-decode";


export interface ISolicitarPrestamoProps {
    propsDialog: DialogComponentProps,
    dataLibro: LibroItem
}

interface IFormSolicitar {
    cantidad: number;
}


export const SolicitarPrestamoDialog = (props: ISolicitarPrestamoProps) => {

    const [bodySolicitar, setBodySolicitar] = useState(false);
    const [cantidad, setCantidad] = useState(0);
    const [loading, setLoading] = useState(false);

    const toast = useRef(null);

    const { data: session } = useSession()

    const {
        dataLibro
    } = props;

    // yup schema
    const schema = yup.object().shape({
        cantidad: yup.number()
            .required("Ingresa una cantidad")
            .typeError("Tiene que ser un número")
            .max((dataLibro.cantidad as number), "No puede pasar la cantidad disponible")
            .min(1, "Elige minimo un libro"),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormSolicitar>({ resolver: yupResolver(schema), defaultValues: { cantidad: 0 } });


    const showSuccess = (id: string) => {
        (toast.current as any).show({
            severity: 'success',
            summary: 'Prestamo exitoso',
            detail: `Nuevo prestamo con el id #${id}`, life: 2000
        });
    }

    const showError = () => {
        (toast.current as any).show({
            severity: 'error',
            summary: 'Prestamo erroneo',
            detail: 'Hubo un fallo al hacer el prestamo', life: 2000
        });
    }

    const handleSolicitar = (data: IFormSolicitar) => {
        setBodySolicitar(true);
        props.propsDialog.header = "Confirmar Prestamo"
        setCantidad(data.cantidad)
    }

    const registrarPrestamo = async () => {
        setLoading(true);
        //AQUI EL CODIGO PARA PROCESAR EL PRESTAMO
        const decoded = jwtDecode(session?.jwt);
        const idUsuario = (decoded as any)._id;

        await postPrestamo(session?.jwt, { cantidad: cantidad, idLibro: (dataLibro.id as string), idUsuario: idUsuario })
            .then(res => {
                showSuccess(res.data._id);
                props.propsDialog.onHide();
                setLoading(false);
            }).catch(err => {
                showError()
            })


    }

    useEffect(() => {
        setCantidad(0);
        setValue('cantidad', 0);
        setBodySolicitar(false)
    }, [props.propsDialog.onVisible])


    if (bodySolicitar) {
        return (
            <>
                <Toast ref={toast} />
                <DialogComponent propsDialog={props.propsDialog}>
                    <div className='grid'>
                        <div className='col-12 md:col-4'>
                            <div className='flex'>
                                <img
                                    src={dataLibro.imagenLibro}
                                    alt="Picture of the author"
                                    className='w-17rem'
                                />
                            </div>

                        </div>
                        <div className='col-12 md:col-8'>
                            <h2 className='text-2xl font-bold'>Detalles del libro:</h2>
                            <p><span className='font-bold'>Codigo Libro:</span> {dataLibro?.codigo}</p>
                            <div className='grid'>
                                <div className="col-6">
                                    <p><span className='font-bold'>Titulo:</span> {dataLibro?.titulo}</p>
                                </div>
                                <div className="col-6">
                                    <p><span className='font-bold'>Autor:</span> {dataLibro?.autor}</p>
                                </div>
                                <div className="col-6">
                                    <p><span className='font-bold'>Volumen:</span> {dataLibro?.volumen}</p>
                                </div>
                                <div className="col-6">
                                    <p><span className='font-bold'>Año de Publicación:</span> {"" + dataLibro?.anioPublicado}</p>
                                </div>
                                <div className="col-6">
                                    <p><span className='font-bold'>Editorial:</span> {dataLibro?.editorial}</p>
                                </div>
                                <div className="col-6">
                                    <p><span className='font-bold'>ISBN:</span> {dataLibro?.isbn}</p>
                                </div>
                            </div>

                            <h2 className='text-2xl font-bold mt-4'>Detalles del prestamo:</h2>
                            <p><span className='font-bold'>Fecha Estimada de Devolución:</span> {moment().add(3, 'days').format('DD/MM/YYYY')}</p>
                            <p><span className='font-bold'>Cantidad solicitada:</span> {cantidad}</p>
                            <p className='font-bold text-red-500'>Sanción de $5 pesos por cada día después de la fecha de devolución</p>

                            <div className='flex justify-content-end'>
                                <Button label='Confirmar' className='mt-2 w-full md:w-15rem' icon="pi pi-check" loading={loading}
                                    onClick={registrarPrestamo}></Button>
                            </div>

                        </div>

                    </div>
                </DialogComponent>
            </>

        )
    }

    return (
        <>
            <Toast ref={toast} />
            <DialogComponent propsDialog={props.propsDialog}>
                <div className='grid'>
                    <div className='col-12 md:col-4'>
                        <div className='flex'>
                            <img
                                src={dataLibro.imagenLibro}
                                alt="Picture of the author"
                                className='w-17rem'
                            />
                        </div>

                    </div>
                    <div className='col-12 md:col-8'>
                        <h2 className='text-2xl font-bold'>Detalles del libro:</h2>
                        <p><span className='font-bold'>Codigo Libro:</span> {dataLibro?.codigo}</p>
                        <div className='grid'>
                            <div className="col-6">
                                <p><span className='font-bold'>Titulo:</span> {dataLibro?.titulo}</p>
                            </div>
                            <div className="col-6">
                                <p><span className='font-bold'>Autor:</span> {dataLibro?.autor}</p>
                            </div>
                            <div className="col-6">
                                <p><span className='font-bold'>Volumen:</span> {dataLibro?.volumen}</p>
                            </div>
                            <div className="col-6">
                                <p><span className='font-bold'>Año de Publicación:</span> {"" + dataLibro?.anioPublicado}</p>
                            </div>
                            <div className="col-6">
                                <p><span className='font-bold'>Editorial:</span> {dataLibro?.editorial}</p>
                            </div>
                            <div className="col-6">
                                <p><span className='font-bold'>ISBN:</span> {dataLibro?.isbn}</p>
                            </div>
                        </div>

                        <h2 className='text-2xl font-bold mt-4'>Detalles del prestamo:</h2>
                        <p><span className='font-bold'>Fecha Estimada de Devolución:</span> {moment().add(3, 'days').format('DD/MM/YYYY')}</p>
                        <p><span className='font-bold'>Libros disponibles:</span> {dataLibro.cantidad}</p>

                        <div className='grid'>
                            <div className='flex flex-column col-12 md:col-6 '>
                                <div className='bg-gray-200 p-2'>
                                    <input {...register("cantidad")} className="text-base text-color 
                                            p-2 border-none border-round appearance-none outline-none w-full bg-gray-200 text-center"
                                        placeholder='Cantidad' type='number'

                                    />
                                </div>
                                <div className='bg-cyan-400 p-2 text-center cursor-pointer hover:bgc-cyan-800'
                                    onClick={handleSubmit(handleSolicitar)}>
                                    <p className='font-bold text-white'>
                                        Solicitar prestamo
                                    </p>

                                </div>
                                {errors.cantidad && <p className='text-red-500 mt-2 font-bold'>{errors.cantidad.message}</p>}
                            </div>
                            <div className='col-12 md:col-6'>
                                <div className='flex md:ml-3'>
                                    <p className='w-full md:w-8 text-red-500'>
                                        Sanción de $5 pesos
                                        por cada día después
                                        de la fecha de devolución
                                    </p>
                                </div>

                            </div>
                        </div>


                    </div>

                </div>
            </DialogComponent>
        </>

    )
}