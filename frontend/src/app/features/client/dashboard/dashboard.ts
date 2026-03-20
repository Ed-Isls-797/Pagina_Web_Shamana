import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgClass, CommonModule } from '@angular/common'; // Agregamos CommonModule por si acaso
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

  // Estas variables deben existir para que el HTML no marque error
  activeReservations = 0;
  pendingMessages = 1; 
  uploadedPayments = 3; 

  recentActivity: ActivityRecord[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Obtenemos las reservaciones del servicio
    const reservations: any[] = this.reservationService.getReservations() || [];

    // Contamos las activas
    this.activeReservations = reservations.filter(
      res => res.status === 'Confirmada' || res.status === 'Pendiente'
    ).length;

    // Mapeamos las últimas 4 reservaciones a la lista de actividad reciente
    this.recentActivity = reservations.slice(-4).reverse().map((res: any, index: number) => ({
      id: res.id || index,
      message: `Reserva para el ${res.date || 'Fecha no definida'}`,
      date: res.date || new Date(),
      type: this.obtenerColorPorEstado(res.status)
    }));
  }

  obtenerColorPorEstado(status: string): 'success' | 'info' | 'warning' {
    const estado = status?.toLowerCase() || '';
    if (estado.includes('confirmada') || estado.includes('aprobada')) return 'success';
    if (estado.includes('pendiente') || estado.includes('espera')) return 'warning';
    return 'info'; 
  }
}