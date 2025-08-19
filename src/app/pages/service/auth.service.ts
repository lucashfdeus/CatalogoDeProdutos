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
    return this.http.post(`${environment.apiUrl}/login`, { email, password }, {
      responseType: 'text'
    }).pipe(
      tap((response: string) => {
        try {
          const jsonResponse = JSON.parse(response);
          if (jsonResponse.token) {
            localStorage.setItem(this.TOKEN_KEY, jsonResponse.token);
          }
        } catch {
          console.log('Resposta não-JSON:', response);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const errorMessage = typeof error.error === 'string' ? error.error : 'Usuário ou senha inválidos';
          this.router.navigate(['/auth/access'], {
            state: { errorMessage: errorMessage }
          });
        }

        return throwError(() => ({
          message: typeof error.error === 'string' ? error.error : 'Erro durante o login',
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
