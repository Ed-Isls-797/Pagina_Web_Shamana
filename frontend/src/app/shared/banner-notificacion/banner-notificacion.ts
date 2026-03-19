import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-banner-notificacion',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div *ngIf="notificacion" 
          class="banner-flotante d-flex justify-content-between align-items-center px-4 py-2"
          [ngClass]="tipoDestino === 'Cliente' ? 'banner-cliente' : 'banner-general'">
      
      <div class="d-flex align-items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        <span class="fw-bold fs-6">{{ notificacion.titulo }}</span>
      </div>

      <button class="btn btn-close-custom p-0 ms-3 d-flex align-items-center justify-content-center" (click)="cerrar()">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .banner-flotante {
      width: 100%;
      position: relative;
      z-index: 1050; /* Para que quede por encima de todo */
      animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    /* DISEÑO CLIENTE (AZUL CYAN NEÓN) */
    .banner-cliente {
      background-color: rgba(13, 202, 240, 0.15);
      border-bottom: 2px solid #0dcaf0;
      color: #0dcaf0;
      box-shadow: 0 4px 15px rgba(13, 202, 240, 0.2);
    }

    /* DISEÑO GENERAL (HOME - DORADO/AMARILLO SHAMANA) */
    .banner-general {
      background-color: rgba(255, 193, 7, 0.15);
      border-bottom: 2px solid #ffc107;
      color: #ffc107;
      box-shadow: 0 4px 15px rgba(255, 193, 7, 0.2);
    }

    .btn-close-custom {
      background: transparent; border: none; color: inherit;
      transition: transform 0.2s; cursor: pointer;
    }
    .btn-close-custom:hover { transform: scale(1.2); }

    @keyframes slideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class BannerNotificacionComponent implements OnInit, OnDestroy {
  @Input() tipoDestino: 'Cliente' | 'General' = 'General';
  notificacion: any = null;
  private listener: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.cargarNotificacion();
    
    if (typeof window !== 'undefined') {
      this.listener = () => this.cargarNotificacion();
      window.addEventListener('notificacion_actualizada', this.listener);
      window.addEventListener('storage', this.listener);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined' && this.listener) {
      window.removeEventListener('notificacion_actualizada', this.listener);
      window.removeEventListener('storage', this.listener);
    }
  }

  cargarNotificacion() {
    this.notificacion = this.notificationService.obtenerNotificacion(this.tipoDestino);
  }

  cerrar() {
    this.notificationService.cerrarNotificacion();
    this.notificacion = null;
  }
}