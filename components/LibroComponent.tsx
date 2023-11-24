import { colorEstado } from '@/lib/colorEstado'
import moment from 'moment'
import Image from 'next/image'
import React, { ReactNode } from 'react'

export const LibroComponent = (props:
  { imgUrl: string,
    estado: 'Pendiente' | 'Atrasado' | 'Entregado',
    onClick: () => void,
    fechaEntrega: Date
    children?: ReactNode }
) => {


  return (
    <section className='flex flex-column col-6 xl:col-3'>


      <div className='relative containerOverlay' onClick={props.onClick}>

        <div className='w-full
         h-12rem md:h-13rem xl:h-18rem absolute colorTransparente 
         flex flex-column justify-content-center align-items-center
         overlay'>
          <p className='text-white text-2xl font-bold'>Entrega</p>
          <p className='text-yellow-300'>{moment(props.fechaEntrega).format("DD/MM/YYYY")}</p>
        </div>
        
        <Image
          src={props.imgUrl}
          alt='Principito'
          width={500}
          height={500}
          className='w-full h-12rem md:h-13rem xl:h-18rem mb-0 imagen'
          style={{ objectFit: "cover", margin: 0 }}
        />
      </div>
      <div className={`w-full mt-0 h-2rem flex justify-content-center align-items-center ${colorEstado(props.estado)}`}>
        <div className='text-white text-center font-bold'>{props.estado}</div>
      </div>
      {props.children}
    </section>
  )
}