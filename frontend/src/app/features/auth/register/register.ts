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

    .input-dark-group .input-group-text {
      background-color: #111;
      border: 1px solid #333;
      border-right: none;
      color: #6c757d;
    }
    .input-dark-group .form-control {
      background-color: #111;
      border: 1px solid #333;
      border-left: none;
      color: white;
    }
    .input-dark-group .form-control:focus {
      border-color: #bc13fe;
      box-shadow: none;
    }
    .input-dark-group:focus-within .input-group-text,
    .input-dark-group:focus-within .form-control {
      border-color: #bc13fe;
      border-top: 1px solid #bc13fe;
      border-bottom: 1px solid #bc13fe;
    }
    .input-dark-group:focus-within .input-group-text { border-left: 1px solid #bc13fe; }
    .input-dark-group:focus-within .form-control { border-right: 1px solid #bc13fe; }

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

  toastVisible = false;
  toastMensaje = '';
  toastTimeout: any;

  constructor(private router: Router) { }

  mostrarError(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  crearCuenta() {
    if (!this.nombre || !this.correo || !this.password) {
      this.mostrarError("Por favor llena todos los campos para registrarte.");
      return;
    }

    this.router.navigate(['/login']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}