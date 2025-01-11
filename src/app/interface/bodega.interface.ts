
import { Terceros } from "./tercero.interface";
import { TipoBodega } from "./tipo-bodega.interface";

export interface Bodega {
    bodId: number;
    nombre: string;
    descripcion: string;
    ubicacion: string;
    responsable: Terceros;
    capacidadMaxima: Number;
    estado: string;
    fechaCreacion: string;
    fechaActualizacion: string;
    telefono: string;
    emailContacto: string;
    tipoBodega: TipoBodega;

}