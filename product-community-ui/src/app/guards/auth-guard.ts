import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  if (authService.isLoggedIn) {
    return true;
  }
  
  // Redirect to login page with return url
  authService.logout();
  return false;
};
