import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, RouterModule], // IMPORTANTE
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  constructor(private router: Router) {}

  irAlPanelAdmin() {
    this.router.navigate(['/admin-dashboard']);
  }

  verServicios() {
    this.router.navigate(['/nuestros-servicios']);
  }

  reservarParqueadero() {
    this.router.navigate(['/reservas']);
  }
}
