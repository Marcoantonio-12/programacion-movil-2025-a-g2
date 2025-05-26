import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private router: Router, private menu: MenuController) {}

  cerrarSesion() {
    this.menu.close(); // Cierra el menú
    this.router.navigate(['/']); // Redirige al login
  }
}
