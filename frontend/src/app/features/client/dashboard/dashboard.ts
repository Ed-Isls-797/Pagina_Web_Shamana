import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { ComprobantesService } from '../../../services/comprobantes.service';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

  private usuarioId = '';
  private nombreUsuario = '';

  // Métricas
  totalReservaciones = 0;
  reservacionesPendientes = 0;
  reservacionesConfirmadas = 0;
  comprobantesSubidos = 0;
  notificacionesSinLeer = 0;

  // Tablas
  reservacionesRecientes: any[] = [];
  notificacionesRecientes: any[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private comprobantesService: ComprobantesService,
    private notificacionesService: NotificacionesService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const session = this.authService.getSession();
    this.usuarioId = session?._id || '';
    this.nombreUsuario = session?.nombre_completo || 'Cliente';
    this.cargarDatos();
  }

  get saludo(): string {
    const hora = new Date().getHours();
    if (hora < 12) return 'Buenos días';
    if (hora < 19) return 'Buenas tardes';
    return 'Buenas noches';
  }

  get nombre(): string {
    return this.nombreUsuario.split(' ')[0];
  }

  cargarDatos() {
    if (!this.usuarioId) return;

    // Reservaciones del usuario
    this.reservationService.getReservaciones().subscribe(data => {
      const misReservas = data.filter(r => r.usuario_id === this.usuarioId);
      this.totalReservaciones = misReservas.length;
      this.reservacionesPendientes = misReservas.filter(r => r.status === 'Pendiente' || r.status === 'Aceptado').length;
      this.reservacionesConfirmadas = misReservas.filter(r => r.status === 'Confirmado').length;
      this.reservacionesRecientes = [...misReservas].reverse().slice(0, 5);
      this.cdr.detectChanges();
    });

    // Comprobantes del usuario
    this.comprobantesService.getComprobantesByUsuario(this.usuarioId).subscribe(data => {
      this.comprobantesSubidos = data.length;
      this.cdr.detectChanges();
    });

    // Notificaciones del usuario
    this.notificacionesService.getNotificaciones(this.usuarioId).subscribe(data => {
      this.notificacionesSinLeer = data.filter(n => !n.leida).length;
      this.notificacionesRecientes = data.slice(0, 4).map(n => ({
        titulo: n.titulo,
        mensaje: n.mensaje,
        tiempo: this.getTimeAgo(n.fecha),
        tipo: n.tipo,
        leida: n.leida
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
    this.router.navigate(['/client/reservations']);
  }

  goToNotifications() {
    this.router.navigate(['/client/notificaciones']);
  }

  goToNuevaReserva() {
    this.router.navigate(['/client/nueva-reservacion']);
  }

  goToPayments() {
    this.router.navigate(['/client/payments']);
  }
}