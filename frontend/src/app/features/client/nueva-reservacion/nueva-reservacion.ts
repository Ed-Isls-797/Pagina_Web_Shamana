import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { AuthService } from '../../../services/auth.service';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-nueva-reservacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-reservacion.html',
  styles: [`
    .fondo-modal {
      background: rgba(0,0,0,0.85);
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      z-index: 1050;
      backdrop-filter: blur(5px);
    }
    .card-neon-cyan {
      background-color: #0d0d0d;
      border: 1px solid #222;
      border-radius: 16px;
      width: 100%; max-width: 420px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.9);
    }

    .input-with-icon { position: relative; }
    .input-with-icon svg {
      position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
      color: #6c757d; z-index: 10;
      pointer-events: none;
    }

    .input-dark {
      background-color: #111;
      border: 1px solid #333;
      color: white;
      border-radius: 10px;
      padding: 0.8rem 1rem 0.8rem 45px;
      transition: all 0.3s;
      appearance: none;
      cursor: pointer;
    }

    .input-dark:focus {
      border-color: #0dcaf0;
      box-shadow: 0 0 12px rgba(13, 202, 240, 0.2);
      outline: none;
    }

    .input-dark option {
      background-color: #111;
      color: white;
    }

    .btn-cyan {
      background-color: #0dcaf0;
      color: #000;
      font-weight: 700;
      border: none;
      border-radius: 10px;
      padding: 0.8rem;
      transition: all 0.3s;
    }

    .btn-cyan:hover {
      box-shadow: 0 0 20px rgba(13, 202, 240, 0.5);
    }

    .btn-cancel {
      background-color: transparent;
      color: #6c757d;
      border: 1px solid #333;
      border-radius: 10px;
      padding: 0.8rem;
    }
  `]
})
export class NuevaReservacion implements OnInit {

  slotsDisponibles: any[] = [];
  slotSeleccionado: any = null;

  form = {
    nombre: '',
    slotId: '',
    personas: 1
  };

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private notificacionesService: NotificacionesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Cargar slots disponibles desde MongoDB
    this.reservationService.getSlotsDisponibles().subscribe(data => {
      this.slotsDisponibles = data;
      this.cdr.detectChanges();
    });

    // Pre-rellenar nombre del usuario logueado
    const session = this.authService.getSession();
    if (session) {
      this.form.nombre = session.nombre_completo || '';
    }
  }

  onSlotChange() {
    this.slotSeleccionado = this.slotsDisponibles.find(s => s._id === this.form.slotId) || null;
  }

  guardarReserva() {
    if (!this.form.nombre || !this.form.slotId || !this.slotSeleccionado) {
      alert('Completa todos los campos');
      return;
    }

    const session = this.authService.getSession();

    const reservacion = {
      nombre: this.form.nombre,
      usuario_id: session?._id || '',
      slot_id: this.slotSeleccionado._id,
      fecha: this.slotSeleccionado.fecha,
      hora: this.slotSeleccionado.hora,
      zona: this.slotSeleccionado.zona,
      personas: this.form.personas,
      status: 'Pendiente'
    };

    this.reservationService.createReservacion(reservacion).subscribe(() => {
      // Notificación al admin
      this.notificacionesService.createNotificacion({
        destinatario: 'admin',
        tipo: 'reserva',
        titulo: 'Nueva reservación',
        mensaje: `${this.form.nombre} ha solicitado una reservación para el ${this.slotSeleccionado.fecha} a las ${this.slotSeleccionado.hora} (${this.slotSeleccionado.zona}).`,
        leida: false
      }).subscribe();
      alert('Reservación creada exitosamente');
      this.router.navigate(['client', 'reservations']);
    });
  }

  cancelar() {
    this.router.navigate(['client', 'dashboard']);
  }
}