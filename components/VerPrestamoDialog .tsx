/* eslint-disable @next/next/no-img-element */
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import { DialogComponent } from './DialogComponent'
import { DialogComponentProps } from '@/types/typesDialog'
import { colorEstado } from '@/lib/colorEstado'
import { Button } from 'primereact/button'

export interface ISolicitarPrestamoProps {
    propsDialog: DialogComponentProps
}

export const VerPrestamoDialog = (props: ISolicitarPrestamoProps) => {
    return (
        <DialogComponent propsDialog={props.propsDialog}>
            <div className='grid'>
                <div className='col-12 md:col-4'>
                    <div className='flex'>
                        <img
                            src="https://edit.org/images/cat/portadas-libros-big-2019101610.jpg"
                            alt="Picture of the author"
                            className='w-full'
                        />
                    </div>

                </div>
                <div className='col-12 md:col-8 flex flex-column '>
                    <h2 className='text-2xl font-bold'>Detalles del libro:</h2>
                    <p><span className='font-bold'>Codigo Libro:</span> 23243</p>
                    <div className='grid'>
                        <div className="col-6">
                            <p><span className='font-bold'>Titulo:</span> Romeo y Julieta</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>Autor:</span> William Shakespeare</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>Volumen:</span> 2</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>Año de Publicación:</span> 2020</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>Editorial:</span> Galiani, Verlag</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>ISBN:</span> 9783869711423</p>
                        </div>
                    </div>

                    <h2 className='text-2xl font-bold mt-4'>Detalles del prestamo:</h2>
                    <p><span className='font-bold'>Cantidad prestada:</span> 2</p>
                    <p><span className='font-bold'>Fecha de Devolución:</span> 15/11/2023</p>
                    <p className='font-bold text-red-500'>Sanción de $5 pesos por cada día después de la fecha de devolución</p>
                    <p><span className='font-bold'>Estado del Prestamo:</span></p>
                    <div className={`${colorEstado("Pendiente")} w-full md:w-fit py-2 px-4`} >
                        <p className='text-white font-bold text-center'>Pendiente { }</p>
                    </div>

                    <Button label='Solicitar renovación' className='mt-5 w-full md:w-15rem' icon="pi pi-check"></Button>

                </div>

            </div>
        </DialogComponent>
    )
}