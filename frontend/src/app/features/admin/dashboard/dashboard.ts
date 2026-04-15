import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { UserService } from '../../../services/user.service';
import { EventosService } from '../../../services/eventos';
import { ComprobantesService } from '../../../services/comprobantes.service';
import { NotificacionesService } from '../../../services/notificaciones.service';

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
    private userService: UserService,
    private eventosService: EventosService,
    private comprobantesService: ComprobantesService,
    private notificacionesService: NotificacionesService,
    private cdr: ChangeDetectorRef
  ) {}

  totalReservaciones = 0;
  reservacionesPendientes = 0;
  totalUsuarios = 0;
  eventosPublicados = 0;
  comprobantesPorRevisar = 0;
  notificacionesSinLeer = 0;

  reservacionesRecientes: any[] = [];
  actividadReciente: any[] = [];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.reservationService.getReservaciones().subscribe(data => {
      this.totalReservaciones = data.length;
      this.reservacionesPendientes = data.filter(r => r.status === 'Pendiente').length;
      this.reservacionesRecientes = [...data].reverse().slice(0, 5);
      this.cdr.detectChanges();
    });

    this.userService.getUsuarios().subscribe(data => {
      this.totalUsuarios = data.filter(u => u.rol !== 'admin').length;
      this.cdr.detectChanges();
    });

    this.eventosService.obtenerEventos().subscribe(data => {
      this.eventosPublicados = data.filter(e => e.estado === 'Publicado').length;
      this.cdr.detectChanges();
    });

    this.comprobantesService.getComprobantes().subscribe(comprobantes => {
      this.reservationService.getReservaciones().subscribe(reservaciones => {
        const resueltosIds = new Set(
          reservaciones.filter(r => r.status === 'Confirmado' || r.status === 'Rechazado').map(r => r._id)
        );
        this.comprobantesPorRevisar = comprobantes.filter(c => !resueltosIds.has(c.reservacion_id)).length;
        this.cdr.detectChanges();
      });
    });

    this.notificacionesService.getNotificaciones('admin').subscribe(data => {
      this.notificacionesSinLeer = data.filter(n => !n.leida).length;
      this.actividadReciente = data.slice(0, 5).map(n => ({
        titulo: n.titulo,
        mensaje: n.mensaje,
        tiempo: this.getTimeAgo(n.fecha),
        tipo: n.tipo
      }));
      this.cdr.detectChanges();
    });
  }

  getTimeAgo(fecha: string): string {
    if (!fecha) return '';
    const now = new Date();
    const then = new Date(fecha);
    const diffMs = now.getTime() - then.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'hace un momento';
    if (diffMin < 60) return `hace ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `hace ${diffH}h`;
    const diffD = Math.floor(diffH / 24);
    return `hace ${diffD}d`;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Confirmado': return 'border-success text-success';
      case 'Pendiente': return 'border-warning text-warning';
      case 'Aceptado': return 'border-info text-info';
      case 'Rechazado': return 'border-danger text-danger';
      default: return 'border-secondary text-secondary';
    }
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