import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, {
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      telefono: usuario.telefono,
      rol: usuario.rol
    });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  recuperarContrasena(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar`, { email });
  }
}
