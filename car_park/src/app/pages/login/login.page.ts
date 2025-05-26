import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private menu: MenuController) {}

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  login() {
    this.router.navigate(['/home']);
  }

  irAOlvidasteContrasena() {
    this.router.navigate(['/forgot-password']);
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
