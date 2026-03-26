import { Routes } from '@angular/router';
import { LayoutPublic } from './features/layout-public/layout-public';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { LayoutClient } from './features/client/layout-client/layout-client';
import { Dashboard as ClientDashboard } from './features/client/dashboard/dashboard';
import { LayoutAdmin } from './features/admin/layout-admin/layout-admin';
import { Dashboard as AdminDashboard } from './features/admin/dashboard/dashboard';
import { Reservations } from './features/client/reservations/reservations';
import { Messages } from './features/client/messages/messages';
import { Payments } from './features/client/payments/payments';
import { AdminReservaciones } from './features/admin/admin-reservaciones/admin-reservaciones';
import { AdminMensajes } from './features/admin/admin-mensajes/admin-mensajes';
import { AdminNotificaciones } from './features/admin/admin-notificaciones/admin-notificaciones';
import { AdminContenido } from './features/admin/admin-contenido/admin-contenido';
import { AdminConfiguracion } from './features/admin/admin-configuracion/admin-configuracion';
import { Productos } from './features/client/productos/productos';
import { authGuard, roleGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // 🌐 PÚBLICO
  {
    path: '',
    component: LayoutPublic,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      
    ],
  },

  {
  path: 'client',
  component: LayoutClient,
  canActivate: [authGuard],
  children: [
    { path: 'dashboard', component: ClientDashboard },
    { path: 'reservations', component: Reservations },
    { path: 'messages', component: Messages },
    { path: 'payments', component: Payments },
    { path: 'productos', component: Productos },
    
    
    

    // ✅ CORRECTO
    { 
      path: 'nueva-reservacion',
      loadComponent: () => import('./features/client/nueva-reservacion/nueva-reservacion')
        .then(m => m.NuevaReservacion)
    },

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ],
},

  // 🔐 ADMIN
  {
    path: 'admin',
    component: LayoutAdmin,
    canActivate: [roleGuard('admin')],
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'reservations', component: AdminReservaciones },
      { path: 'messages', component: AdminMensajes },
      { path: 'notificaciones', component: AdminNotificaciones },
      { path: 'contenido', component: AdminContenido },
      { path: 'configuracion', component: AdminConfiguracion },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
    ],
  },

  // ⚠️ RUTA POR DEFECTO
  { path: '**', redirectTo: '' },

];