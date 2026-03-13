import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html' 
})
export class Dashboard { 

  constructor(private router: Router) {}

  metricas = {
    ingresos: { valor: '$48,250', porcentaje: '+41%', positivo: true },
    reservas: { valor: '156', porcentaje: '+8%', positivo: true },
    clientes: { valor: '45', porcentaje: '+24%', positivo: true },
    solicitudes: { valor: '12', porcentaje: '-3%', positivo: false }
  };

  reservaciones = [
    { cliente: 'Juan Pérez', fecha: 'Oct 21, 2026', mesa: 'Booth VIP 1', estado: 'Pendiente' },
    { cliente: 'María García', fecha: 'Oct 22, 2026', mesa: 'Booth VIP 2', estado: 'Confirmado' },
    { cliente: 'Carlos López', fecha: 'Oct 23, 2026', mesa: 'Booth VIP 3', estado: 'Confirmado' },
    { cliente: 'Ana Martínez', fecha: 'Oct 24, 2026', mesa: 'Booth VIP 4', estado: 'Confirmado' },
    { cliente: 'Luis Torres', fecha: 'Oct 25, 2026', mesa: 'Mesa General', estado: 'Pendiente' }
  ];

  actividad = [
    { titulo: 'Nuevo Pago recibido de Sara L.', tiempo: 'hace 5 minutos', tipo: 'pago' },
    { titulo: 'Nuevo Cliente registrado', tiempo: 'hace 12 minutos', tipo: 'cliente' },
    { titulo: 'Mensaje de solicitud sobre botella VIP...', tiempo: 'hace 1 hora', tipo: 'mensaje' },
    { titulo: 'Nueva reservación de Pedro M.', tiempo: 'hace 2 horas', tipo: 'reserva' }
  ];

  goToReservations() {
    this.router.navigate(['/admin/reservations']);
  }

  goToNotifications() {
    this.router.navigate(['/admin/notificaciones']);
  }

  goToCrearEvento() {
    this.router.navigate(['/admin/contenido'], { queryParams: { accion: 'nuevo' } });
  }
}