import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reserva {
  id?: number;
  fechaHoraEntrada: string;
  fechaHoraSalida: string;
  tipoVehiculo: string;
  vehiculoPersonalizado: string;
  placa: string;
  duracion: string;
  costoEstimado: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private baseUrl = 'http://localhost:8081/api/reservas';

  constructor(private http: HttpClient) {}

  crearReserva(usuarioId: number, reserva: Reserva): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear/${usuarioId}`, reserva);
  }
}
