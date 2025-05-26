import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Si tienes diferentes ambientes, podrías tener configuraciones de URL aquí.
const API_URL = 'http://<tu-ip-local>:8081/api/usuarios'; // Cambia localhost por tu IP real si usas un dispositivo físico.

@Injectable({
  providedIn: 'root'
})
export class RecuperarService {

  constructor(private http: HttpClient) {}

  // Método para enviar correo
  enviarCorreo(correo: string): Observable<any> {
    const url = `${API_URL}/enviar-codigo`; // Asegúrate de tener la ruta correcta
    return this.http.post(url, { correo });
  }

}
