import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  standalone: true,
  templateUrl: './payments.html'
})
export class Payments {

  receipts = [
    { date: '2026-03-01', amount: 1500 },
    { date: '2026-03-05', amount: 2000 }
  ];

}