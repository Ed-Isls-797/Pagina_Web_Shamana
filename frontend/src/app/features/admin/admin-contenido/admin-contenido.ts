import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { EventosService } from '../../../services/eventos'

@Component({
  selector: 'admin-contenido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-contenido.html'
})
export class AdminContenido {

  titulo = ''
  imagen = ''
  descripcion = ''

  eventos:any[] = []

  constructor(private eventosService:EventosService){
    this.eventos = this.eventosService.obtenerEventos()
  }

  agregarEvento(){

    if(!this.titulo || !this.imagen || !this.descripcion) return

    const nuevoEvento = {
      titulo:this.titulo,
      imagen:this.imagen,
      descripcion:this.descripcion
    }

    this.eventosService.agregarEvento(nuevoEvento)

    this.titulo = ''
    this.imagen = ''
    this.descripcion = ''

  }

}