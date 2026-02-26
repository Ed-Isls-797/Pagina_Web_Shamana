import { Component } from '@angular/core';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  templateUrl: './dashboard.html'
})
export class Dashboard {

  activeReservations = 2;
  pendingMessages = 1;
  uploadedPayments = 3;

  recentActivity = [
    'Reservación para sábado confirmada',
    'Mensaje enviado al administrador',
    'Comprobante de pago subido correctamente'
  ];
}