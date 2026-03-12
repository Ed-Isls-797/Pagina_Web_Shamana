import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-layout-client',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './layout-client.html'
})
export class LayoutClient {
  showLogoutModal: boolean = false;
  isMenuOpen: boolean = false; 

  constructor(private router: Router) {}

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.showLogoutModal = false;
    this.router.navigate(['/auth/login']); 
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}