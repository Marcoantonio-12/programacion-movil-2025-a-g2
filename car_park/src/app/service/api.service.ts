import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://tu-api.com/api'; // reemplaza con tu URL real

  constructor(private http: HttpClient) {}

  getDatos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/datos`);
  }

  postDato(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/datos`, data);
  }
}
