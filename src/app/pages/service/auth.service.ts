import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient, private router: Router) { }

  account(email: string, password: string, confirmPassword: string): Observable<{ success: boolean, message?: string; }> {
    return this.http.post<any>(`${environment.apiUrl}/nova-conta`, { email, password, confirmPassword })
      .pipe(
        map(res => this.handleAuthResponse(res)),
        catchError(err => this.handleError(err, 'cadastro'))
      );
  }

  login(email: string, password: string): Observable<{ success: boolean, message?: string; }> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        map(res => this.handleAuthResponse(res)),
        catchError(err => this.handleError(err, 'login'))
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/auth/login']);
  }

  private handleAuthResponse(response: any): { success: boolean; message?: string; } {
    if (response?.accessToken) {
      localStorage.setItem(this.TOKEN_KEY, response.accessToken);
      return { success: true };
    }
    return { success: false, message: 'Token não recebido' };
  }

  private handleError(error: HttpErrorResponse, context: string) {
    const errorMessage = this.extractErrorMessage(error.error) || `Erro durante o ${context}`;
    return of({ success: false, message: errorMessage });
  }

  private extractErrorMessage(error: any): string {
    if (Array.isArray(error)) {
      return error.map((e: any) => e.description).join(' | ');
    }
    if (typeof error === 'string') {
      return error;
    }
    return error?.title || 'Erro inesperado';
  }
}
