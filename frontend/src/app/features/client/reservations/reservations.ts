import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './reservations.html'
})
export class Reservations {

  reservations: any[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.reservations = this.reservationService.getReservations();
  }

  irNuevaReserva() {
    this.router.navigate(['/client/nueva-reservacion']);
  }

}