import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // Armazena o token se a resposta for bem-sucedida
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Formata o erro para ser tratado pelo componente
        return throwError(() => ({
          message: error.error?.message ||
            error.error?.error ||
            'Erro durante o login',
          status: error.status
        }));
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/auth/login']);
  }
}
