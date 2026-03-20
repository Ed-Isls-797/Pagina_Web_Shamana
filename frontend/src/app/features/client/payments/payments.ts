import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.html',
  styles: [`
    /* Borde punteado azul neón */
    .upload-box {
      border: 2px dashed rgba(13, 202, 240, 0.3);
      border-radius: 16px;
      padding: 4rem 2rem;
      background-color: rgba(13, 202, 240, 0.02);
      transition: all 0.3s ease;
    }
    .upload-box:hover {
      background-color: rgba(13, 202, 240, 0.05);
      border-color: rgba(13, 202, 240, 0.6);
    }
    
    /* Círculo con el icono adentro */
    .upload-icon-container {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: rgba(13, 202, 240, 0.1);
      border: 1px solid rgba(13, 202, 240, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    /* Brillo del icono */
    .text-cyan-neon {
      color: #0dcaf0 !important;
      filter: drop-shadow(0 0 8px rgba(13, 202, 240, 0.6));
    }
    
    /* Botón azul neón */
    .btn-cyan-neon {
      background-color: #0dcaf0;
      color: #000;
      font-weight: 700;
      padding: 10px 24px;
      border-radius: 8px;
      border: none;
      box-shadow: 0 0 15px rgba(13, 202, 240, 0.3);
      transition: all 0.3s;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .btn-cyan-neon:hover {
      background-color: #00bce4;
      box-shadow: 0 0 25px rgba(13, 202, 240, 0.6);
      transform: translateY(-2px);
    }

    /* Tarjetas del Historial */
    .history-card {
      background-color: #111;
      border-radius: 12px;
      border: 1px solid #222;
      transition: border-color 0.2s;
    }
    .history-card:hover {
      border-color: #333;
    }

    /* Cuadrito del icono de archivo */
    .file-icon {
      width: 48px;
      height: 48px;
      background-color: rgba(13, 202, 240, 0.1);
      color: #0dcaf0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Badges de estado (Aprobado / Pendiente) */
    .badge-status {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
    }
    .status-aprobado {
      color: #20c997;
      border: 1px solid rgba(32, 201, 151, 0.3);
      background: rgba(32, 201, 151, 0.1);
    }
    .status-pendiente {
      color: #ffc107;
      border: 1px solid rgba(255, 193, 7, 0.3);
      background: rgba(255, 193, 7, 0.1);
    }

    /* Toast */
    .toast-neutron { position: fixed; top: 30px; right: 30px; z-index: 9999; opacity: 0; visibility: hidden; transform: translateY(-20px); transition: all 0.4s; }
    .show-toast { opacity: 1; visibility: visible; transform: translateY(0); }
    .toast-content { display: flex; align-items: center; background: #000; border: 1px solid #0dcaf0; padding: 0.5rem 1rem; border-radius: 12px; color: #fff; font-weight: bold; font-size: 0.85rem;}
    .toast-icon { background: #0dcaf0; color: #000; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; border-radius: 50%; margin-right: 10px; font-size: 0.7rem; }
  `]
})
export class Payments {
  toastVisible = false;
  toastMensaje = '';
  
  // Te puse un par de datos falsos para que veas el diseño como en tu foto.
  // Cuando subas uno nuevo con el botón, se va a poner arriba.
  historial: any[] = [
    { nombre: 'recibo_oct_12.jpg', descripcion: 'Neon Dreams - Mesa VIP', fecha: new Date('2026-10-12'), size: '1.2 MB', estado: 'Aprobado' },
    { nombre: 'recibo_nov_01.pdf', descripcion: 'Techno Bunker - Mesa VIP', fecha: new Date('2026-11-01'), size: '0.8 MB', estado: 'Pendiente' }
  ];

  constructor(private notificationService: NotificationService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // 1. Lo agregamos a la lista visual
      this.historial.unshift({ 
        nombre: file.name, 
        descripcion: 'Reserva General',
        fecha: new Date(), 
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB', // Convierte a Megabytes
        estado: 'Enviado' 
      });
      
      // 2. Le avisamos al admin
      this.notificationService.enviarNotificacionAdmin('Pago', `El cliente subió un comprobante: ${file.name}`, 'pago', file.name);
      
      // 3. Mostramos la notificación azul
      this.toastMensaje = 'Comprobante subido con éxito';
      this.toastVisible = true;
      setTimeout(() => { this.toastVisible = false; }, 3000);
    }
  }
}