import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    });
  }
  return next(req);
};
