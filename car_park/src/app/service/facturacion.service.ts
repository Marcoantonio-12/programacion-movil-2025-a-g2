// src/app/services/facturacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  private apiUrl = 'http://localhost:8081/api/facturacion'; // Corregido

  constructor(private http: HttpClient) {}

  crearFactura(factura: any): Observable<any> {
    return this.http.post(this.apiUrl, factura);
  }
}
