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
        if (response.accessToken) {
          localStorage.setItem(this.TOKEN_KEY, response.accessToken);
          this.router.navigate(['home']);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error === 'string'
          ? error.error
          : error.error?.message || 'Erro durante o login';

        return throwError(() => ({
          message: errorMessage,
          status: error.status
        }));
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/auth/login']);
  }
}
