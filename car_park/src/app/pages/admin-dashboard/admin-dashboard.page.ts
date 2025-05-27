import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Importamos IonicModule
import { FormsModule } from '@angular/forms';  // Importamos FormsModule para usar ngModel
import { CommonModule } from '@angular/common';  // Importamos CommonModule para poder usar *ngIf y el pipe 'currency'

// Importa los componentes de Ionic que usas
import { IonHeader, IonContent, IonToolbar, IonCardContent, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonInput, IonItem, IonButton, IonRow, IonCol, IonGrid } from "@ionic/angular/standalone";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: 'admin-dashboard.page.html',
  styleUrls: ['admin-dashboard.page.scss'],
  standalone: true,  // Marcamos el componente como standalone
  imports: [IonicModule, FormsModule, CommonModule],  // Añadimos CommonModule aquí
})
export class AdminDashboardPage {
  // Variables del formulario de cálculo de tarifas
  tipoSeleccionado: string = '';
  placa: string = '';
  horaEntrada: string = '';
  horaSalida: string = '';
  precioCalculado: number | null = null;
  detalleCalculo: string = '';

  // Registros temporales (vehículos registrados)
  registrosTemporales: any[] = [];

  // Nueva tarifa personalizada
  nuevaTarifa = {
    tipoVehiculo: '',
    diurna: 0,
    nocturna: 0,
    finesSemanaFestivos: 0,
  };

  // Tarifas por tipo de vehículo
  tarifasPorTiempo: any[] = [
    { tipoVehiculo: 'Carro', diurna: 5000, nocturna: 7000, finesSemanaFestivos: 8000 },
    { tipoVehiculo: 'Moto', diurna: 3000, nocturna: 4000, finesSemanaFestivos: 5000 }
  ];

  // Datos para las reservas
  nuevaReserva = {
    placa: '',
    tipo: '',
    tipoPersonalizado: '',
    horaEntrada: '',
  };
  reservasActuales: any[] = [];
  historialReservas: any[] = [];

  // Variables para facturación
  facturacionDia = {
    fecha: '',
    montoTotal: 0,
    vehiculosAtendidos: 0,
  };

  // Historial de facturación actualizado con los campos solicitados (fecha, hora, valor)
  facturacionHistorial: any[] = [
    { fecha: '2025-05-20', hora: '08:00', valor: 50000 },
    { fecha: '2025-05-19', hora: '14:00', valor: 45000 },
  ];

  facturacionPorTipoVehiculo: any[] = [
    { tipoVehiculo: 'Carro', totalFacturado: 20000, cantidad: 10 },
    { tipoVehiculo: 'Moto', totalFacturado: 15000, cantidad: 8 },
  ];
i: number | undefined;

  // Método para calcular el precio
  calcularPrecio() {
    if (this.tipoSeleccionado && this.placa && this.horaEntrada && this.horaSalida) {
      const horaEntrada = new Date(`1970-01-01T${this.horaEntrada}:00`);
      const horaSalida = new Date(`1970-01-01T${this.horaSalida}:00`);
      const diferenciaHoras = (horaSalida.getTime() - horaEntrada.getTime()) / (1000 * 3600); // En horas

      let tarifaPorHora: number = 0;
      let tipoHora = 'diurna';

      // Verificar si es nocturna o fines de semana
      const horaActual = new Date();
      const esFinDeSemana = horaActual.getDay() === 6 || horaActual.getDay() === 0; // Sábado o Domingo
      const esNocturna = horaActual.getHours() >= 18 || horaActual.getHours() < 6;

      if (esFinDeSemana) {
        tipoHora = 'finesSemanaFestivos';
      } else if (esNocturna) {
        tipoHora = 'nocturna';
      } else {
        tipoHora = 'diurna';
      }

      // Buscar tarifa para el tipo de vehículo
      const tarifa = this.tarifasPorTiempo.find(t => t.tipoVehiculo === this.tipoSeleccionado);
      if (tarifa) {
        tarifaPorHora = tarifa[tipoHora];
      }

      this.precioCalculado = tarifaPorHora * diferenciaHoras;
      this.detalleCalculo = `Calculado con tarifa ${tipoHora} de ${tarifaPorHora} COP/hora.`;
    }
  }

