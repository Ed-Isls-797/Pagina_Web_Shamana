import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventosService } from '../../services/eventos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css' // 🔥 ESTA ES LA BUENA
})
export class Home implements OnInit {

  // 🔹 EVENTOS
  eventos: any[] = []

  // 🔹 GALERÍA
  galeria: string[] = [
    'https://images.unsplash.com/photo-1571266028243-d220c9c3b8a1',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'
  ]

  // 🔹 HORARIOS
  horarios = [
    { dia: 'Lunes', abierto: true, apertura: '10:00 PM', cierre: '02:00 AM' },
    { dia: 'Martes', abierto: true, apertura: '10:00 PM', cierre: '02:00 AM' },
    { dia: 'Miércoles', abierto: true, apertura: '10:00 PM', cierre: '02:00 AM' },
    { dia: 'Jueves', abierto: true, apertura: '10:00 PM', cierre: '04:00 AM' },
    { dia: 'Viernes', abierto: true, apertura: '10:00 PM', cierre: '04:00 AM' },
    { dia: 'Sábado', abierto: true, apertura: '10:00 PM', cierre: '04:00 AM' },
    { dia: 'Domingo', abierto: false, apertura: '', cierre: '' }
  ]

  // 🔥 UI STATES
  loading: boolean = true
  hoverIndex: number | null = null

  constructor(
    private eventosService: EventosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEventos()
  }

  cargarEventos(): void {
    try {
      this.eventos = this.eventosService.obtenerEventos()
    } catch (error) {
      console.error('Error cargando eventos', error)
    } finally {
      this.loading = false
    }
  }

  irLogin(): void {
    this.router.navigate(['/login']);
  }

  irReservaciones(): void {
    console.log('Navegando a reservaciones');
    this.router.navigate(['/login']);
  }

  irRegistro(): void {
    this.router.navigate(['/register']);
  }

  trackByEvento(index: number, item: any): number {
    return index
  }
}