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


  guardarBodega(bodega: Bodega): Observable<Bodega> {
    return this.post<Bodega>(`${this.apiUrl}bodega/guardarBodega`, bodega);
  }

  eliminarBodega(id: number): Observable<any> {
    return this.delete(`${this.apiUrl}bodega/eliminarBodega/${id}`);
  }

  obtenerTipoBodegas(): Observable<TipoBodega[]> {
    return this.http.get<TipoBodega[]>(`${this.apiUrl}bodega/getTipoBodegas`);
  }
}
