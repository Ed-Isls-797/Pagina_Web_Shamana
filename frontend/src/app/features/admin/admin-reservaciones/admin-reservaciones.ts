import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './admin-reservaciones.html'
})
export class AdminReservaciones {

  searchTerm: string = '';

  reservaciones = [
    { id: 1, cliente: 'Juan Pérez', email: 'juan@email.com', evento: 'Neon Dreams', fecha: 'Oct 21, 2026 - 10:00 PM', mesa: 'Booth VIP 1', personas: 4, estado: 'Pendiente' },
    { id: 2, cliente: 'María García', email: 'maria@email.com', evento: 'Techno Bunker', fecha: 'Oct 22, 2026 - 10:30 PM', mesa: 'Booth VIP 2', personas: 2, estado: 'Confirmado' },
    { id: 3, cliente: 'Carlos López', email: 'carlos@email.com', evento: 'Retro Wave', fecha: 'Oct 23, 2026 - 11:00 PM', mesa: 'Booth VIP 3', personas: 6, estado: 'Confirmado' },
    { id: 4, cliente: 'Ana Martínez', email: 'ana@email.com', evento: 'Neon Dreams', fecha: 'Oct 24, 2026 - 10:00 PM', mesa: 'Booth VIP 4', personas: 3, estado: 'Confirmado' },
    { id: 5, cliente: 'Luis Torres', email: 'luis@email.com', evento: 'Techno Bunker', fecha: 'Oct 25, 2026 - 09:30 PM', mesa: 'Mesa General', personas: 5, estado: 'Pendiente' },
    { id: 6, cliente: 'Sofia Ruiz', email: 'sofia@email.com', evento: 'Retro Wave', fecha: 'Oct 31, 2026 - 10:00 PM', mesa: 'Booth VIP 1', personas: 2, estado: 'Pendiente' }
  ];

  get reservasFiltradas() {
    return this.reservaciones.filter(res => 
      res.cliente.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      res.evento.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      res.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  aprobarReservacion(id: number) {
    const reserva = this.reservaciones.find(r => r.id === id);
    if(reserva) reserva.estado = 'Confirmado';
  }

  rechazarReservacion(id: number) {
    this.reservaciones = this.reservaciones.filter(r => r.id !== id);
  }
}