  // Limpiar formulario de cálculo
  limpiarFormulario() {
    this.tipoSeleccionado = '';
    this.placa = '';
    this.horaEntrada = '';
    this.horaSalida = '';
    this.precioCalculado = null;
    this.detalleCalculo = '';
  }

  // Método para agregar nuevo registro
  agregarRegistro() {
    if (this.tipoSeleccionado && this.placa && this.horaEntrada && this.horaSalida) {
      const nuevoRegistro = {
        tipo: this.tipoSeleccionado,
        placa: this.placa,
        horaEntrada: this.horaEntrada,
        horaSalida: this.horaSalida,
        precio: this.precioCalculado,
        detalle: this.detalleCalculo,
        timestamp: new Date().toLocaleString(),
      };
      this.registrosTemporales.push(nuevoRegistro);
      this.limpiarFormulario();
    }
  }

  // Método para eliminar un registro temporal
  eliminarRegistroTemporal(index: number) {
    this.registrosTemporales.splice(index, 1);
  }

  // Método para agregar tarifa personalizada
  agregarTarifa() {
    if (this.nuevaTarifa.tipoVehiculo && this.nuevaTarifa.diurna > 0 && this.nuevaTarifa.nocturna > 0 && this.nuevaTarifa.finesSemanaFestivos > 0) {
      this.tarifasPorTiempo.push({
        tipoVehiculo: this.nuevaTarifa.tipoVehiculo,
        diurna: this.nuevaTarifa.diurna,
        nocturna: this.nuevaTarifa.nocturna,
        finesSemanaFestivos: this.nuevaTarifa.finesSemanaFestivos
      });
      this.nuevaTarifa = { tipoVehiculo: '', diurna: 0, nocturna: 0, finesSemanaFestivos: 0 };
    }
  }

  // Método para eliminar tarifa personalizada
  eliminarTarifa(tipoVehiculo: string) {
    const index = this.tarifasPorTiempo.findIndex(t => t.tipoVehiculo === tipoVehiculo);
    if (index > -1) {
      this.tarifasPorTiempo.splice(index, 1);
    }
  }

  // Método para agregar una reserva manualmente
  agregarReservaManual() {
    if (this.nuevaReserva.placa && this.nuevaReserva.tipo && this.nuevaReserva.horaEntrada) {
      const nuevaReserva = { ...this.nuevaReserva, estado: true, id: this.reservasActuales.length + 1 };
      this.reservasActuales.push(nuevaReserva);
      this.nuevaReserva = { placa: '', tipo: '', tipoPersonalizado: '', horaEntrada: '' };
    }
  }

  // Método para alternar el estado de una reserva
  alternarEstado(reserva: any) {
    reserva.estado = !reserva.estado;
  }

  // Método para mover reserva a historial
  moverAHistorial(reserva: any) {
    const index = this.reservasActuales.findIndex(r => r.id === reserva.id);
    if (index > -1) {
      this.reservasActuales.splice(index, 1);
      this.historialReservas.push(reserva);
    }
  }

  // Método para eliminar un registro de historial
  eliminarHistorial(id: number) {
    const index = this.historialReservas.findIndex(r => r.id === id);
    if (index > -1) {
      this.historialReservas.splice(index, 1);
    }
  }

  // Método para agregar datos de facturación del día
  agregarFacturacionDia() {
    const { fecha, montoTotal, vehiculosAtendidos } = this.facturacionDia;

    // Verificamos que los datos sean válidos
    if (fecha && montoTotal > 0 && vehiculosAtendidos > 0) {
      const hora = new Date().toLocaleTimeString(); // Obtener la hora actual

      // Creamos un nuevo objeto de facturación con fecha, hora y monto
      const nuevaFacturacion = {
        fecha,
        hora,
        valor: montoTotal,
      };

      // Agregamos la nueva facturación al historial
      this.facturacionHistorial.push(nuevaFacturacion);

      // Limpiamos los campos después de agregar la facturación
      this.facturacionDia = {
        fecha: '',
        montoTotal: 0,
        vehiculosAtendidos: 0,
      };
    } else {
      alert('Por favor ingrese una fecha válida y los valores de facturación.');
    }
  }
}
