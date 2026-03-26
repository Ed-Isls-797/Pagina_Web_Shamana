import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { EventosService } from '../../services/eventos';
import { ConfigService } from '../../services/config.service';
import { GaleriaService } from '../../services/galeria.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class Home implements OnInit {

  eventos: any[] = [];
  eventosPublicados: any[] = [];
  horarios: any[] = [];
  ubicacion: any = null;
  galeria: any[] = [];

  // Static fallback gallery
  private galeriaFallback = [
    { imagen_url: 'assets/galeria/shamana1.jpg', descripcion: 'Shamana Night Club' },
    { imagen_url: 'assets/galeria/shamana2.jpg', descripcion: 'Shamana Night Club' },
    { imagen_url: 'assets/galeria/shamana1.jpg', descripcion: 'Shamana Night Club' },
    { imagen_url: 'assets/galeria/shamana2.jpg', descripcion: 'Shamana Night Club' },
  ];
  
  // Static Data for Drinks
  drinks = [
    { name: 'Neon Gin', desc: 'Ginebra con tónica UV', price: '$120' },
    { name: 'Cyber Punk', desc: 'Vodka, Blue Curacao, Limón', price: '$140' },
    { name: 'Shamana Special', desc: 'Mezcal, Frutos Rojos, Chile', price: '$150' }
  ];

  // Static Data for VIP Services
  vipServices = [
    { icon: 'bi-shield-check', title: 'Seguridad Privada', desc: 'Protección exclusiva para tu mesa' },
    { icon: 'bi-car-front-fill', title: 'Valet Parking', desc: 'Servicio preferencial al llegar' },
    { icon: 'bi-star-fill', title: 'Atención Personalizada', desc: 'Meseros dedicados a tu zona' }
  ];

  constructor(
    private router: Router, 
    private eventosService: EventosService,
    private configService: ConfigService,
    private galeriaService: GaleriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarEventos();
    this.cargarConfiguracion();
    this.cargarGaleria();
  }

  cargarEventos() {
    this.eventosService.obtenerEventos().subscribe({
      next: (data: any[]) => {
        this.eventos = data;
        this.eventosPublicados = data.filter(e => e.estado === 'Publicado');
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar eventos', error);
      }
    });
  }

  cargarGaleria() {
    this.galeriaService.getGaleria().subscribe({
      next: (data: any[]) => {
        this.galeria = data.length > 0 ? data : this.galeriaFallback;
        this.cdr.detectChanges();
      },
      error: () => {
        this.galeria = this.galeriaFallback;
      }
    });
  }

  cargarConfiguracion() {
    this.configService.getConfiguracion().subscribe({
      next: (data: any) => {
        if (data) {
          this.horarios = data.horarios ? data.horarios : [];
          this.ubicacion = {
            direccion: data.direccion,
            latitud: data.latitud,
            longitud: data.longitud
          };
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => console.error('Error loading config', err)
    });
  }

  getGoogleMapsUrl(): string {
    if (this.ubicacion?.latitud && this.ubicacion?.longitud) {
      return `https://www.google.com/maps?q=${this.ubicacion.latitud},${this.ubicacion.longitud}`;
    }
    if (this.ubicacion?.direccion) {
      return `https://www.google.com/maps/search/${encodeURIComponent(this.ubicacion.direccion)}`;
    }
    return 'https://www.google.com/maps/search/Shamana+Pachuca';
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

}