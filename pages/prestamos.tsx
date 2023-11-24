/* eslint-disable @next/next/no-img-element */
import { Inter } from 'next/font/google'
import React, { useEffect, useRef, useState } from 'react';
import { LibroComponent } from '@/components/LibroComponent';
import { DialogComponentProps } from '@/types/typesDialog';
import { VerPrestamoDialog } from '@/components/VerPrestamoDialog ';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Column } from 'primereact/column';
import { DataTable, DataTableSelection, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { LibroItem, PrestamoItem } from '@/types/custom';
import { SolicitarPrestamoDialog } from '@/components/SolicitarPrestamoDialog';
import useSWR from "swr"
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getPrestamos, getPrestamosById } from '@/services/prestamo/api';
import { jwtDecode } from "jwt-decode";

const fetcher = (url: String, token: String) => fetch(process.env.NEXT_PUBLIC_API_URL + url,
  { headers: { "x-access-token": token } }).then((res) => res.json());



export const getServerSideProps = (async (context) => {
  const session = await getSession(context)
  const idUsuario = jwtDecode(session.jwt)._id
  const res = await getPrestamosById(session.jwt, idUsuario)
  return { props: { prestamos: res.data } }
}) satisfies GetServerSideProps<{
  prestamos: Array<PrestamoItem>
}>


export default function Prestamos({
  prestamos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [selectedPrestamo, setSelectedPrestamo] = useState<PrestamoItem>({});
  const [selectedLibro, setSelectedLibro] = useState<LibroItem>({});


  const [showSolicitar, setShowSolicitar] = useState(false);
  const [showPrestamo, setShowPrestamo] = useState(false);

  const [filtro, setFiltro] = useState('');


  const op = useRef<OverlayPanel>(null);
  const isMounted = useRef(false);

  const { data: session } = useSession()

  console.log(prestamos)

  const { data, error, isLoading } = useSWR(
    [`/api/v1/libro/filtro?filtro=${filtro}`, session?.jwt],
    ([url, tokenCookie]) => fetcher(url, tokenCookie));


  console.log(session)

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
    return <img src={`${rowData.imagenLibro}`} alt={rowData.image} className="product-image w-5rem" />
  }

  const priceBody = (rowData: any) => {
    return formatCurrency(rowData.price);
  }

  const handleSolicitarPrestamo = () => {
    setShowSolicitar(true)
  }

  const handlePrestamo = (prestamo: PrestamoItem) => {
    setSelectedPrestamo(prestamo)
    setShowPrestamo(true)
  }

  const onLibroSelect = (libro: LibroItem) => {
    setSelectedLibro(libro);
    handleSolicitarPrestamo();
  };


  const ObjSolicitarPrestamo: DialogComponentProps = {
    header: "Solicitar Prestamo",
    onVisible: showSolicitar,
    onHide: () => { setShowSolicitar(false) },
  }

  const ObjVerPrestamo: DialogComponentProps = {
    header: `Prestamo de Libro #${selectedPrestamo.id }`,
    onVisible: showPrestamo,
    onHide: () => { setShowPrestamo(false); setSelectedPrestamo({}) },
  }

  useEffect(() => {
    if (!showSolicitar) {
      setSelectedLibro({});
    }
  }, [showSolicitar])


  return (
    <div className="grid h-full">
      <div className="col-12 md:col-6">
        <div className='card'>
          <h1 className='text-800 text-2xl text-left'>Libros prestados</h1>

          <div className='grid'>
            {prestamos.map(item => <LibroComponent
              imgUrl={item.libro.imagenLibro}
              estado={item.estado}
              fechaEntrega={item.estimado_regreso}
              onClick={() => handlePrestamo(item)}
              key={item._id}
            />)}
          </div>

          <VerPrestamoDialog propsDialog={ObjVerPrestamo} dataPrestamo={selectedPrestamo}/>
          <SolicitarPrestamoDialog propsDialog={ObjSolicitarPrestamo} dataLibro={selectedLibro} />


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
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                    placeholder='Buscar libro' />
                </div>
                <div className='bg-cyan-400 p-2 text-center cursor-pointer hover:bgc-cyan-800' onClick={(e) => op.current?.toggle(e)}>
                  <p className='font-bold text-white'>
                    Buscar Libro
                  </p>
                </div>
                <OverlayPanel ref={op} showCloseIcon dismissable={false} style={{ width: "80%" }}>
                  <DataTable value={data} selectionMode="single" paginator rows={3}
                    selection={selectedLibro}
                    onSelectionChange={(e) => onLibroSelect(e.value)}>
                    <Column field="id" header="ID" sortable style={{ minWidth: '1rem' }} />
                    <Column field="titulo" header="Nombre" sortable style={{ minWidth: '1rem', padding: 0 }} />

                    <Column header="Portada" body={imageBody} style={{ minWidth: '1rem' }} />
                  </DataTable>
                </OverlayPanel>
              </div>
            </div>
          </div>

          <div className='col-12'>
            <div className='card'>
              <h1 className='text-800 text-2xl text-left'>Deudas</h1>
              <p className='text-2xl font-bold text-red-500'>Deuda Actual: $0</p>
              <div className='grid'>
                


              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
