import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RolOperacion, SubTipoTerceros, TipoDocumento, TipoTercero } from '../interface/tablas-sistema.interface';
import { Observable } from 'rxjs';
import { ClasificacionesFiscales } from '../interface/tercero.interface';


@Injectable({
  providedIn: 'root'
})
export class TablasSistemaService {

  private apiUrl: string = 'http://localhost:8080/tablasSistema';
  private http = inject(HttpClient);

  constructor() { }

  obtenerTipoDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.apiUrl}/getAllTipoDocumentos`);
  }

  obtenerTipoTercero(): Observable<TipoTercero[]> {
    return this.http.get<TipoTercero[]>(`${this.apiUrl}/getAllTipoTerceros`);
  }

  obtenerSubTipoTercero(): Observable<SubTipoTerceros[]> {
    return this.http.get<SubTipoTerceros[]>(`${this.apiUrl}/getAllSubTipoTerceros`);
  }

  obtenerRolOperacion(): Observable<RolOperacion[]> {
    return this.http.get<RolOperacion[]>(`${this.apiUrl}/getAllRolOperacion`);
  }

  obtenerClasificacionFiscal(): Observable<ClasificacionesFiscales[]> {
    return this.http.get<ClasificacionesFiscales[]>(`${this.apiUrl}/getAllClasificacionFiscales`);
  }
}
