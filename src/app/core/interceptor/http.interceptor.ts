import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { catchError, throwError } from 'rxjs';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  
  const authService = inject(AuthService);
  const messageService = inject(MessageService);

  if (!authService) {
    console.warn('AuthService not initialized yet.');
    return next(req);
  }

  console.log(authService.isAuthenticated());
  if (authService.isAuthenticated()) {
    console.log(localStorage.getItem('authToken'));
    
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('authToken')}`) || new HttpHeaders()
    });
  }
  return next(req)
  .pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('HTTP Error Response', error);

      switch (error.status) {
        case 401:
          console.log('HTTP Error Response 401', error);

          messageService.add({
            severity: 'error',
            summary: 'Unauthorized',
            detail: 'No tienes permiso para acceder a este recurso.',
          });

          break;

        case 403:
          console.log('HTTP Error Response 403', error);

          messageService.add({
            severity: 'error',
            summary: 'Forbidden',
            detail: 'Acceso denegado.',
          });

          break;

          case 404:
            console.log('HTTP Error Response 404', error);
  
            messageService.add({
              severity: 'warn',
              summary: 'Not Found',
              detail: 'El recurso solicitado no existe.',
            });
  
            break;

          case 409:
            console.log('HTTP Error Response 409', error);
  
            messageService.add({
              severity: 'warn',
              summary: 'Conflicto',
              detail: 'El recurso solicitado ya existe.',
            });
  
            break;
          
        case 500:
          console.log('HTTP Error Response 500', error);

          messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde.',
          });

          break;

        default:
          console.log('HTTP Error Response default', error);

          messageService.add({
            severity: 'info',
            summary: 'Error',
            detail: error.message || 'Algo salió mal. Por favor, intenta nuevamente.',
          });
          break;
      }

      return throwError(() => error);
    })
  );



};
