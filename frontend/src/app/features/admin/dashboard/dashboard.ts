import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './dashboard.html'
})
export class Dashboard {

  totalReservations = 25;
  pendingRequests = 5;
  totalUsers = 120;
}