import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styles: [`
    .fondo-registro {
      background: url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1920') no-repeat center center;
      background-size: cover;
      position: relative;
    }
    .capa-oscura {
      position: absolute; top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.75);
    }
    .neon-purple {
      background-color: #bc13fe !important;
      color: white !important;
      box-shadow: 0 4px 20px rgba(188, 19, 254, 0.6) !important;
      border: none !important;
    }
    .text-neon { color: #bc13fe !important; }

    /* CSS Ajustado para soportar el ojito de la contraseña */
    .input-dark-group .input-group-text {
      background-color: #111;
      border: 1px solid #333;
      color: #6c757d;
    }
    .input-dark-group .form-control {
      background-color: #111;
      border: 1px solid #333;
      color: white;
    }
    .input-dark-group .form-control:focus {
      box-shadow: none;
    }
    .input-dark-group:focus-within .input-group-text,
    .input-dark-group:focus-within .form-control {
      border-color: #bc13fe;
    }

    .toast-error {
      position: fixed;
      top: 30px;
      right: 30px;
      z-index: 9999999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .toast-error.show-toast {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  `]
})
export class Register {
  nombre = '';
  correo = '';
  password = '';

  // Variable para el ojito
  mostrarPassword = false;

  toastVisible = false;
  toastMensaje = '';
  toastTimeout: any;

  constructor(private router: Router) {}

  // Función para cambiar de texto a contraseña
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  mostrarError(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 4000); // 4 segundos para que lo lean bien
  }

  crearCuenta() {
    // 1. Validar campos vacíos
    if (!this.nombre || !this.correo || !this.password) {
      this.mostrarError("Por favor completa todos los campos requeridos.");
      return;
    }

    // 2. Validar formato y DOMINIO EXACTO (Modo Paranoico)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|live\.com|icloud\.com)$/i;
    if (!emailRegex.test(this.correo)) {
      this.mostrarError("Usa un correo real (@gmail, @outlook, @hotmail). Revisa que esté bien escrito.");
      return;
    }

    // 3. Validar los 8 caracteres de la contraseña
    if (this.password.length < 8) {
      this.mostrarError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Proceso exitoso (por ahora redirigimos al login)
    this.router.navigate(['/login']); 
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}