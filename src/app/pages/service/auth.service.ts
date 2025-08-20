import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Environment
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';

  account(email: string, password: string, confirmPassword: string): Observable<{ success: boolean; message?: string; }> {
    return this.http.post<any>(`${this.apiUrl}/nova-conta`, { email, password, confirmPassword })
      .pipe(
        map(response => this.handleAuthResponse(response)),
        catchError(error => this.handleError(error, 'cadastro'))
      );
  }

  login(email: string, password: string): Observable<{ success: boolean; message?: string; }> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => this.handleAuthResponse(response)),
        catchError(error => this.handleError(error, 'login'))
      );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Private methods
  private handleAuthResponse(response: any): { success: boolean; message?: string; } {
    if (response?.accessToken) {
      localStorage.setItem(this.TOKEN_KEY, response.accessToken);
      return { success: true };
    }

    return {
      success: false,
      message: response?.message || 'Token não recebido'
    };
  }

  private handleError(error: HttpErrorResponse, context: string): Observable<{ success: boolean; message: string; }> {
    console.error(`Erro no ${context}:`, error);

    const errorMessage = this.extractErrorMessage(error) || `Erro durante o ${context}`;
    return of({ success: false, message: errorMessage });
  }

  private extractErrorMessage(error: HttpErrorResponse | any): string {
    return error instanceof HttpErrorResponse
      ? this.extractErrorFromHttpResponse(error)
      : this.extractErrorFromObject(error);
  }

  private extractErrorFromHttpResponse(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return 'Erro de conexão. Verifique sua internet.';
    }

    return this.extractErrorFromObject(error.error) || error.message || `Erro ${error.status}`;
  }

  private extractErrorFromObject(error: any): string {
    if (!error) return '';

    if (Array.isArray(error)) {
      return error.map((e: any) => e.description || e.message).join(' | ');
    }

    if (typeof error === 'string') {
      return error;
    }

    return error.title || error.message || error.description || 'Erro inesperado';
  }
}
