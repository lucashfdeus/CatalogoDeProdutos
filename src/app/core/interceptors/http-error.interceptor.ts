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
        let errorMessage = 'Erro desconhecido';

        if (error.status === 0) {
          errorMessage = 'Servidor indisponível. Verifique se a API está rodando em https://localhost:5001';
        } else if (error.status === 404) {
          errorMessage = 'Recurso não encontrado';
        } else if (error.status >= 500) {
          errorMessage = 'Erro interno do servidor';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error('Erro HTTP:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
