import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventosService } from '../../../services/eventos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-contenido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-contenido.html'
})
export class AdminContenido {

  titulo = '';
  dj = '';
  fecha = '';
  hora = '';
  imagen = '';

  showModalNuevo = false;
  modoEdicion = false;
  eventoEnEdicion: any = null;

  eventoAEliminar: any = null;
  eventos: any[] = [];

 // constructor(private eventosService: EventosService) {
    //this.eventos = this.eventosService.obtenerEventos();
  //}

constructor(private eventosService: EventosService, private route: ActivatedRoute) {
    this.eventos = this.eventosService.obtenerEventos();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['accion'] === 'nuevo') {
        this.abrirModalNuevo();
      }
    });
  }

  abrirModalNuevo() {
    this.modoEdicion = false;
    this.limpiarFormulario();
    this.showModalNuevo = true;
  }

  abrirModalEditar(evento: any) {
    this.modoEdicion = true;
    this.eventoEnEdicion = evento;

    this.titulo = evento.titulo || '';
    this.dj = evento.dj || '';
    this.imagen = evento.imagen || '';

    if (evento.fecha) {
      const partes = evento.fecha.split(' - ');
      this.fecha = partes[0] || '';
      this.hora = partes[1] || '';
    }

    this.showModalNuevo = true;
  }

  cerrarModalNuevo() {
    this.showModalNuevo = false;
    this.eventoEnEdicion = null;
    this.limpiarFormulario();
  }

  get formularioCompleto(): boolean {
    return this.titulo.trim() !== '' &&
      this.dj.trim() !== '' &&
      this.fecha.trim() !== '' &&
      this.hora.trim() !== '';
  }

  guardarEvento(comoBorrador: boolean) {
    if (!comoBorrador && !this.formularioCompleto) return;

    if (this.modoEdicion && this.eventoEnEdicion) {
      this.eventoEnEdicion.titulo = this.titulo;
      this.eventoEnEdicion.dj = this.dj;
      this.eventoEnEdicion.fecha = `${this.fecha} - ${this.hora}`;
      if (this.imagen) this.eventoEnEdicion.imagen = this.imagen;

    } else {
      const nuevoEvento = {
        id: Date.now(),
        titulo: this.titulo || 'Sin Título',
        dj: this.dj || 'Por confirmar',
        fecha: `${this.fecha} - ${this.hora}`,
        imagen: this.imagen || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
        estado: comoBorrador ? 'Borrador' : 'Publicado'
      };
      this.eventosService.agregarEvento(nuevoEvento);
    }

    this.eventos = this.eventosService.obtenerEventos();
    this.cerrarModalNuevo();
  }

  limpiarFormulario() {
    this.titulo = '';
    this.dj = '';
    this.fecha = '';
    this.hora = '';
    this.imagen = '';
  }
  togglePublicacion(evento: any) {
    evento.estado = evento.estado === 'Publicado' ? 'Borrador' : 'Publicado';
  }

  abrirModalEliminar(evento: any) {
    this.eventoAEliminar = evento;
  }

  cerrarModalEliminar() {
    this.eventoAEliminar = null;
  }

  confirmarEliminar() {
    if (this.eventoAEliminar) {
      this.eventos = this.eventos.filter(e => e !== this.eventoAEliminar);
      this.cerrarModalEliminar();
    }
  }

}