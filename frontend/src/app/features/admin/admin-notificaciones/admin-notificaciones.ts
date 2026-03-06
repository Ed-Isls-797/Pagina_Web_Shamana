import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'admin-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-notificaciones.html'
})
export class AdminNotificaciones {

  titulo = ''
  mensaje = ''

  notificaciones:any[] = []

  crearNotificacion(){

    if(!this.titulo || !this.mensaje) return

    this.notificaciones.push({
      titulo:this.titulo,
      mensaje:this.mensaje
    })

    this.titulo = ''
    this.mensaje = ''

  }

}