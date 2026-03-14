import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservaciones.html',
  styles: [`
    /* EL TOAST NEUTRÓN VIP */
    .toast-neutron {
      position: fixed;
      top: 30px;
      right: 30px;
      z-index: 9999999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .toast-neutron.show-toast {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    /* Efecto hover para la imagen del comprobante */
    .comprobante-img {
      transition: transform 0.3s ease;
      cursor: zoom-in;
    }
    .comprobante-img:hover {
      transform: scale(1.02);
    }
  `]
})
export class AdminReservaciones {

  // Base de datos falsa de reservaciones
  reservaciones = [
    { 
      id: 1, 
      cliente: 'Juan Pérez', 
      fecha: '24 Oct 2026', 
      mesa: 'Booth VIP 1', 
      estado: 'Pendiente', 
      monto: '$1,500 MXN',
      comprobante: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENukelP8EWH4umIhxxN0_Tfn3tlxDrbzIQA&s' 
    },
    { 
      id: 2, 
      cliente: 'María García', 
      fecha: '24 Oct 2026', 
      mesa: 'Mesa General 3', 
      estado: 'Confirmado', 
      monto: '$800 MXN',
      comprobante: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 3, 
      cliente: 'Carlos López', 
      fecha: '25 Oct 2026', 
      mesa: 'Booth VIP 2', 
      estado: 'Pendiente', 
      monto: '$2,000 MXN',
      comprobante: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 4, 
      cliente: 'Ana Martínez', 
      fecha: '31 Oct 2026', 
      mesa: 'Barra', 
      estado: 'Rechazado', 
      monto: '$500 MXN',
      comprobante: null 
    }
  ];

  reservaSeleccionada: any = null;
  showModal = false;

  toastVisible = false;
  toastMensaje = '';
  toastTipo = 'success'; 
  toastTimeout: any;

  abrirModal(reserva: any) {
    this.reservaSeleccionada = reserva;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    setTimeout(() => this.reservaSeleccionada = null, 300);
  }

  aprobarPago() {
    if (this.reservaSeleccionada) {
      this.reservaSeleccionada.estado = 'Confirmado';
      this.mostrarToast('Pago aprobado. Reservación confirmada.', 'success');
      this.cerrarModal();
    }
  }

  rechazarPago() {
    if (this.reservaSeleccionada) {
      this.reservaSeleccionada.estado = 'Rechazado';
      this.mostrarToast('Pago rechazado. Se notificará al cliente.', 'danger');
      this.cerrarModal();
    }
  }

  // --- EL TOAST NEUTRÓN ---
  mostrarToast(mensaje: string, tipo: 'success' | 'danger') {
    this.toastMensaje = mensaje;
    this.toastTipo = tipo;
    this.toastVisible = true;
    
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

}