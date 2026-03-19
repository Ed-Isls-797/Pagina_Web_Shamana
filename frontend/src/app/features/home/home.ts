import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventosService } from '../../services/eventos'
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class Home {

  eventos = [
  {
    titulo: 'Neon Dreams',
    artista: 'DJ Snake',
    fecha: 'Vie, 24 Oct',
    imagen: 'assets/event1.jpg'
  },
  {
    titulo: 'Techno Bunker',
    artista: 'Charlotte de Witte',
    fecha: 'Sab, 25 Oct',
    imagen: 'assets/event2.jpg'
  },
  {
    titulo: 'Retro Wave',
    artista: 'Kavinsky',
    fecha: 'Dom, 26 Oct',
    imagen: 'assets/event3.jpg'
  }
  
];
horarios = [
    { dia: 'Lunes', abierto: true, apertura: '10:00 PM', cierre: '02:00 AM' },
    { dia: 'Martes', abierto: true, apertura: '10:00 PM', cierre: '02:00 AM' },
    { dia: 'Miércoles', abierto: true, apertura: '10:00 PM', cierre: '02:00 AM' },
    { dia: 'Jueves', abierto: true, apertura: '10:00 PM', cierre: '04:00 AM' },
    { dia: 'Viernes', abierto: true, apertura: '10:00 PM', cierre: '04:00 AM' },
    { dia: 'Sábado', abierto: true, apertura: '10:00 PM', cierre: '04:00 AM' },
    { dia: 'Domingo', abierto: false, apertura: '', cierre: '' } 
  ];

  constructor(private eventosService:EventosService, private router: Router){
    this.eventos = this.eventosService.obtenerEventos()
  }

  irReservaciones() {
    this.router.navigate(['/client/reservations']);
  }

}
