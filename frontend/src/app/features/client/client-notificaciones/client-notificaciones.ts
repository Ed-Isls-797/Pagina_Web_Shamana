import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'client-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-notificaciones.html'
})
export class ClientNotificaciones implements OnInit {

  notificaciones: any[] = [];
  private usuarioId: string = '';

  constructor(
    private notificacionesService: NotificacionesService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const session = this.authService.getSession();
    this.usuarioId = session?._id || '';
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    if (!this.usuarioId) return;
    this.notificacionesService.getNotificaciones(this.usuarioId).subscribe({
      next: (data) => {
        this.notificaciones = data;
        this.cdr.detectChanges();
      },
      error: () => { this.notificaciones = []; }
    });
  }

  get noLeidas() { return this.notificaciones.filter(n => !n.leida).length; }

  marcarTodasComoLeidas() {
    this.notificacionesService.marcarTodasLeidas(this.usuarioId).subscribe(() => {
      this.notificaciones.forEach(n => n.leida = true);
      this.cdr.detectChanges();
    });
  }

  eliminarNotificacion(noti: any) {
    this.notificacionesService.deleteNotificacion(noti._id).subscribe(() => {
      this.notificaciones = this.notificaciones.filter(n => n._id !== noti._id);
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
}
