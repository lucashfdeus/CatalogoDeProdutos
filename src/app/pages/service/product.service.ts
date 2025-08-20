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
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método principal - Retorna Observable (abordagem recomendada)
  getProducts(): Observable<ProductModel[]> {
    if (!this.authService.isAuthenticated()) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('Token não disponível'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
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

  // Método para mapear os dados da API para ProductModel[]
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

  // Método auxiliar para converter diversos formatos para boolean
  private convertToBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1';
    }
    return false;
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

  // Método adicional para criar produto com dados iniciais
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

   // Método para atualizar produto
  updateProduct(product: ProductModel): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('Token não disponível'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
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

    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('Token não disponível'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
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
}
