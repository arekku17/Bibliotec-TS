type Estado = 'Pendiente' | 'Atrasado' | 'Entregado';

type LibroItem = {
   id?: string;
   codigo?: string;
   titulo?: date;
   deConsulta?: boolean;
   cantidad?: number;
   volumen?: number;
   anioPublicado?: number;
   imagenLibro?: string;
   isbn?: string;
   editorial?: string;
   autor?: string;
   categoria?: string;
   tipo?: string;
};

type PrestamoItem = {
   id?: string,
   fecha_inicio?: Date,
   estimado_regreso?: Date,
   fecha_regreso?: Date,
   estado?: string,
   cantidad?: number,
   libro?: LibroItem,
   usuario?: string
}

export type {
   Estado,
   LibroItem,
   PrestamoItem
}

