import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'admin-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-mensajes.html'
})
export class AdminMensajes {

  mensajes = [
    { usuario: 'Cliente', texto: 'Hola, quiero reservar una mesa.' },
    { usuario: 'Admin', texto: 'Claro, ¿para qué fecha?' }
  ]

  nuevoMensaje = ''

  enviarMensaje(){

    if(this.nuevoMensaje.trim() === '') return

    this.mensajes.push({
      usuario:'Admin',
      texto:this.nuevoMensaje
    })

    this.nuevoMensaje = ''

  }

}