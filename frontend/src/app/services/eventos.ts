import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  eventos:any[] = [
    {
      titulo: 'Fiesta Electrónica',
      imagen: 'https://www.dondeir.com/wp-content/uploads/2017/11/5-festivales-de-musica-electronica-01.jpg',
      descripcion: 'DJ invitado internacional este sábado'
    }
  ]

  obtenerEventos(){
    return this.eventos
  }

  agregarEvento(evento:any){
    this.eventos.push(evento)
  }

}