import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; 
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-client',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf], 
  templateUrl: './layout-client.html',
  styles: [`
    .nav-link-cliente {
      color: #a0a0a0 !important; /* Letras grises cuando no está activo */
      padding: 12px 16px !important;
      border-radius: 10px !important; /* Mismo redondeo que tu imagen */
      transition: all 0.2s ease;
    }
    .nav-link-cliente:hover {
      color: #ffffff !important;
      background-color: rgba(255, 255, 255, 0.05) !important;
    }
    
    /* EL BLOQUE EXACTO DE TU REFERENCIA PERO EN AZUL */
    .nav-link-cliente.activo-cliente {
      background-color: #0dcaf0 !important; /* FONDO TOTALMENTE SÓLIDO */
      color: #000000 !important; /* Letras negras para que se lea perfecto */
      font-weight: 800 !important;
      border: none !important; /* Cero bordes raros */
      box-shadow: 0 4px 20px rgba(13, 202, 240, 0.6) !important; /* El glow sutil por fuera */
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