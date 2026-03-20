import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './reservations.html'
})
export class Reservations implements OnInit {
  reservations: any[] = [];
  constructor(private router: Router, private resService: ReservationService) {}
  ngOnInit() { this.cargar(); }
  @HostListener('window:storage')
  cargar() { this.reservations = this.resService.getReservations().slice().reverse(); }
  irNuevaReserva() { this.router.navigate(['/client/nueva-reservacion']); }
}