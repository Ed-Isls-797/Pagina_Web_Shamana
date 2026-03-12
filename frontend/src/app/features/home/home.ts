import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventosService } from '../../services/eventos'

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

  constructor(private eventosService:EventosService){
    this.eventos = this.eventosService.obtenerEventos()
  }

}
