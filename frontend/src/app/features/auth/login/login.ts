import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {

    if (this.username.toLowerCase() === 'cliente') {
      this.router.navigate(['/client/dashboard']);
    }

    else if (this.username.toLowerCase() === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }

    else {
      alert('Usuario no reconocido. Usa "cliente" o "admin"');
    }
  }
}
