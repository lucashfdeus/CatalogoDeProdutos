import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoints = {
    produtos: `${this.apiUrl}/produtos`,
    departamentos: `${this.apiUrl}/departamentos`
  };

  // CREATE: Criar novo produto
  createProduct(product: ProductModel): Observable<string> {
    this.validateAuthentication();

    const productToCreate = this.prepareProductForApi(product);

    return this.http.post<any>(this.endpoints.produtos, productToCreate, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.codigo),
      catchError(error => this.handleError('Erro ao criar produto', error))
    );
  }

  // DELETE: Excluir produto
  deleteProduct(id: string): Observable<{ success: boolean; message?: string; }> {
    this.validateAuthentication();

    return this.http.delete<any>(`${this.endpoints.produtos}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => this.handleDeleteResponse(response)),
      catchError(error => this.handleDeleteError(error))
    );
  }

  // GET: Obter todos os produtos
  getProducts(): Observable<ProductModel[]> {
    this.validateAuthentication();

    return this.http.get<any[]>(this.endpoints.produtos, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(apiProducts => this.mapApiProductsToModel(apiProducts)),
      catchError(error => this.handleError('Erro ao buscar produtos', error))
    );
  }

  // UPDATE: Atualizar produto
  updateProduct(product: ProductModel): Observable<any> {
    this.validateAuthentication();

    const productToUpdate = this.prepareProductForApi(product);

    return this.http.put(`${this.endpoints.produtos}/${product.id}`, productToUpdate, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError('Erro ao atualizar produto', error))
    );
  }

  // GET: Obter departamentos
  getDepartments(): Observable<any[]> {
    this.validateAuthentication();

    return this.http.get<any[]>(this.endpoints.departamentos, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError('Erro ao buscar departamentos', error))
    );
  }

  // Helper methods
  generateProduct(): ProductModel {
    return {
      id: undefined,
      codigo: '',
      descricao: '',
      preco: 0,
      status: true,
      idDepartamento: undefined,
      departamento: undefined
    };
  }

  generateProductWithData(data: Partial<ProductModel>): ProductModel {
    return {
      id: data.id,
      codigo: data.codigo || '',
      descricao: data.descricao || '',
      preco: data.preco || 0,
      status: data.status ?? true,
      idDepartamento: data.idDepartamento,
      departamento: data.departamento
    };
  }

  // Private methods
  private validateAuthentication(): void {
    if (!this.isAuthenticated()) {
      throw new Error('Usuário não autenticado');
    }

    if (!this.getToken()) {
      throw new Error('Token não disponível');
    }
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  private prepareProductForApi(product: ProductModel): any {
    return {
      codigo: product.codigo,
      descricao: product.descricao,
      preco: product.preco,
      status: product.status,
      idDepartamento: product.idDepartamento,
      ...(product.id && { id: product.id })
    };
  }

  private handleDeleteResponse(response: any): { success: boolean; message?: string; } {
    if (response.success === false) {
      const errorMessage = response.errors?.join(', ') || 'Erro ao excluir produto';
      throw new Error(errorMessage);
    }
    return { success: true, message: 'Produto excluído com sucesso' };
  }

  private handleDeleteError(error: any): Observable<never> {
    if (error.error?.success === false) {
      const apiError = error.error;
      const errorMessage = apiError.errors?.join(', ') || 'Erro ao excluir produto';
      return throwError(() => new Error(errorMessage));
    }
    return throwError(() => error);
  }

  private mapApiProductsToModel(apiProducts: any[]): ProductModel[] {
    return apiProducts.map(product => ({
      id: this.parseId(product.id),
      codigo: product.codigo || product.codigoProduto || product.sku || '',
      descricao: product.descricao || product.nome || product.descricaoProduto || '',
      preco: product.preco || product.valor || product.precoVenda || 0,
      status: this.convertToBoolean(product.status || product.ativo || product.disponivel),
      idDepartamento: product.idDepartamento || product.departamentoId,
      departamento: product.departamento || product.nomeDepartamento
    }));
  }

  private parseId(id: any): string | undefined {
    if (id == null) return undefined;
    return id.toString();
  }

  private convertToBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1';
    }
    return false;
  }

  private handleError(context: string, error: any): Observable<never> {
    console.error(`${context}:`, error);
    return throwError(() => error);
  }

  private isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  private getToken(): string | null {
    return this.authService.getToken();
  }
}
