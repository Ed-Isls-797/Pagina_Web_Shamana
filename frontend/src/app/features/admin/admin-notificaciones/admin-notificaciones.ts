import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notification';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'admin-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-notificaciones.html'
})
export class AdminNotificaciones implements OnInit {

  notificaciones: any[] = [];
  showModal = false;
  nuevoTitulo = '';
  nuevoMensaje = '';
  nuevoTipo: 'Cliente' | 'General' = 'General';

  constructor(
    private notificationService: NotificationService,
    private notificacionesService: NotificacionesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    this.notificacionesService.getNotificaciones('admin').subscribe({
      next: (data) => {
        this.notificaciones = data;
        this.cdr.detectChanges();
      },
      error: () => { this.notificaciones = []; }
    });
  }

  get noLeidas() { return this.notificaciones.filter(n => !n.leida).length; }

  marcarTodasComoLeidas() {
    this.notificacionesService.marcarTodasLeidas('admin').subscribe(() => {
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

  abrirModal() { this.showModal = true; }

  cerrarModal() {
    this.showModal = false;
    this.nuevoTitulo = '';
    this.nuevoMensaje = '';
    this.nuevoTipo = 'General';
  }

  get formularioCompleto(): boolean {
    return this.nuevoTitulo.trim() !== '' && this.nuevoMensaje.trim() !== '';
  }

  crearNotificacion() {
    if (!this.formularioCompleto) return;

    // Save to DB for the banner / client-facing notifications
    const notificacionCliente: any = {
      destinatario: this.nuevoTipo === 'Cliente' ? 'cliente' : 'general',
      tipo: this.nuevoTipo,
      titulo: this.nuevoTitulo,
      mensaje: this.nuevoMensaje,
      leida: false
    };
    this.notificacionesService.createNotificacion(notificacionCliente).subscribe();

    // Also trigger the banner
    this.notificationService.publicarNotificacion(this.nuevoTitulo, this.nuevoMensaje, this.nuevoTipo);

    this.cerrarModal();
    // Small delay to let DB save
    setTimeout(() => this.cargarNotificaciones(), 500);
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