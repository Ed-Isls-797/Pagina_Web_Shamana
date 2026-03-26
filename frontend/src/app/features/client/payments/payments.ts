import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.html',
  styles: [`
    .upload-box {
      border: 2px dashed #333;
      background-color: #0a0a0a;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .upload-box:hover {
      border-color: #0dcaf0;
      box-shadow: 0 0 20px rgba(13, 202, 240, 0.1) inset;
      background-color: #111;
    }
    .icon-circle {
      width: 65px; height: 65px;
      border-radius: 50%;
      background-color: rgba(13, 202, 240, 0.1);
      color: #0dcaf0;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.3s ease;
    }
    .upload-box:hover .icon-circle {
      transform: translateY(-5px);
      background-color: rgba(13, 202, 240, 0.2);
    }
    .btn-cyan {
      background-color: #0dcaf0; color: #000; font-weight: 700; border: none;
      border-radius: 8px; padding: 0.6rem 1.5rem; transition: all 0.3s;
    }
    .btn-cyan:hover {
      box-shadow: 0 0 15px rgba(13, 202, 240, 0.6); transform: translateY(-1px);
    }
    .icon-file-bg {
      width: 45px; height: 45px;
      background-color: rgba(13, 202, 240, 0.05);
      color: #0dcaf0;
      border: 1px solid rgba(13, 202, 240, 0.2);
    }
    .hover-bg { transition: background-color 0.2s; }
    .hover-bg:hover { background-color: #1a1a1a !important; }
    .toast-neutron {
      position: fixed; top: 30px; right: 30px; z-index: 9999999;
      opacity: 0; visibility: hidden; transform: translateY(-20px);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .toast-neutron.show-toast { opacity: 1; visibility: visible; transform: translateY(0); }
  `]
})
export class Payments implements OnInit { 

  reservaciones: any[] = [];
  toastVisible = false;
  toastMensaje = '';

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getReservaciones().subscribe(reservaciones => {
      this.reservaciones = reservaciones;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.mostrarToast(`¡Archivo "${file.name}" subido correctamente!`);
  }

  mostrarToast(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    setTimeout(() => { this.toastVisible = false; }, 3500);
  }
}