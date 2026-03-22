import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
export class AdminConfiguracion {

  toastVisible = false;
  toastMensaje = '';
  toastTimeout: any;

  ubicacion = {
    direccion: 'Zona Plateada, 42084 Pachuca de Soto, Hgo.',
    latitud: '20.096944035139188',
    longitud: '-98.77238250900248',
  };

  horarios = [
    { dia: 'Lunes', abierto: false, apertura: '', cierre: '' },
    { dia: 'Martes', abierto: false, apertura: '', cierre: '' },
    { dia: 'Miércoles', abierto: false, apertura: '', cierre: '' },
    { dia: 'Jueves', abierto: true, apertura: '21:00', cierre: '03:00' },
    { dia: 'Viernes', abierto: true, apertura: '21:00', cierre: '03:00' },
    { dia: 'Sábado', abierto: true, apertura: '21:00', cierre: '03:00' },
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
    this.mostrarToast('Ubicación actualizada correctamente.');
  }

  guardarHorarios() {
    this.mostrarToast('Horarios de operación actualizados.');
  }

}