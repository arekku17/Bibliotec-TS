/* eslint-disable @next/next/no-img-element */
import { Inter } from 'next/font/google'
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { LibroComponent } from '@/components/LibroComponent';
import { DialogComponentProps } from '@/types/typesDialog';
import { VerPrestamoDialog } from '@/components/VerPrestamoDialog ';



const inter = Inter({ subsets: ['latin'] })

export default function Prestamos() {
  
  const [selectedPrestamo, setSelectedPrestamo] = useState(10);

  const [showSolicitar, setShowSolicitar] = useState(false);
  const [showPrestamo, setShowPrestamo] = useState(false);

  const handlePrestamo = () => {
    setShowPrestamo(true)
  }

  const ObjSolicitarPrestamo: DialogComponentProps = {
    header: "Solicitar Prestamo",
    onVisible: showSolicitar,
    onHide: () => {setShowSolicitar(false)},
  }

  const ObjVerPrestamo: DialogComponentProps = {
    header: `Prestamo de Libro #${selectedPrestamo}`,
    onVisible: showPrestamo,
    onHide: () => {setShowPrestamo(false)},
  }

  return (
    <div className="grid h-full">
      <div className="col-12 md:col-6">
        <div className='card'>
          <h1 className='text-800 text-2xl text-left'>Libros prestados</h1>

          <div className='grid'>
            <LibroComponent
              imgUrl='https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg'
              estado='Pendiente'
              onClick={handlePrestamo}
            />
            <LibroComponent
              imgUrl='https://pupalibreria.com.mx/wp-content/uploads/2023/02/El-principito-PORTADA.jpg'
              estado='Atrasado'
              onClick={handlePrestamo}
            />
            <LibroComponent
              imgUrl='https://pupalibreria.com.mx/wp-content/uploads/2023/02/El-principito-PORTADA.jpg'
              estado='Entregado'
              onClick={handlePrestamo}
            />
          </div>

          <VerPrestamoDialog propsDialog={ObjVerPrestamo}/>


        </div>
      </div>
    </div>
  )
}
