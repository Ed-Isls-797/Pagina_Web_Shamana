import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { BannerNotificacionComponent } from '../../shared/banner-notificacion/banner-notificacion';
@Component({
  selector: 'app-layout-public',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BannerNotificacionComponent],
  templateUrl: './layout-public.html'
})
export class LayoutPublic {
  constructor(private router: Router) {}

  scrollTo(sectionId: string) {
    // If already on home, scroll directly
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // If on another page, navigate home then scroll after render
    this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    });
  }
}