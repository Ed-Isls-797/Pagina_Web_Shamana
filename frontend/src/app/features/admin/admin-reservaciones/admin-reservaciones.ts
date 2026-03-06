import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservaciones.html'
})
export class AdminReservaciones {

  reservaciones = [
    {
      cliente: 'Juan Pérez',
      actividad: 'Mesa VIP',
      fecha: '2026-04-12',
      hora: '22:00',
      estado: 'Pendiente'
    },
    {
      cliente: 'Ana López',
      actividad: 'Cumpleaños',
      fecha: '2026-04-15',
      hora: '23:00',
      estado: 'Pendiente'
    }
  ]

  aprobarReservacion(reservacion:any){
    reservacion.estado = "Aprobada"
  }

  rechazarReservacion(reservacion:any){
    reservacion.estado = "Rechazada"
  }

}