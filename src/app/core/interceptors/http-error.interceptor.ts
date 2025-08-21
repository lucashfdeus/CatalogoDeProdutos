import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          const customError = new Error('Servidor indisponível. Verifique se a API está rodando em http://localhost:5000');
          return throwError(() => customError);
        }

        if (error.status === 400 && Array.isArray(error.error)) {
          const errorMessages = error.error.map((err: { description: string; }) => err.description);
          const combinedError = new Error(errorMessages.join('\n'));
          return throwError(() => combinedError);
        }

        if (error.status === 400 && error.error?.description) {
          return throwError(() => new Error(error.error.description));
        }

        return throwError(() => error);
      })
    );
  }
}
