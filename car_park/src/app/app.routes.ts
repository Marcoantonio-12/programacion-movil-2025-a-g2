import { IonicModule } from '@ionic/angular'; // Importa IonicModule para usar los componentes de Ionic
import { Routes } from '@angular/router'; // Necesario para manejar las rutas
import { RouterModule } from '@angular/router'; // Necesario para configurar las rutas en el navegador

// Importación de componentes de página
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { AdminDashboardPage } from './pages/admin-dashboard/admin-dashboard.page';
import { NuestrosServiciosPage } from './pages/nuestros-servicios/nuestros-servicios.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { RegistroPage } from './pages/registro/registro.page';
import { ReservasPage } from './pages/reservas/reservas.page';
import { FacturacionPage } from './pages/facturacion/facturacion.page';


// Importar Ionic Storage para su uso
import { IonicStorageModule } from '@ionic/storage-angular'; // Importar IonicStorageModule para que funcione el almacenamiento

export const routes: Routes = [
  { path: '', component: LoginPage }, // Página de inicio (login)
  { path: 'home', component: HomePage }, // Página de inicio después de login
  { path: 'admin-dashboard', component: AdminDashboardPage }, // Dashboard del admin
  { path: 'nuestros-servicios', component: NuestrosServiciosPage }, // Página de nuestros servicios
  { path: 'reservas', component: ReservasPage }, // Página de reservas
  { path: 'registro', component: RegistroPage }, // Página de registro
  { path: 'forgot-password', component: ForgotPasswordPage }, // Página de recuperación de contraseña
  { path: 'facturacion', component: FacturacionPage }, // Ruta de facturación
  { path: '**', redirectTo: '' }, // Redirige a la página de login en caso de error
];

// Aquí es donde no necesitamos un AppModule tradicional, pero si queremos integrar servicios globales como el almacenamiento, usamos IonicStorageModule

import { NgModule } from '@angular/core'; // Aseguramos la configuración de la aplicación

@NgModule({
  imports: [
    IonicModule.forRoot(), // Inicia el módulo Ionic
    RouterModule.forRoot(routes), // Configura las rutas de la aplicación
    IonicStorageModule.forRoot() // Agrega el módulo de IonicStorage para que se pueda usar en toda la app
  ],
  bootstrap: [], // No necesitamos bootstrap ya que no declaramos AppModule
})
export class AppModule {}
