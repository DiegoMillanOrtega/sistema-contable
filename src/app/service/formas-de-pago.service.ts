import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormasDePago } from '../interface/formas-de-pago.interface';

@Injectable({
  providedIn: 'root'
})
export class FormasDePagoService {

  private apiUrl: string = 'http://localhost:8080/formaPago';
  private http = inject(HttpClient);

  constructor() { }

  obtenerFormasDePago(): Observable<FormasDePago[]> {
    return this.http.get<FormasDePago[]>(`${this.apiUrl}/getAllFormasDePago`);
  }

  guardarFormaPago(formaPago: FormasDePago): Observable<FormasDePago> {
    return this.http.post<FormasDePago>(`${this.apiUrl}/addFormaPago`, formaPago);
  }

  eliminarFormaPago(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteFormaPago/${id}`);
  }
}
