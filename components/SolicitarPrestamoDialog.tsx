/* eslint-disable @next/next/no-img-element */
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import { DialogComponent } from './DialogComponent'
import { DialogComponentProps } from '@/types/typesDialog'

export interface ISolicitarPrestamoProps {
    propsDialog: DialogComponentProps
}

export const SolicitarPrestamoDialog = (props: ISolicitarPrestamoProps) => {
    return (
        <DialogComponent propsDialog={props.propsDialog}>
            <div className='grid'>
                <div className='col-12 md:col-4'>
                    <div className='flex'>
                        <img
                            src="https://edit.org/images/cat/portadas-libros-big-2019101610.jpg"
                            alt="Picture of the author"
                            className='w-17rem'
                        />
                    </div>

                </div>
                <div className='col-12 md:col-8'>
                    <h2 className='text-2xl'>Detalles del libro:</h2>
                    <p>Codigo Libro: 23243</p>
                    <p>Titulo: Romeo y Julieta</p>
                    <p>Autor: William Shakespeare</p>
                    <p>Volumen: 2</p>
                    <p>Año de Publicación: 2020</p>
                    <p>Editorial: Galiani, Verlag</p>
                    <p>ISBN: 9783869711423</p>
                    <p>Cantidad prestada: 2</p>


                    <div className='flex flex-column bg-cyan-100 w-10 '>
                        <div className='bg-gray-200 p-2'>
                            <input id="firstname1" type="text" className="text-base text-color 
            p-2 border-none border-round appearance-none outline-none w-full bg-gray-200 text-center"
                                placeholder='Cantidad' />
                        </div>
                        <div className='bg-cyan-400 p-2 text-center cursor-pointer hover:bgc-cyan-800'>
                            <p className='font-bold text-white'>
                                Solicitar prestamo
                            </p>

                        </div>
                    </div>

                </div>

            </div>
        </DialogComponent>
    )
}