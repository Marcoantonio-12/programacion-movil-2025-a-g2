import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = !!localStorage.getItem('token'); // ejemplo simple
  if (!isAuthenticated) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
  return true;
};
