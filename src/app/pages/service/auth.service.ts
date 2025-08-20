import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ success: boolean, message?: string; }> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response?.accessToken) {

          localStorage.setItem(this.TOKEN_KEY, response.accessToken);

          return { success: true };
        }
        return { success: false, message: 'Token não recebido' };
      }),
      catchError((error: HttpErrorResponse) => {

        const errorMessage = typeof error.error === 'string'
          ? error.error
          : error.error?.title || 'Erro durante o login';

        return of({ success: false, message: errorMessage });
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
