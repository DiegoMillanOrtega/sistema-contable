import { Pedido } from "./pedido.interface";

export interface FormasDePago {
    formaPagoID: number;
    nombre:      string;
    descrip:     string;
    pedidos:     Pedido[];
}