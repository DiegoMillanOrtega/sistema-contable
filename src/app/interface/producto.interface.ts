import { Categoria } from "../interface/categoria.interface";
import { Tercero } from "./tercero.interface";
import { FormasDePago } from "./formas-de-pago.interface";

export interface Producto {
    id:               number;
    product:          string;
    codigo:           string;
    marca:            string;
    version:          string;
    category:         Categoria;
    price:            number;
    stock:            number;
    cantMinStock:     number;
    fechaCompra:      Date;
    peso:             number;
    precioMayorista:  number;
    plazoPago:        Date;
    fechaVencimiento: Date;
    imagen:           string;
    bodega:           number;
    precioCosto:      number;
    precioVenta:      number;
    margenGanancia:   number;
    iva:              number;
    metodoPago:       FormasDePago;
    proveedor:        Tercero;
    estado:           string;
    unidadMedida:     string;
    descrip:          string;
    qr:               string;
}