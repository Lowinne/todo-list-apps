import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { map, take } from 'rxjs/operators';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user && user.role === 'admin') {
        return true; // Accès admin autorisé
      } else {
        // Rediriger vers la page d'accueil
        router.navigate(['/todos']);
        return false; // Accès refusé
      }
    })
  );
};
