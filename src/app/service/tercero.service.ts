import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Terceros } from '../interface/tercero.interface';


@Injectable({
  providedIn: 'root'
})
export class TerceroService {

  private apiUrl: string = 'http://localhost:8080/tercero';
  private http = inject(HttpClient);

  obtenerClientes(): Observable<Terceros[]> {
    return this.http.get<Terceros[]>(`${this.apiUrl}/getAllTercero`);
  }

  guardarCliente(cliente: Terceros): Observable<Terceros> {
    return this.http.post<Terceros>(`${this.apiUrl}/saveTercero`, cliente);
  }

  eliminarCliente(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteTercero/${id}`);
  }
}
