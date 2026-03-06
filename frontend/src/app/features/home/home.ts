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

  eventos:any[] = []

  constructor(private eventosService:EventosService){
    this.eventos = this.eventosService.obtenerEventos()
  }

}