/* eslint-disable @next/next/no-img-element */
import { Inter } from 'next/font/google'
import React, { useEffect, useRef, useState } from 'react';
import { LibroComponent } from '@/components/LibroComponent';
import { DialogComponentProps } from '@/types/typesDialog';
import { VerPrestamoDialog } from '@/components/VerPrestamoDialog ';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';



const inter = Inter({ subsets: ['latin'] })

export default function Prestamos() {

  const [selectedPrestamo, setSelectedPrestamo] = useState(10);
  const [selectedLibro, setSelectedLibro] = useState(null);

  const [showSolicitar, setShowSolicitar] = useState(false);
  const [showPrestamo, setShowPrestamo] = useState(false);

  const op = useRef<OverlayPanel>(null);
  const isMounted = useRef(false);


  const libros = [
    {
      id: '1000',
      nombre: 'El Principito asdasdasdasdas',
      image: 'https://pupalibreria.com.mx/wp-content/uploads/2023/02/El-principito-PORTADA.jpg'
    }
  ]

  useEffect(() => {
    if (isMounted.current && selectedLibro) {
      op.current?.hide();
    }
  }, [selectedLibro]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isMounted.current = true;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (value: any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const imageBody = (rowData: any) => {
    return <img src={`${rowData.image}`} alt={rowData.image} className="product-image w-5rem" />
  }

  const priceBody = (rowData: any) => {
    return formatCurrency(rowData.price);
  }

  const handlePrestamo = () => {
    setShowPrestamo(true)
  }

  const ObjSolicitarPrestamo: DialogComponentProps = {
    header: "Solicitar Prestamo",
    onVisible: showSolicitar,
    onHide: () => { setShowSolicitar(false) },
  }

  const ObjVerPrestamo: DialogComponentProps = {
    header: `Prestamo de Libro #${selectedPrestamo}`,
    onVisible: showPrestamo,
    onHide: () => { setShowPrestamo(false) },
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
            <LibroComponent
              imgUrl='https://pupalibreria.com.mx/wp-content/uploads/2023/02/El-principito-PORTADA.jpg'
              estado='Entregado'
              onClick={handlePrestamo}
            />
            <LibroComponent
              imgUrl='https://pupalibreria.com.mx/wp-content/uploads/2023/02/El-principito-PORTADA.jpg'
              estado='Entregado'
              onClick={handlePrestamo}
            />
            <LibroComponent
              imgUrl='https://pupalibreria.com.mx/wp-content/uploads/2023/02/El-principito-PORTADA.jpg'
              estado='Entregado'
              onClick={handlePrestamo}
            />
          </div>

          <VerPrestamoDialog propsDialog={ObjVerPrestamo} />


        </div>
      </div>

      <div className="col-12 md:col-6">
        <div className='grid'>
          <div className='col-12'>
            <div className='card'>
              <h1 className='text-800 text-2xl text-left'>Buscador de Libros</h1>

              <div className='flex flex-column bg-cyan-100 w-full m-auto'>
                <div className='bg-gray-200 p-2'>
                  <input id="firstname1" type="text" className="text-base text-color 
            p-2 border-none border-round appearance-none outline-none w-full bg-gray-200 text-center"
                    placeholder='Buscar libro' />
                </div>
                <div className='bg-cyan-400 p-2 text-center cursor-pointer hover:bgc-cyan-800' onClick={(e) => op.current?.toggle(e)}>
                  <p className='font-bold text-white'>
                    Buscar Libro
                  </p>
                </div>
                <OverlayPanel ref={op} showCloseIcon dismissable={false} style={{ width: "80%" }}>
                  <DataTable value={libros} selectionMode="single" paginator rows={5} selection={selectedLibro} onSelectionChange={(e) => setSelectedLibro(e.value)}>
                    <Column field="id" header="ID" sortable style={{ minWidth: '1rem' }} />
                    <Column field="nombre" header="Nombre" sortable style={{ minWidth: '1rem', padding: 0 }} />

                    <Column header="Image" body={imageBody} style={{ minWidth: '1rem' }} />
                  </DataTable>
                </OverlayPanel>
              </div>
            </div>
          </div>

          <div className='col-12'>
            <div className='card'>
              <h1 className='text-800 text-2xl text-left'>Deudas</h1>
              <p className='text-2xl font-bold text-red-500'>Deuda Actual: $500</p>
              <div className='grid'>
                <LibroComponent
                  imgUrl='https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg'
                  estado='Atrasado'
                  onClick={handlePrestamo}
                >
                  <p className='text-2xl mt-3 text-red-300 font-bold'>Deuda: $10</p>
                </LibroComponent>
                <LibroComponent
                  imgUrl='https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg'
                  estado='Atrasado'
                  onClick={handlePrestamo}
                >
                  <p className='text-2xl mt-3 text-red-300 font-bold'>Deuda: $10</p>
                </LibroComponent>
                <LibroComponent
                  imgUrl='https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg'
                  estado='Atrasado'
                  onClick={handlePrestamo}
                >
                  <p className='text-2xl mt-3 text-red-300 font-bold'>Deuda: $10</p>
                </LibroComponent>
                <LibroComponent
                  imgUrl='https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg'
                  estado='Atrasado'
                  onClick={handlePrestamo}
                >
                  <p className='text-2xl mt-3 text-red-300 font-bold'>Deuda: $10</p>
                </LibroComponent>
                <LibroComponent
                  imgUrl='https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg'
                  estado='Atrasado'
                  onClick={handlePrestamo}
                >
                  <p className='text-2xl mt-3 text-red-300 font-bold'>Deuda: $10</p>
                </LibroComponent>
                <LibroComponent
                  imgUrl='https://marketplace.canva.com/EAE8SCCNlvo/1/0/1003w/canva-verde-y-rosa-ciencia-ficci%C3%B3n-portada-de-libro-SSKxUZUBOJg.jpg'
                  estado='Atrasado'
                  onClick={handlePrestamo}
                >
                  <p className='text-2xl mt-3 text-red-300 font-bold'>Deuda: $10</p>
                </LibroComponent>

                
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
