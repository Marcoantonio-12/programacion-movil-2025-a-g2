import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservaService, Reserva } from 'src/app/service/reservas.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage {

  private reservaService = inject(ReservaService);

  reserva: Reserva = {
    tipoVehiculo: '',
    vehiculoPersonalizado: '',
    placa: '',
    fechaHoraEntrada: '',
    fechaHoraSalida: '',
    duracion: '',
    costoEstimado: 0
  };

  ultimaReserva: Reserva | null = null;
  tipoReserva: string = '';
  duracionReserva: string = '';
  costoEstimado: number = 0;

  tarifas = {
    diurna: {
      Carro: 3000,
      Moto: 1500,
      Bicicleta: 500,
      Camioneta: 2000,
      Bus: 6000
    },
    nocturna: {
      Carro: 3500,
      Moto: 1800,
      Bicicleta: 600,
      Camioneta: 5000,
      Bus: 7000
    },
    finesDeSemana: {
      Carro: 4000,
      Moto: 2000,
      Bicicleta: 700,
      Camioneta: 8000,
      Bus: 8000
    },
    porMinuto: {
      Carro: 50,
      Moto: 25,
      Bicicleta: 10,
      Camioneta: 67,
      Bus: 200
    }
  };

  formatFechaHora(fechaHora: string): string {
    const formattedDate = new Date(fechaHora);
    return formattedDate.toLocaleString();
  }

  reservarEspacio() {
    if (!this.reserva.tipoVehiculo && !this.reserva.vehiculoPersonalizado) {
      alert('Debes seleccionar o ingresar un tipo de vehículo.');
      return;
    }

    const entrada = new Date(this.reserva.fechaHoraEntrada);
    const salida = new Date(this.reserva.fechaHoraSalida);

    if (isNaN(entrada.getTime()) || isNaN(salida.getTime())) {
      alert('Fechas no válidas.');
      return;
    }

    if (salida <= entrada) {
      alert('La hora de salida debe ser mayor a la de entrada.');
      return;
    }

    const duracionMs = salida.getTime() - entrada.getTime();
    const duracionHoras = duracionMs / (1000 * 60 * 60);
    const duracionMinutos = (duracionMs % (1000 * 60 * 60)) / (1000 * 60);

    this.duracionReserva = `${Math.floor(duracionHoras)} horas y ${Math.floor(duracionMinutos)} minutos`;
    this.costoEstimado = this.calcularCosto(duracionHoras, duracionMinutos);

    const usuarioId = 1; // Puedes ajustar esto si el ID es dinámico
    this.reservaService.crearReserva(usuarioId, this.reserva).subscribe({
      next: (response: any) => {
        console.log('Reserva creada:', response);
        this.ultimaReserva = { ...this.reserva };
        alert('Reserva creada exitosamente.');
      },
      error: (error: any) => {
        console.error('Error al crear la reserva:', error);
        alert('Hubo un error al crear la reserva.');
      }
    });
  }

  calcularCosto(duracionHoras: number, duracionMinutos: number): number {
    const tipoVehiculo = this.reserva.tipoVehiculo || this.reserva.vehiculoPersonalizado;
    const now = new Date();
    const esFinDeSemana = [0, 6].includes(now.getDay());
    const esNocturno = now.getHours() >= 18 || now.getHours() < 6;

    if (this.reserva.vehiculoPersonalizado) return 5000;

    const tipo = tipoVehiculo as keyof typeof this.tarifas.diurna;

    let tarifaHora = 0;
    let tarifaMinuto = 0;

    if (esFinDeSemana) {
      tarifaHora = this.tarifas.finesDeSemana[tipo] || 0;
    } else if (esNocturno) {
      tarifaHora = this.tarifas.nocturna[tipo] || 0;
    } else {
      tarifaHora = this.tarifas.diurna[tipo] || 0;
    }

    tarifaMinuto = this.tarifas.porMinuto[tipo] || 0;

    return (duracionHoras * tarifaHora) + (duracionMinutos * tarifaMinuto);
  }

  onVehiculoPersonalizadoInput() {
    if (this.reserva.vehiculoPersonalizado) {
      this.reserva.tipoVehiculo = '';
    }
  }

  onTipoVehiculoChange() {
    if (this.reserva.tipoVehiculo) {
      this.reserva.vehiculoPersonalizado = '';
    }
  }
}
