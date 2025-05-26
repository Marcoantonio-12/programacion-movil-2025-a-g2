import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  private apiUrl = 'https://tu-backend-api.com/api'; // Reemplaza con tu backend

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  async saveUserSession(user: any) {
    await this._storage?.set('user', user);
  }

  async getUserSession() {
    return await this._storage?.get('user');
  }

  async logout() {
    await this._storage?.remove('user');
    this.router.navigate(['/login']);
  }
}
