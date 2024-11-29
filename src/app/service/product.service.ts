import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl: string = 'http://localhost:8080/inventory';
  private http = inject(HttpClient);
  private selectedProducts: Producto[] = [];

  getProductoList(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/getInventory`)
  }

  getProductId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/getProductById/${id}`, { responseType: 'json' });
  }
  
  getOutOfStockProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/getOutOfStockProducts`)
  }

  searchProductByName(product: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?product=${product}`);
  }

  searchProductByNameOutOfStock(product: string): Observable<Producto[]> {
    console.log(`${this.apiUrl}/searchOutOfStock/${product}`);
    return this.http.get<Producto[]>(`${this.apiUrl}/searchOutOfStock/${product}`);
  }

  searchByCategory(category: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/searchCategory/${category}`);
  }

  searchByCategoryOutOfStock(category: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/getByProductsByCategoryOutOfStock/${category}`);
  }

  saveProduct(product: Producto): Observable<any> {
    return this.http.post(`${this.apiUrl}/postProduct`, product, {responseType: 'text'})
  }

  deleteProductId(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteProduct/${id}`, {responseType: 'text'})
  }

  getSelectedProducts() {
    return this.selectedProducts;
  }

  setSelectedProducts(selectedProducts: Producto[]) {
    if (selectedProducts.length > 0) {
      this.selectedProducts = selectedProducts;
    }
  }
}
