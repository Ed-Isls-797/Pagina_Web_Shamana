import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private userService: UserService
  ) {}

  metricas = {
    ingresos: { valor: '$48,250', porcentaje: '+41%', positivo: true },
    reservas: { valor: '156', porcentaje: '+8%', positivo: true },
    clientes: { valor: '45', porcentaje: '+24%', positivo: true },
    solicitudes: { valor: '12', porcentaje: '-3%', positivo: false }
  };

  reservaciones: any[] = [];
  actividad: any[] = [];

  ngOnInit() {
    this.reservationService.getReservations().subscribe(data => {
      this.reservaciones = data;
    });
    this.userService.getUsuarios().subscribe(data => {
      this.metricas.clientes.valor = data.length.toString();
    });
  }

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