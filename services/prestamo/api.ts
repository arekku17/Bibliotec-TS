import axios, { AxiosResponse } from 'axios';

export type ReqPostPrestamo = {
    idLibro: string,
    idUsuario: string,
    cantidad: number
}

export const postPrestamo = async (token: string, data: ReqPostPrestamo) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/prestamo/agregar`, data, {
        headers: {
            "x-access-token": token
        }
    })
}

export const getPrestamosById = async (token: string, id: string) => {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/prestamo/usuario/${id}`, {
        headers: {
            "x-access-token": token
        }
    })
}