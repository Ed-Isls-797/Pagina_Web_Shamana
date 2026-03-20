import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../services/reservation.service';
import { NotificationService } from '../../../services/notification';

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservaciones.html',
  styles: [`
    /* --- ESTRUCTURA GENERAL Y TABLA --- */
    .admin-container { padding: 2rem 3rem; background: #000; min-height: 100vh; }
    .header-title h2 { font-weight: 700; color: #fff; margin-bottom: 0.2rem; font-size: 1.8rem; }
    .header-title p { color: #888; font-size: 0.9rem; margin-bottom: 2rem; }

    .table-wrapper {
      background-color: #1a1a1c; /* El gris oscuro elegante de tu foto */
      border-radius: 12px;
      border: 1px solid #2a2a2c;
      overflow: hidden; 
    }

    .custom-table { width: 100%; border-collapse: collapse; }
    .custom-table th {
      text-align: left;
      padding: 1.2rem;
      color: #888;
      font-size: 0.75rem;
      text-transform: uppercase;
      border-bottom: 1px solid #2a2a2c;
      font-weight: 600;
    }
    .custom-table .text-center { text-align: center; }
    .custom-table .text-end { text-align: right; }
    
    .custom-table td {
      padding: 1.2rem;
      border-bottom: 1px solid #2a2a2c;
      vertical-align: middle;
    }
    .custom-table tr:last-child td { border-bottom: none; }
    .custom-table tr:hover { background-color: rgba(255, 255, 255, 0.02); }

    /* --- TEXTOS DE LAS FILAS --- */
    .client-name { font-weight: 700; font-size: 0.95rem; color: #fff; }
    .details-primary { font-weight: 600; font-size: 0.9rem; color: #fff; }
    .details-secondary { color: #888; font-size: 0.8rem; margin-top: 0.2rem; }
    .zona-text { color: #ffc107; font-weight: 700; font-size: 0.95rem; }

    /* --- BADGES (ETIQUETAS PÍLDORA) --- */
    .badge {
      padding: 0.35rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      display: inline-block;
      background: transparent;
    }
    .b-pendiente { color: #ffc107; border: 1px solid #ffc107; }
    .b-confirmado { color: #20c997; border: 1px solid #20c997; }
    .b-rechazado { color: #dc3545; border: 1px solid #dc3545; }
    .b-aceptado { color: #0dcaf0; border: 1px solid #0dcaf0; }
    .b-esperando { color: #ffc107; border: 1px dashed #ffc107; }

    /* --- BOTONES DE ACCIÓN (PÍLDORAS) --- */
    .btn-action {
      background: transparent;
      border-radius: 20px;
      padding: 0.35rem 0.9rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      margin-left: 0.5rem;
    }
    .btn-action:hover { transform: translateY(-1px); opacity: 0.8; }
    
    .btn-yellow { color: #ffc107; border: 1px solid #ffc107; }
    .btn-green { color: #20c997; border: 1px solid #20c997; }
    .btn-red { color: #dc3545; border: 1px solid #dc3545; }

    /* --- TOAST --- */
    .toast-neutron { position: fixed; top: 30px; right: 30px; z-index: 9999; opacity: 0; visibility: hidden; transform: translateY(-20px); transition: all 0.4s; }
    .show-toast { opacity: 1; visibility: visible; transform: translateY(0); }
    .toast-content { display: flex; align-items: center; background: #000; border: 1px solid #ffc107; padding: 0.5rem 1rem; border-radius: 12px; color: #fff; font-weight: bold; font-size: 0.85rem;}
    .toast-icon { background: #ffc107; color: #000; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; border-radius: 50%; margin-right: 10px; font-size: 0.7rem; }
  `]
})
export class AdminReservaciones implements OnInit {
  reservaciones: any[] = [];
  toastVisible = false; toastMensaje = '';

  constructor(private resService: ReservationService, private notiService: NotificationService) {}

  ngOnInit() { this.cargar(); }

  @HostListener('window:storage')
  cargar() { this.reservaciones = this.resService.getReservations().slice().reverse(); }

  aceptarReserva(r: any) {
    this.resService.updateStatus(r.id, 'Aceptado');
    this.cargar();
    this.mostrarToast('Reserva Aceptada');
  }

  rechazarReserva(r: any) {
    this.resService.updateStatus(r.id, 'Rechazado');
    this.cargar();
    this.mostrarToast('Reserva Rechazada');
  }

  solicitarPago(r: any) {
    this.resService.updateStatus(r.id, 'Esperando Pago');
    this.cargar();
    this.notiService.publicarNotificacion('💳 Pago Requerido', 'Tu reserva ha sido aprobada. Por favor, sube tu comprobante.', 'Cliente');
    this.mostrarToast('Se solicitó el comprobante al cliente');
  }

  verPago(r: any, accion: string) {
    const estado = accion === 'Aprobar' ? 'Confirmado' : 'Rechazado';
    this.resService.updateStatus(r.id, estado);
    this.cargar();
    this.mostrarToast(`Pago ${accion.toLowerCase()}ado`);
  }

  mostrarToast(m: string) {
    this.toastMensaje = m; this.toastVisible = true;
    setTimeout(() => { this.toastVisible = false; }, 3000);
  }
}