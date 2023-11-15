import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="grid h-full">
      <div className="col-12">
        <div className='card'>
          <h1 className='text-800 text-2xl text-center'>Entrada a la biblioteca</h1>
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
          <p className='text-center mt-5 font-bold text-xl'>Por favor si ingresas,
            confirma tu salida también de
            la biblioteca</p>
        </div>
      </div>

      <div className="col-12 lg:col-6">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Estado en la Biblioteca</span>
              <div className="text-900 font-bold text-xl text-red-500">SIN INGRESAR</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-red-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="pi pi-book text-red-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 lg:col-6">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Tiempo adentro</span>
              <div className="text-900 font-bold text-xl text-red-500">0 MIN</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-red-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="pi pi-clock text-red-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
