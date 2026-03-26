import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'admin-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-configuracion.html',
  styles: [`
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
    
    .input-apagado {
        opacity: 0.3 !important;
        transition: all 0.3s ease;
    }
  `]
})
export class AdminConfiguracion implements OnInit {

  toastVisible = false;
  toastMensaje = '';
  toastTimeout: any;

  ubicacion = {
    direccion: 'Avenida Paseo de la Reforma 505, México City, CDMX 06500',
    latitud: '25.6866',
    longitud: '-100.3161',
  };

  horarios = [
    { dia: 'Lunes', abierto: true, apertura: '10:00', cierre: '02:00' },
    { dia: 'Martes', abierto: true, apertura: '10:00', cierre: '02:00' },
    { dia: 'Miércoles', abierto: true, apertura: '10:00', cierre: '02:00' },
    { dia: 'Jueves', abierto: true, apertura: '10:00', cierre: '04:00' },
    { dia: 'Viernes', abierto: true, apertura: '10:00', cierre: '04:00' },
    { dia: 'Sábado', abierto: true, apertura: '10:00', cierre: '04:00' },
    { dia: 'Domingo', abierto: false, apertura: '', cierre: '' } 
  ];

  mostrarToast(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  toggleDia(horario: any) {
    horario.abierto = !horario.abierto; 
  }

  guardarUbicacion() {
    this.configService.updateConfiguracion({
      direccion: this.ubicacion.direccion,
      latitud: this.ubicacion.latitud,
      longitud: this.ubicacion.longitud
    }).subscribe({
      next: () => this.mostrarToast('Ubicación actualizada correctamente.'),
      error: () => this.mostrarToast('Error al guardar la ubicación.')
    });
  }

  guardarHorarios() {
    this.configService.updateConfiguracion({
      horarios: this.horarios
    }).subscribe({
      next: () => this.mostrarToast('Horarios de operación actualizados.'),
      error: () => this.mostrarToast('Error al guardar los horarios.')
    });
  }

}