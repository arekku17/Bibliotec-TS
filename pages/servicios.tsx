import { Inter } from 'next/font/google'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
        

const inter = Inter({ subsets: ['latin'] })

export default function Servicios() {
  return (
    
    <div className="grid h-full">
      <div className="col-12 md:col-6">
        <div className='card'>
          <h1 className='text-800 text-2xl text-left'>Servicios de la biblioteca</h1>

          <div className="col-12 md:col-6">
          <i className="pi pi-desktop" style={{ fontSize: '10rem' }}></i>
        
          <div className="col-12 md:col-6">
          <Button label="Solicitar PC de consulta" icon="pi pi-external-link" onClick={() => setVisible(true)} />
          <Dialog header="Header" visible={()} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <p className="m-0">
        
          </p>
          </Dialog>
          </div>

            <div className="col-12 md:col-6">
            <i className="pi pi-table" style={{ fontSize: '10rem' }}></i>
            <Button label="Solicitar juego de mesa" />
            </div>

        </div>
      </div>
    </div>
    </div>
  )
}
