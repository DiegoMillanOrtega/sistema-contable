import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bodega } from '../interface/bodega.interface';
import { TipoBodega } from '../interface/tipo-bodega.interface';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  private apiUrl: string = 'http://localhost:8080/bodega';
  private http = inject(HttpClient);

  constructor() { }

  obtenerBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(`${this.apiUrl}/getBodegas`);
  }

  eliminarBodega(id: number): Observable<HttpStatusCode> {
    return this.http.delete<HttpStatusCode>(`${this.apiUrl}/eliminarBodega/${id}`);
  }

  guardarBodega(bodega: Bodega): Observable<Bodega> {
    return this.http.post<Bodega>(`${this.apiUrl}/guardarBodega`, bodega);
  }

  obtenerTipoBodegas(): Observable<TipoBodega[]> {
    return this.http.get<TipoBodega[]>(`${this.apiUrl}/getTipoBodegas`);
  }

  eliminarTipoBodega(id: number): Observable<HttpStatusCode> {
    return this.http.delete<HttpStatusCode>(`${this.apiUrl}/eliminarTipoBodega/${id}`);
  }

  guardarTipoBodega(tipoBodega: TipoBodega): Observable<TipoBodega> {
    return this.http.post<TipoBodega>(`${this.apiUrl}/guardarTipoBodega`, tipoBodega);
  }

}
