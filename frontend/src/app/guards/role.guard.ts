import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta si tu servicio está en otro lado

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Jalamos los datos del usuario logueado
    const session = authService.getSession();

    // Verificamos si hay sesión y si el rol coincide
    // OJO: Cambia 'rol' por el nombre exacto que tenga tu campo en MongoDB/LocalStorage (puede ser 'role', 'tipo_usuario', etc.)
    if (session && session.rol === expectedRole) {
      return true; // Pásale, eres admin
    }

    // Si no es admin o no está logueado, lo pateamos a su dashboard normal o al login
    router.navigate(['/client/dashboard']);
    return false;
  };
};