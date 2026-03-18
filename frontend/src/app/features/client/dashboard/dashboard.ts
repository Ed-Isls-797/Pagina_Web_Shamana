import { Component } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

// Definimos una interfaz para estructurar los datos correctamente
export interface ActivityRecord {
  id: number;
  message: string;
  date: Date;
  type: 'success' | 'info' | 'warning'; 
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  // Importamos DatePipe para formatear la fecha y NgClass para los colores dinámicos
  imports: [DatePipe, NgClass], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css' // (Opcional) Si guardaste el CSS en un archivo aparte
})
export class Dashboard {

  activeReservations = 2;
  pendingMessages = 1;
  uploadedPayments = 3;

  // Ahora es un arreglo de objetos, mucho más realista y manipulable
  recentActivity: ActivityRecord[] = [
    { 
      id: 1, 
      message: 'Reservación para sábado confirmada', 
      date: new Date(), // En la vida real, esto viene de tu API
      type: 'success' 
    },
    { 
      id: 2, 
      message: 'Mensaje enviado al administrador', 
      date: new Date(new Date().setDate(new Date().getDate() - 1)), // Ayer
      type: 'warning' 
    },
    { 
      id: 3, 
      message: 'Comprobante de pago subido correctamente', 
      date: new Date(new Date().setDate(new Date().getDate() - 2)), // Antier
      type: 'info' 
    }
  ];
}