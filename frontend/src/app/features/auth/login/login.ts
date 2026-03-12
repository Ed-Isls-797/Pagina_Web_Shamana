import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html'
})
export class Login {

  username: string = '';
  password: string = '';
  showModal: boolean = false;
  modalMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {

    if (this.username.toLowerCase() === 'cliente') {
      this.router.navigate(['/client/dashboard']);
    }

    else if (this.username.toLowerCase() === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }

    else {
      this.modalMessage = 'Usuario no reconocido. Usa "cliente" o "admin"';
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
