import { Component } from '@angular/core';

@Component({
  selector: 'app-reservations',
  standalone: true,
  templateUrl: './reservations.html'
})
export class Reservations {

  reservations = [
    { date: '2026-04-10', people: 4, status: 'Confirmada' },
    { date: '2026-04-15', people: 2, status: 'Pendiente' }
  ];

}