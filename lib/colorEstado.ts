import { Estado } from "@/types/custom"

export const colorEstado = (estado: Estado) => {
    switch(estado) { 
      case 'Pendiente': { 
         return 'bg-cyan-600'
      } 
      case 'Atrasado': { 
         return 'bg-red-600'
      } 
      case 'Entregado': { 
        return 'bg-green-600'
      } 
   } 
  }