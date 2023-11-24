import { Inter } from 'next/font/google'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const inter = Inter({ subsets: ['latin'] })

export default function Registro() {
  return (
    <div>
   <h1>Historial de registros de la biblioteca</h1>
      

      <DataTable value={
        []
      } paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem', backgroundColor: "black" }}>
        <Column field="name" header="Fecha" style={{ width: '25%' }}></Column>
        <Column field="country.name" header="Hora de entrada" style={{ width: '25%' }}></Column>
        <Column field="company" header="Hora de salida" style={{ width: '25%' }}></Column>
        <Column field="representative.name" header="Nombre" style={{ width: '25%' }}></Column>
      </DataTable>
      
    </div>
   
         

      
  )
}
