/* eslint-disable @next/next/no-img-element */
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import { DialogComponent } from './DialogComponent'
import { DialogComponentProps } from '@/types/typesDialog'
import { colorEstado } from '@/lib/colorEstado'
import { Button } from 'primereact/button'
import { Estado, LibroItem, PrestamoItem } from '@/types/custom'
import moment from 'moment'

export interface ISolicitarPrestamoProps {
    propsDialog: DialogComponentProps,
    dataPrestamo: PrestamoItem
}

export const VerPrestamoDialog = (props: ISolicitarPrestamoProps) => {

    const {
        dataPrestamo
    } = props;

    const libro = dataPrestamo.libro;

    return (
        <DialogComponent propsDialog={props.propsDialog}>
            <div className='grid'>
                <div className='col-12 md:col-4'>
                    <div className='flex'>
                        <img
                            src={libro?.imagenLibro}
                            alt="Picture of the author"
                            className='w-full'
                        />
                    </div>

                </div>
                <div className='col-12 md:col-8 flex flex-column '>
                    <h2 className='text-2xl font-bold'>Detalles del libro: </h2>
                    <p><span className='font-bold'>Codigo Libro:</span> {libro?.codigo}</p>
                    <div className='grid'>
                        <div className="col-6">
                            <p><span className='font-bold'>Titulo:</span> {libro?.titulo}</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>Autor:</span> {libro?.autor}</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>Volumen:</span> {libro?.volumen}</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>Año de Publicación:</span> {libro?.anioPublicado}</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>Editorial:</span> {libro?.editorial}</p>
                        </div>
                        <div className="col-6">
                            <p><span className='font-bold'>ISBN:</span> {libro?.isbn}</p>
                        </div>
                    </div>

                    <h2 className='text-2xl font-bold mt-4'>Detalles del prestamo:</h2>
                    <p><span className='font-bold'>Cantidad prestada:</span> {dataPrestamo.cantidad}</p>
                    <p><span className='font-bold'>Fecha de Devolución:</span> {moment(dataPrestamo.estimado_regreso).format("DD/MM/YYYY")}</p>
                    <p className='font-bold text-red-500'>Sanción de $5 pesos por cada día después de la fecha de devolución</p>
                    <p><span className='font-bold'>Estado del Prestamo:</span></p>
                    <div className={`${colorEstado(dataPrestamo.estado as Estado)} w-full md:w-fit py-2 px-4`} >
                        <p className='text-white font-bold text-center'>{dataPrestamo.estado}</p>
                    </div>

                   
                </div>

            </div>
        </DialogComponent>
    )
}