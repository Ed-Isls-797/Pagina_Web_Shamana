import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BannerNotificacionComponent } from '../../shared/banner-notificacion/banner-notificacion';
@Component({
  selector: 'app-layout-public',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BannerNotificacionComponent],  templateUrl: './layout-public.html'
})
export class LayoutPublic {}