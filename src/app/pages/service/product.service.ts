import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProductModel {
    id?: string;
    codigo?: string;
    descricao?: string;
    preco?: number;
    status?: boolean;
    idDepartamento?: number;
    departamento?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  createProduct(product: ProductModel): Observable<string> {
    if (!this.validUserAuthentication()) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    if (!this.getToken()) {
      return throwError(() => new Error('Token não disponível'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const productToCreate = {
      codigo: product.codigo,
      descricao: product.descricao,
      preco: product.preco,
      status: product.status,
      idDepartamento: product.idDepartamento
    };

    return this.http.post<any>(`${environment.apiUrl}/produtos`, productToCreate, { headers })
      .pipe(
        map(response => response.codigo), // Retorna apenas o código
        catchError(error => {
          console.error('Erro ao criar produto:', error);
          return throwError(() => error);
        })
      );
  }

  deleteProduct(id: string): Observable<{ success: boolean; message?: string; }> {
    if (!this.validUserAuthentication()) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    if (!this.getToken()) {
      return throwError(() => new Error('Token não disponível'));
    }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`,
    'Content-Type': 'application/json'
  });

  return this.http.delete<any>(`${environment.apiUrl}/produtos/${id}`, { headers })
    .pipe(
      map(response => {
        if (response.success === false) {
          // Se a API retornou sucesso=false, trata como erro
          const errorMessage = response.errors?.join(', ') || 'Erro ao excluir produto';
          throw new Error(errorMessage);
        }
        return { success: true, message: 'Produto excluído com sucesso' };
      }),
      catchError(error => {
        console.error('Erro ao excluir produto:', error);

        // Se for um erro da API com estrutura conhecida
        if (error.error && error.error.success === false) {
          const apiError = error.error;
          const errorMessage = apiError.errors?.join(', ') || 'Erro ao excluir produto';
          return throwError(() => new Error(errorMessage));
        }

        // Se for outro tipo de erro
        return throwError(() => error);
      })
    );
}

  getProducts(): Observable<ProductModel[]> {
    if (!this.validUserAuthentication()) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    if (!this.getToken()) {
      return throwError(() => new Error('Token não disponível'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(`${environment.apiUrl}/produtos`, { headers })
      .pipe(
        map(apiProducts => this.mapApiProductsToModel(apiProducts)),
        catchError(error => {
          console.error('Erro ao buscar produtos:', error);
          return throwError(() => error);
        })
      );
  }

  generateProduct(): ProductModel {
    return {
      id: undefined,
      codigo: undefined,
      descricao: undefined,
      preco: undefined,
      status: undefined,
      idDepartamento: undefined,
      departamento: undefined
    };
  }

  generateProductWithData(data: Partial<ProductModel>): ProductModel {
    return {
      id: data.id,
      codigo: data.codigo,
      descricao: data.descricao,
      preco: data.preco,
      status: data.status,
      idDepartamento: data.idDepartamento,
      departamento: data.departamento
    };
  }

  updateProduct(product: ProductModel): Observable<any> {
    if (!this.validUserAuthentication()) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    if (!this.getToken()) {
      return throwError(() => new Error('Token não disponível'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const productToUpdate = {
      id: product.id,
      codigo: product.codigo,
      descricao: product.descricao,
      preco: product.preco,
      status: product.status,
      idDepartamento: product.idDepartamento
    };

    return this.http.put(`${environment.apiUrl}/produtos/${product.id}`, productToUpdate, { headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao atualizar produto:', error);
          return throwError(() => error);
        })
      );
  }

  getDepartments(): Observable<any[]> {
    if (!this.authService.isAuthenticated()) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    if (!this.getToken()) {
      return throwError(() => new Error('Token não disponível'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(`${environment.apiUrl}/departamentos`, { headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar departamentos:', error);
          return throwError(() => error);
        })
      );
  }

  private validUserAuthentication(): boolean {
    return this.authService.isAuthenticated();
  }

  private mapApiProductsToModel(apiProducts: any[]): ProductModel[] {
    return apiProducts.map(product => ({
      id: product.id?.toString(),
      codigo: product.codigo || product.codigoProduto || product.sku,
      descricao: product.descricao || product.nome || product.descricaoProduto,
      preco: product.preco || product.valor || product.precoVenda,
      status: this.convertToBoolean(product.status || product.ativo || product.disponivel),
      idDepartamento: product.idDepartamento || product.departamentoId || product.departamentoId,
      departamento: product.departamento || product.nomeDepartamento || product.departamentoId
    }));
  }

  private convertToBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1';
    }
    return false;
  }

  private getToken() {
    return this.authService.getToken();
  }
}
