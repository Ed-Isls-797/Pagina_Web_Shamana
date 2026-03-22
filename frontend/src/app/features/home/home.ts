import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GaleriaService } from '../../services/galeria.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css' // 🔥 ESTA ES LA BUENA
})
export class Home {
  eventos: any[] = [];
  horarios = [
    { dia: 'Lunes', abierto: false },
    { dia: 'Martes', abierto: false },
    { dia: 'Miércoles', abierto: false },
    { dia: 'Jueves', abierto: true, apertura: '9:00 PM', cierre: '3:00 AM' },
    { dia: 'Viernes', abierto: true, apertura: '9:00 PM', cierre: '3:00 AM' },
    { dia: 'Sábado', abierto: true, apertura: '9:00 PM', cierre: '3:00 AM' },
    { dia: 'Domingo', abierto: false }
  ];

  constructor(private router: Router, private galeriaService: GaleriaService) {}

  ngOnInit() {
    this.galeriaService.getGaleria().subscribe(data => {
      this.eventos = data;
    });
  }

  irReservaciones() {
    this.router.navigate(['/login']); 
  }
}