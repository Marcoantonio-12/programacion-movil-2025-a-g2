 import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioService, Usuario } from '../../service/usuario.service';

@Component({
  standalone: true,
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule]
})
export class RegistroPage {
  usuarios: Usuario[] = [];
  editando = false;
  indexEdit: number | null = null;
  usuario: Usuario = this.getUsuarioVacio();

  correoInvalido = false;
  telefonoInvalido = false;
  mostrarContrasena = false;

  constructor(private usuarioService: UsuarioService) {}

  guardarUsuario(): void {
    // Validación de campos obligatorios
    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.password || !this.usuario.telefono || !this.usuario.rol) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Validaciones específicas
    this.correoInvalido = !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.usuario.email);
    this.telefonoInvalido = !/^\d{10}$/.test(this.usuario.telefono);

    if (this.correoInvalido || this.telefonoInvalido) {
      alert('Corrige los errores antes de continuar.');
      return;
    }

    // Si estamos editando un usuario ya existente
    if (this.editando && this.indexEdit !== null) {
      this.usuarios[this.indexEdit] = { ...this.usuario };
      alert('Usuario actualizado correctamente.');
      this.resetFormulario();
    } else {
      // Registro nuevo
      this.usuarioService.registrarUsuario(this.usuario).subscribe({
        next: () => {
          alert('Usuario registrado correctamente.');
          this.usuarios.push({ ...this.usuario });
          this.resetFormulario();
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          alert('Ocurrió un error al guardar en el servidor.');
        }
      });
    }
  }

  editarUsuario(index: number): void {
    this.usuario = { ...this.usuarios[index] };
    this.editando = true;
    this.indexEdit = index;
    this.mostrarContrasena = false;
  }

  eliminarUsuario(index: number): void {
    const confirmacion = confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirmacion) return;

    this.usuarios.splice(index, 1);

    // Si estamos editando justo el que se eliminó
    if (this.editando && this.indexEdit === index) {
      this.resetFormulario();
    }
  }

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  resetFormulario(): void {
    this.usuario = this.getUsuarioVacio();
    this.editando = false;
    this.indexEdit = null;
    this.correoInvalido = false;
    this.telefonoInvalido = false;
    this.mostrarContrasena = false;
  }

  private getUsuarioVacio(): Usuario {
    return {
  nombre: '',
  telefono: '',
  rol: '',
  email: '',
  password: '',
};
  }
}



