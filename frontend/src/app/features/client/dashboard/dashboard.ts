// Archivo: src/app/dashboard/dashboard.component.ts (o donde tengas tu componente)
import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

import { ReservationService } from '../../../services/reservation.service';
export interface ActivityRecord {
  id: number;
  message: string;
  date: Date | string; 
  type: 'success' | 'info' | 'warning'; 
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [DatePipe, NgClass], 
  templateUrl: './dashboard.html' // Asegúrate de que tu archivo HTML se llame exactamente así
})
export class Dashboard implements OnInit {

  private reservationService = inject(ReservationService);

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
    if (estado.includes('completada') || estado.includes('aprobada')) return 'success';
    if (estado.includes('pendiente') || estado.includes('espera')) return 'warning';
    return 'info'; 
  }
}