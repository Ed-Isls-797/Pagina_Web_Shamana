import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class Home {

  eventos = [
    {
      imagen: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fecha: 'Viernes, 24 de Octubre',
      titulo: 'Neon Party',
      artista: 'DJ Tiesto'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fecha: 'Sábado, 25 de Octubre',
      titulo: 'Techno Night',
      artista: 'Charlotte de Witte'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fecha: 'Viernes, 31 de Octubre',
      titulo: 'Halloween Bash',
      artista: 'Martin Garrix'
    }
  ];

  horarios = [
    { dia: 'Lunes', abierto: false },
    { dia: 'Martes', abierto: false },
    { dia: 'Miércoles', abierto: false },
    { dia: 'Jueves', abierto: true, apertura: '9:00 PM', cierre: '3:00 AM' },
    { dia: 'Viernes', abierto: true, apertura: '9:00 PM', cierre: '3:00 AM' },
    { dia: 'Sábado', abierto: true, apertura: '9:00 PM', cierre: '3:00 AM' },
    { dia: 'Domingo', abierto: false }
  ];

  constructor(private router: Router) {}

  irReservaciones() {
    this.router.navigate(['/login']); 
  }

}