import { Component, OnInit, Inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarifasService, TarifaVehiculo } from 'src/app/service/tarifas.service';


@Component({
  selector: 'app-nuestros-servicios',
  templateUrl: './nuestros-servicios.page.html',
  styleUrls: ['./nuestros-servicios.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class NuestrosServiciosPage implements OnInit {
  tarifasPorTiempo: TarifaVehiculo[] = [];
  tarifasPorHoraMinutos = [
    { tipoVehiculo: 'Carro', porHora: 3000, porMinuto: 50 },
    { tipoVehiculo: 'Moto', porHora: 1500, porMinuto: 25 },
    { tipoVehiculo: 'Bicicleta', porHora: 500, porMinuto: 10 },
    { tipoVehiculo: 'Camioneta', porHora: 4000, porMinuto: 67 },
    { tipoVehiculo: 'Bus', porHora: 5000, porMinuto: 83 },
  ];
  tarifasMensualidad = [
    { tipoVehiculo: 'Carro', mensualidad: 'Mensual', valor: 150000 },
    { tipoVehiculo: 'Moto', mensualidad: 'Mensual', valor: 70000 },
    { tipoVehiculo: 'Bicicleta', mensualidad: 'Mensual', valor: 20000 },
    { tipoVehiculo: 'Camioneta', mensualidad: 'Mensual', valor: 180000 },
    { tipoVehiculo: 'Bus', mensualidad: 'Mensual', valor: 250000 }
  ];

  tipoSeleccionado: string = '';
  placa: string = '';
  horaEntrada: string = '';
  horaSalida: string = '';
  tarifaCalculada: string | null = null;
  errorTarifa: string | null = null;

  constructor(@Inject(TarifasService) private tarifasService: TarifasService) {} // Intentamos usar @Inject explícitamente

  ngOnInit(): void {
    this.tarifasPorTiempo = this.tarifasService.getTarifas();
  }

  calcularPrecio(): void {
    this.errorTarifa = null;
    this.tarifaCalculada = null;

    const tarifa = this.tarifasPorTiempo.find(
      t => t.tipoVehiculo.toLowerCase() === this.tipoSeleccionado.toLowerCase()
    );

    if (!tarifa) {
      this.errorTarifa = 'No se encontró una tarifa para el tipo de vehículo seleccionado.';
      return;
    }

    if (!this.horaEntrada || !this.horaSalida) {
      this.errorTarifa = 'Debe ingresar la hora de entrada y salida.';
      return;
    }

    const entrada = new Date(`1970-01-01T${this.horaEntrada}`);
    const salida = new Date(`1970-01-01T${this.horaSalida}`);
    const diffMs = salida.getTime() - entrada.getTime();

    if (diffMs <= 0) {
      this.errorTarifa = 'La hora de salida debe ser posterior a la hora de entrada.';
      return;
    }

    const diffHoras = diffMs / (1000 * 60 * 60);
    const precio = diffHoras * tarifa.diurna; // Usamos la tarifa diurna como ejemplo
    this.tarifaCalculada = `COP ${precio.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
  }

  limpiarFormulario(): void {
    this.tipoSeleccionado = '';
    this.placa = '';
    this.horaEntrada = '';
    this.horaSalida = '';
    this.tarifaCalculada = null;
    this.errorTarifa = null;
  }
}
