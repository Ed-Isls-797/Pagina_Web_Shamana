import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { ComprobantesService } from '../../../services/comprobantes.service';
import { AuthService } from '../../../services/auth.service';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.html',
  styleUrls: ['./payments.css']
})
export class Payments implements OnInit {

  reservacionesAceptadas: any[] = [];
  comprobantesMap: { [reservacionId: string]: any } = {};

  // Modal ver comprobante
  comprobanteActivo: any = null;
  showModalVer = false;

  // Toast
  toastVisible = false;
  toastMensaje = '';
  toastTimeout: any;

  // Para highlight de reservacion desde query param
  reservacionHighlight: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private comprobantesService: ComprobantesService,
    private authService: AuthService,
    private notificacionesService: NotificacionesService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  triggerFileInput(reservacionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById('file-' + reservacionId) as HTMLInputElement;
      if (el) el.click();
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reservacionHighlight = params['reservacion'] || null;
    });
    this.cargarDatos();
  }

  cargarDatos() {
    const session = this.authService.getSession();
    if (!session?._id) return;

    this.reservationService.getReservaciones().subscribe(data => {
      this.reservacionesAceptadas = data
        .filter(r => r.usuario_id === session._id && r.status === 'Aceptado')
        .reverse();
      this.cdr.detectChanges();

      // Load comprobantes for this user
      this.comprobantesService.getComprobantesByUsuario(session._id).subscribe(comprobantes => {
        this.comprobantesMap = {};
        comprobantes.forEach(c => {
          this.comprobantesMap[c.reservacion_id] = c;
        });
        this.cdr.detectChanges();
      });
    });
  }

  tieneComprobante(reservacionId: string): boolean {
    return !!this.comprobantesMap[reservacionId];
  }

  getComprobante(reservacionId: string): any {
    return this.comprobantesMap[reservacionId] || null;
  }

  onFileSelected(event: Event, reservacion: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64 = e.target.result;
      const session = this.authService.getSession();

      const comprobante = {
        reservacion_id: reservacion._id,
        usuario_id: session._id,
        archivo_url: base64,
        nombre_archivo: file.name,
        fecha_carga: new Date().toISOString()
      };

      this.comprobantesService.createComprobante(comprobante).subscribe(() => {
        this.mostrarToast(`Comprobante "${file.name}" cargado correctamente`);
        // Notificación al admin
        this.notificacionesService.createNotificacion({
          destinatario: 'admin',
          tipo: 'pago',
          titulo: 'Comprobante cargado',
          mensaje: `${reservacion.nombre} ha subido un comprobante de pago para la reservación del ${reservacion.fecha} a las ${reservacion.hora}.`,
          leida: false
        }).subscribe();
        this.cargarDatos();
      });
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  abrirModalVer(reservacionId: string) {
    this.comprobanteActivo = this.getComprobante(reservacionId);
    this.showModalVer = true;
  }

  cerrarModalVer() {
    this.showModalVer = false;
    this.comprobanteActivo = null;
  }

  reemplazarComprobante(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0 || !this.comprobanteActivo) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64 = e.target.result;
      this.comprobantesService.updateComprobante(this.comprobanteActivo._id, {
        archivo_url: base64,
        nombre_archivo: file.name,
        fecha_carga: new Date().toISOString()
      }).subscribe(() => {
        this.mostrarToast(`Comprobante reemplazado con "${file.name}"`);
        this.cerrarModalVer();
        this.cargarDatos();
      });
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  eliminarComprobante() {
    if (!this.comprobanteActivo) return;
    this.comprobantesService.deleteComprobante(this.comprobanteActivo._id).subscribe(() => {
      this.mostrarToast('Comprobante eliminado');
      this.cerrarModalVer();
      this.cargarDatos();
    });
  }

  mostrarToast(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => { this.toastVisible = false; }, 3500);
  }
}