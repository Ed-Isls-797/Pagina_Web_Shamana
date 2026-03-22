import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notification'; 

@Component({
  selector: 'admin-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-notificaciones.html',
  styles: [`
    .toast-neutron { position: fixed; top: 30px; right: 30px; z-index: 9999999; opacity: 0; visibility: hidden; transform: translateY(-20px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .toast-neutron.show-toast { opacity: 1; visibility: visible; transform: translateY(0); }
  `]
})
export class AdminNotificaciones implements OnInit {

  notificaciones: any[] = [];
  showModal = false;
  nuevoTitulo = '';
  nuevoMensaje = '';
  nuevoTipo: 'Cliente' | 'General' = 'General'; 

  // Variables del Toast
  toastVisible = false;
  toastMensaje = '';
  toastTimeout: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() { this.cargarBuzon(); }

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.key === 'shamana_trigger_admin' || event.key === 'shamana_admin_inbox') {
      this.cargarBuzon();
    }
  }

  cargarBuzon() { this.notificaciones = this.notificationService.obtenerBuzonAdmin(); }

  get noLeidas() { return this.notificaciones.filter(n => !n.leida).length; }

  mostrarToast(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => { this.toastVisible = false; }, 3000);
  }

  marcarTodasComoLeidas() { 
    this.notificaciones.forEach(n => n.leida = true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('shamana_admin_inbox', JSON.stringify(this.notificaciones));
    }
    this.mostrarToast('[Operación de "Marcar como leídas" realizada con éxito.]');
  }

  abrirModal() { this.showModal = true; }

  cerrarModal() {
    this.showModal = false;
    this.nuevoTitulo = '';
    this.nuevoMensaje = '';
  }

  get formularioCompleto(): boolean { return this.nuevoTitulo.trim() !== '' && this.nuevoMensaje.trim() !== ''; }

  crearNotificacion() {
    if(!this.formularioCompleto) return;
    this.notificationService.publicarNotificacion(this.nuevoTitulo, this.nuevoMensaje, this.nuevoTipo);
    this.mostrarToast('[Operación de "Crear notificación flotante" realizada con éxito.]');
    this.cerrarModal();
  }
}