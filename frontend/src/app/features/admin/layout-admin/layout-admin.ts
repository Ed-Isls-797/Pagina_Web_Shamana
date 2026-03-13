import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; 
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf], 
  templateUrl: './layout-admin.html',
  styles: [`
    .nav-link-admin {
      color: #a0a0a0 !important; /* Letras grises cuando no está activo */
      padding: 12px 16px !important;
      border-radius: 10px !important; /* Mismo redondeo que tu imagen */
      transition: all 0.2s ease;
    }
    .nav-link-admin:hover {
      color: #ffffff !important;
      background-color: rgba(255, 255, 255, 0.05) !important;
    }
    
    /* EL BLOQUE EXACTO DE TU REFERENCIA PERO EN AMARILLO */
    .nav-link-admin.activo-admin {
      background-color: #ffc107 !important; /* FONDO TOTALMENTE SÓLIDO */
      color: #000000 !important; /* Letras negras para que resalte cabrón */
      font-weight: 800 !important;
      border: none !important; /* Cero bordes raros */
      box-shadow: 0 4px 20px rgba(255, 193, 7, 0.6) !important; /* El glow sutil por fuera */
    }
  `]
})
export class LayoutAdmin {
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