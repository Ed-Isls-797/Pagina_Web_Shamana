import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../../services/eventos';
import { GaleriaService } from '../../../services/galeria.service';

@Component({
  selector: 'admin-contenido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-contenido.html'
})
export class AdminContenido implements OnInit {

  // --- Eventos ---
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

  // --- Galería ---
  galeriaItems: any[] = [];
  galeriaImagen = '';
  galeriaDescripcion = '';
  showModalGaleria = false;
  galeriaAEliminar: any = null;

  constructor(
    private eventosService: EventosService,
    private galeriaService: GaleriaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarEventos();
    this.cargarGaleria();
    this.route.queryParams.subscribe(params => {
      if (params['accion'] === 'nuevo') {
        this.abrirModalNuevo();
      }
    });
  }

  // ==================== EVENTOS ====================

  cargarEventos() {
    this.eventosService.obtenerEventos().subscribe(data => {
      this.eventos = data;
      this.cdr.detectChanges();
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  get formularioCompleto(): boolean {
    return this.titulo.trim() !== '' &&
      this.dj.trim() !== '' &&
      this.fecha.trim() !== '' &&
      this.hora.trim() !== '' &&
      this.imagen.trim() !== '';
  }

  guardarEvento(comoBorrador: boolean) {
    if (!comoBorrador && !this.formularioCompleto) return;

    if (this.modoEdicion && this.eventoEnEdicion) {
      const updated: any = {
        titulo: this.titulo,
        dj: this.dj,
        fecha: `${this.fecha} - ${this.hora}`,
      };
      if (this.imagen) updated.imagen = this.imagen;

      this.eventosService.actualizarEvento(this.eventoEnEdicion._id, updated).subscribe(() => {
        this.cargarEventos();
      });
    } else {
      const nuevoEvento = {
        titulo: this.titulo || 'Sin Título',
        dj: this.dj || 'Por confirmar',
        fecha: `${this.fecha} - ${this.hora}`,
        imagen: this.imagen || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
        estado: comoBorrador ? 'Borrador' : 'Publicado'
      };
      
      this.eventosService.agregarEvento(nuevoEvento).subscribe(() => {
        this.cargarEventos();
      });
    }

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
    const nuevoEstado = evento.estado === 'Publicado' ? 'Borrador' : 'Publicado';
    this.eventosService.actualizarEvento(evento._id, { estado: nuevoEstado }).subscribe(() => {
      this.cargarEventos();
    });
  }

  abrirModalEliminar(evento: any) {
    this.eventoAEliminar = evento;
  }

  cerrarModalEliminar() {
    this.eventoAEliminar = null;
  }

  confirmarEliminar() {
    if (this.eventoAEliminar) {
      this.eventosService.eliminarEvento(this.eventoAEliminar._id).subscribe(() => {
        this.cargarEventos();
        this.cerrarModalEliminar();
      });
    }
  }

  // ==================== GALERÍA ====================

  cargarGaleria() {
    this.galeriaService.getGaleria().subscribe({
      next: (data) => {
        this.galeriaItems = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading gallery', err)
    });
  }

  abrirModalGaleria() {
    this.galeriaImagen = '';
    this.galeriaDescripcion = '';
    this.showModalGaleria = true;
  }

  cerrarModalGaleria() {
    this.showModalGaleria = false;
    this.galeriaImagen = '';
    this.galeriaDescripcion = '';
  }

  onGaleriaFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.galeriaImagen = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  subirImagenGaleria() {
    if (!this.galeriaImagen) return;
    const item = {
      imagen_url: this.galeriaImagen,
      descripcion: this.galeriaDescripcion || 'Shamana Night Club'
    };
    this.galeriaService.createGaleria(item).subscribe(() => {
      this.cargarGaleria();
      this.cerrarModalGaleria();
    });
  }

  abrirModalEliminarGaleria(item: any) {
    this.galeriaAEliminar = item;
  }

  cerrarModalEliminarGaleria() {
    this.galeriaAEliminar = null;
  }

  confirmarEliminarGaleria() {
    if (this.galeriaAEliminar) {
      this.galeriaService.deleteGaleriaItem(this.galeriaAEliminar._id).subscribe(() => {
        this.cargarGaleria();
        this.cerrarModalEliminarGaleria();
      });
    }
  }

}