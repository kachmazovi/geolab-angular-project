import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/user-services/auth-service';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServ = inject(AuthService);
  const isLogged = authServ.userInfo() && localStorage.getItem('user');

  if (!!!isLogged) router.navigateByUrl('/login');

  return !!isLogged;
};
