import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common'; // <-- IMPORTANTE para los colores dinámicos

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './reservations.html'
})
export class Reservations implements OnInit {

  reservations: any[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe(res => {
      this.reservations = res.reverse();
    });
  }

  irNuevaReserva() {
    this.router.navigate(['/client/nueva-reservacion']);
  }

}