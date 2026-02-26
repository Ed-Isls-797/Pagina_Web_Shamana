import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout-public',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-public.html'
})
export class LayoutPublic {}