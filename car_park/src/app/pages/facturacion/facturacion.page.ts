import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FacturacionService } from 'src/app/service/facturacion.service';

interface Factura {
  cliente: string;
  placa: string;
  horas: number;
  tipo: string;
  total: number;
  fecha: string;
}

@Component({
  standalone: true,
  selector: 'app-facturacion',
  templateUrl: './facturacion.page.html',
  styleUrls: ['./facturacion.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FacturacionService]
})
export class FacturacionPage {
  nombreCliente = '';
  placaVehiculo = '';
  horasEstadia: number | null = null;
  tipoVehiculo = '';
  vehiculoPersonalizado = '';
  total = 0;
  mostrarFactura = false;

  facturas: Factura[] = [];
  tarifasPorHora: { [tipo: string]: number } = {
    'Carro': 3000,
    'Moto': 1500,
    'Bicicleta': 500,
    'Camioneta': 4000,
    'Bus': 5000
  };

  private facturacionService = inject(FacturacionService);
  private alertController = inject(AlertController);
mensaje: any;
tipoMensaje: any;

  calcularTotal() {
    const tipo = this.tipoVehiculo || this.vehiculoPersonalizado;
    const tarifa = this.tarifasPorHora[tipo] || 2000;
    this.total = (this.horasEstadia ?? 0) * tarifa;
  }

  async mostrarAlerta(mensaje: string, encabezado: string = 'Información') {
    const alert = await this.alertController.create({
      header: encabezado,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  validarCampos(): boolean {
    if (!this.nombreCliente || !this.placaVehiculo || !this.horasEstadia || (!this.tipoVehiculo && !this.vehiculoPersonalizado)) {
      this.mostrarAlerta('Por favor, complete todos los campos obligatorios.', 'Campos incompletos');
      return false;
    }
    return true;
  }

  generarFactura() {
    if (!this.validarCampos()) return;

    this.calcularTotal();

    const tipo = this.tipoVehiculo || this.vehiculoPersonalizado || 'Otro';

    const nuevaFactura: Factura = {
      cliente: this.nombreCliente,
      placa: this.placaVehiculo,
      horas: this.horasEstadia ?? 0,
      tipo,
      total: this.total,
      fecha: new Date().toISOString().split('T')[0]
    };

    this.facturacionService.crearFactura(nuevaFactura).subscribe({
      next: async (respuesta: Factura) => {
        console.log('Factura guardada:', respuesta);
        this.facturas.push(respuesta);
        this.mostrarFactura = true;
        await this.mostrarAlerta('Factura guardada exitosamente.', 'Éxito');
      },
      error: async (error: any) => {
        console.error('Error al guardar factura:', error);
        await this.mostrarAlerta('Hubo un error al guardar la factura. Intenta nuevamente.', 'Error');
      }
    });

    // Limpiar formulario
    this.nombreCliente = '';
    this.placaVehiculo = '';
    this.horasEstadia = null;
    this.tipoVehiculo = '';
    this.vehiculoPersonalizado = '';
    this.total = 0;
  }
}
