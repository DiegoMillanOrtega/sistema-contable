import { Injectable } from '@angular/core';
import { ServiceBaseService } from './service-base.service';
import { Observable } from 'rxjs';
import { Bodega } from '../interface/bodega.interface';
import { TipoBodega } from '../interface/tipo-bodega.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService extends ServiceBaseService{

  private apiUrl: string = 'http://localhost:8080/';

  // Bodegas
  obtenerBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(`${this.apiUrl}bodega/getBodegas`);
  }

  guardarBodega(bodega: Bodega): Observable<Bodega> {
    return this.post<Bodega>(`${this.apiUrl}bodega/guardarBodega`, bodega);
  }

  eliminarBodega(id: number): Observable<any> {
    return this.delete(`${this.apiUrl}bodega/eliminarBodega/${id}`);
  }

  // Tipos de Bodega

  obtenerTipoBodegas(): Observable<TipoBodega[]> {
    return this.http.get<TipoBodega[]>(`${this.apiUrl}bodega/getTipoBodegas`);
  }

  guardarTipoBodega(tipoBodega: TipoBodega): Observable<TipoBodega> {
    return this.post<TipoBodega>(`${this.apiUrl}bodega/guardarTipoBodega`, tipoBodega);
  }

  eliminarTipoBodega(id: number): Observable<any> {
    return this.delete(`${this.apiUrl}bodega/eliminarTipoBodega/${id}`);
  }
}
