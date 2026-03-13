import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-configuracion.html',
  styles: [`
    /* EL TOAST BLINDADO */
    .toast-neutron {
      position: fixed;
      top: 30px; /* Arriba a la derecha, para que nada lo tape */
      right: 30px;
      z-index: 9999999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px); /* Empieza un poquito arriba */
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    /* CUANDO SE ACTIVA ESTA CLASE, APARECE CON ESTILO */
    .toast-neutron.show-toast {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  `]
})
export class AdminConfiguracion {

  toastVisible = false;
  toastMensaje = '';
  toastTimeout: any;

  ubicacion = {
    direccion: 'Avenida Paseo de la Reforma 505, México City, CDMX 06500',
    latitud: '25.6866',
    longitud: '-100.3161',
    telefono: '+52 (81) 1234-5678',
    correo: 'info@shamana.club'
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
    
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    
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