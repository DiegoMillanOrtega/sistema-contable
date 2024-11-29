import { Injectable } from '@angular/core';
import { Producto } from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class DatosFService {
  producto!: Producto;

  constructor() { }

  setProducto(producto: Producto) {
    this.producto = producto;
  }

  getProducto(): Producto {
    return this.producto;
  }
}
