import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; 
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BannerNotificacionComponent } from '../../../shared/banner-notificacion/banner-notificacion';
@Component({
  selector: 'app-layout-client',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, BannerNotificacionComponent], 
  templateUrl: './layout-client.html',
  styles: [`
    .nav-link-cliente {
      color: #a0a0a0 !important;
      padding: 12px 16px !important;
      border-radius: 10px !important;
      transition: all 0.2s ease;
    }
    .nav-link-cliente:hover {
      color: #ffffff !important;
      background-color: rgba(255, 255, 255, 0.05) !important;
    }
    .nav-link-cliente.activo-cliente {
      background-color: #0dcaf0 !important;
      color: #000000 !important;
      font-weight: 800 !important;
      border: none !important;
      box-shadow: 0 4px 20px rgba(13, 202, 240, 0.6) !important;
    }
  `]
})
export class LayoutClient {
  showLogoutModal: boolean = false;
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  openLogoutModal() { this.showLogoutModal = true; }
  closeLogoutModal() { this.showLogoutModal = false; }
  
  confirmLogout() {
    this.showLogoutModal = false;
    this.router.navigate(['/auth/login']); 
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu() { this.isMenuOpen = false; }
}