export interface Pedido {
    id:             number;
    price?:         number;
    address:        Address;
    pedidoDetalles: PedidoDetalle[];
}

export enum Address {
    Cll16A6A46 = "CLL 16A #6A - 46",
}

export interface PedidoDetalle {
    id:         number;
    cantidades: number | null;
}