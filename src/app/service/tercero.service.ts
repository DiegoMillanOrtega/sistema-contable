import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tercero } from '../interface/tercero.interface';

@Injectable({
  providedIn: 'root'
})
export class TerceroService {

  private apiUrl: string = 'http://localhost:8080/tercero';
  private http = inject(HttpClient);

  obtenerClientes(): Observable<Tercero[]> {
    return this.http.get<Tercero[]>(`${this.apiUrl}/getAllTercero`);
  }

  guardarCliente(cliente: Tercero): Observable<Tercero> {
    return this.http.post<Tercero>(`${this.apiUrl}/saveTercero`, cliente);
  }

  eliminarCliente(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteTercero/${id}`);
  }
}
