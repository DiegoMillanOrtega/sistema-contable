import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interface/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string = 'http://localhost:8080/category';
  private http = inject(HttpClient);
  
  constructor() { }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/getCategoryList`);
  }
  
  eliminarCategoria(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/deleteCategory/${id}`, { responseType: 'text' });
  }

  guardarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/saveCategory`, categoria );
  }
}
