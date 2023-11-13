import { Inter } from 'next/font/google'
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Image from 'next/image';


const inter = Inter({ subsets: ['latin'] })

export default function Prestamos() {
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const onClick = () => {
    setDisplayBasic2(true)


  }

  const onHide = () => {
    setDisplayBasic2(false)
  }

  const renderFooter = () => {
    return (
      <div>
        <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
        <Button label="Yes" icon="pi pi-check" onClick={() => onHide()} autoFocus />
      </div>
    );
  }

  return (
    <div className="grid h-full">
      <div className="col-12">
        <div className='card'>
          <h1 className='text-800 text-2xl text-left'>Libros prestados</h1>

          <Button label="Long Content" icon="pi pi-external-link" onClick={() => onClick()} />
          <Dialog header="Libro prestamo#" visible={displayBasic2} style={{ width: '80vw', backgroundColor: 'black' }} footer={renderFooter()} onHide={() => onHide()}>
            <div className='grid'>
              <div className='col-3'>
                <h2 className='text-2xl'>Detalles del libro:</h2>
                <p>xd xd xdxd xddxd</p>
                <p>xd xd xdxd xddxd</p>
                <p>xd xd xdxd xddxd</p>
                <p>xd xd xdxd xddxd</p>
                <p>xd xd xdxd xddxd</p>
                <p>xd xd xdxd xddxd</p>
                <p>xd xd xdxd xddxd</p>
                <div className='flex flex-column bg-cyan-100 md:w-5 m-auto'>
            <div className='bg-gray-200 p-2'>
              <input id="firstname1" type="text" className="text-base text-color 
            p-2 border-none border-round appearance-none outline-none w-full bg-gray-200 text-center"
                placeholder='Código del dia' />
            </div>
            <div className='bg-cyan-400 p-2 text-center cursor-pointer hover:bgc-cyan-800'>
              <p className='font-bold text-white'>
                Ingreso a la biblioteca
              </p>

            </div>
          </div>
              </div>
              <div className='col-9'>
                <div className='flex justify-content-end'>
                  <img
                    src="https://edit.org/images/cat/portadas-libros-big-2019101610.jpg"
                    alt="Picture of the author"
                    className='w-25rem'
                  />
                </div>

              </div>
            </div>
          </Dialog>



        </div>
      </div>
    </div>
  )
}
