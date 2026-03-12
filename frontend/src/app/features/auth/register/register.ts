import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  showRegisterModal: boolean = false;

  constructor(private router: Router) {}

  onRegister() {
    this.showRegisterModal = true;
    setTimeout(() => {
      this.router.navigate(['/client/dashboard']);
    }, 1500);
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
    this.router.navigate(['/client/dashboard']);
  }
}
