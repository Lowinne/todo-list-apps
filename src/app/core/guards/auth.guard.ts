// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = state => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1), // Prendre seulement la première valeur
    map(user => {
      if (user) {
        return true; // Accès autorisé
      } else {
        // Rediriger vers login avec l'URL de retour
        router.navigate(['/auth/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false; // Accès refusé
      }
    })
  );
};
