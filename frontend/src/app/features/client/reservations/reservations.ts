import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { ComprobantesService } from '../../../services/comprobantes.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './reservations.html'
})
export class Reservations implements OnInit {

  reservations: any[] = [];
  comprobantesMap: { [reservacionId: string]: boolean } = {};

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private comprobantesService: ComprobantesService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const session = this.authService.getSession();
    if (session?._id) {
      this.reservationService.getReservaciones().subscribe(data => {
        this.reservations = data
          .filter(r => r.usuario_id === session._id)
          .reverse();
        this.cdr.detectChanges();
        this.cargarComprobantes(session._id);
      });
    }
  }

  cargarComprobantes(usuarioId: string) {
    this.comprobantesService.getComprobantesByUsuario(usuarioId).subscribe(comprobantes => {
      this.comprobantesMap = {};
      comprobantes.forEach(c => {
        this.comprobantesMap[c.reservacion_id] = true;
      });
      this.cdr.detectChanges();
    });
  }

  tieneComprobante(reservacionId: string): boolean {
    return !!this.comprobantesMap[reservacionId];
  }

  irComprobantes(reservacionId: string) {
    this.router.navigate(['/client/payments'], { queryParams: { reservacion: reservacionId } });
  }

  irNuevaReserva() {
    this.router.navigate(['/client/nueva-reservacion']);
  }

}