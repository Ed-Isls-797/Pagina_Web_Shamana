import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styles: [`
    .fondo-login {
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
    
    .role-toggle {
      background-color: #111;
      border-radius: 12px;
      padding: 5px;
      border: 1px solid #333;
    }
    .role-btn {
      border-radius: 8px;
      transition: all 0.3s ease;
    }

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
export class Login {
  rolSeleccionado: 'cliente' | 'admin' = 'cliente';
  correo = '';
  password = '';

  mostrarPassword = false;

  toastVisible = false;
  toastMensaje = '';
  toastTimeout: any;

  constructor(private router: Router) { }

  setRol(rol: 'cliente' | 'admin') {
    this.rolSeleccionado = rol;
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  mostrarError(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 4000); 
  }

  entrar() {
    if (!this.correo || !this.password) {
      this.mostrarError("Tienes que llenar todos los datos para entrar.");
      return;
    }

    // 🔥 ESTA ES LA LÍNEA MÁGICA 🔥
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|live\.com|icloud\.com)$/i;
    
    if (!emailRegex.test(this.correo)) {
      this.mostrarError("Usa un correo real (@gmail, @outlook, @hotmail). Revisa que esté bien escrito, we.");
      return;
    }

    if (this.password.length < 8) {
      this.mostrarError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (this.rolSeleccionado === 'cliente') {
      this.router.navigate(['/client/dashboard']);
    } else {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  irARegistro() {
    this.router.navigate(['/register']);
  }
}