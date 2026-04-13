// Archivo: src/app/dashboard/dashboard.component.ts (o donde tengas tu componente)
import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

import { ReservationService } from '../../../services/reservation.service';

// Definimos la interfaz para que no haya errores de tipo
export interface ActivityRecord {
  id: number;
  message: string;
  date: Date | string; 
  type: 'success' | 'info' | 'warning'; 
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, NgClass], // CommonModule es clave
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'] // Asegúrate de que el CSS esté vinculado
})
export class Dashboard implements OnInit {

  private reservationService = inject(ReservationService);
  private cdr = inject(ChangeDetectorRef);

  // Estas variables deben existir para que el HTML no marque error
  activeReservations = 0;
  pendingMessages = 1; 
  uploadedPayments = 3; 

  recentActivity: ActivityRecord[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    const reservations: any[] = this.reservationService.getReservations();

    const activas = reservations.filter(res => res.status === 'Activa' || res.status === 'Pendiente');
    this.activeReservations = activas.length;

    const ultimasReservaciones = reservations.slice(-4).reverse();

    this.recentActivity = ultimasReservaciones.map((res: any, index: number) => {
      return {
        id: res.id || index, 
        message: `Reservación creada/actualizada: ${res.status || 'Sin estado'}`, 
        date: res.fecha || new Date(), 
        type: this.obtenerColorPorEstado(res.status)
      };
    });
  }

  obtenerColorPorEstado(status: string): 'success' | 'info' | 'warning' {
    const estado = status?.toLowerCase() || '';
    if (estado.includes('confirmada') || estado.includes('aprobada')) return 'success';
    if (estado.includes('pendiente') || estado.includes('espera')) return 'warning';
    return 'info'; 
  }
}