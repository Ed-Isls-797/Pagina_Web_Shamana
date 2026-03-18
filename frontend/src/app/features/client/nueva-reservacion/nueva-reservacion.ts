import { Component, OnInit } from '@angular/core'; // <-- Asegúrate de importar OnInit
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-reservacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nueva-reservacion.html'
})
export class NuevaReservacion implements OnInit { // <-- Agrega implements OnInit

  reserva = {
    nombre: '',
    date: '',
    people: 1,
    zona: 'General',
    status: 'Pendiente'
  };

  // Aquí guardaremos las fechas calculadas
  fechasDisponibles: { valor: string, texto: string }[] = [];

  constructor(
    private reservationService: ReservationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.generarFechas();
  }

  // 🔥 MAGIA: Genera los próximos Jueves, Viernes y Sábados
  generarFechas() {
    let fechaActual = new Date();
    
    // Revisamos los próximos 30 días
    for (let i = 0; i < 30; i++) {
      const diaSemana = fechaActual.getDay();
      
      // 4 = Jueves, 5 = Viernes, 6 = Sábado
      if (diaSemana === 4 || diaSemana === 5 || diaSemana === 6) {
        const valor = fechaActual.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
        
        // Lo ponemos bonito para el cliente (Ej: "Jueves, 20 de marzo")
        const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        let texto = fechaActual.toLocaleDateString('es-MX', opciones);
        texto = texto.charAt(0).toUpperCase() + texto.slice(1); // Mayúscula inicial

        this.fechasDisponibles.push({ valor, texto });
      }
      
      // Avanzamos al día siguiente
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    // Seleccionamos la primera fecha disponible por defecto
    if (this.fechasDisponibles.length > 0) {
      this.reserva.date = this.fechasDisponibles[0].valor;
    }
  }

  guardarReserva() {
    if (!this.reserva.nombre || !this.reserva.date) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }

    // Como ya solo pueden elegir días válidos, quitamos la validación de error anterior
    const reservaFinal = {
      ...this.reserva,
      fecha: this.reserva.date 
    };

    this.reservationService.addReservation(reservaFinal);
    alert('¡Reservación creada con éxito!');
    this.router.navigate(['/client/reservations']); 
  }
}