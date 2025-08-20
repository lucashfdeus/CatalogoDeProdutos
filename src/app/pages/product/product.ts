import { Component, OnInit, signal, ViewChild, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { Table, TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService, ConfirmationService } from 'primeng/api';

// Services and models
import { ProductModel, ProductService } from '../service/product.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    SelectButtonModule
  ],
  template: `
        <p-toast />
        <p-confirmDialog />

        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="Novo" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button severity="secondary" label="Excluir" icon="pi pi-trash" outlined (onClick)="deleteSelectedProducts()" [disabled]="!selectedProducts() || selectedProducts().length === 0" />
            </ng-template>

            <ng-template #end>
                <p-button label="Exportar" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <div *ngIf="loading" class="loading p-4 text-center">Carregando produtos...</div>
        <div *ngIf="error" class="error p-4 mb-4 bg-red-100 text-red-700 rounded">{{ error }}</div>

        <p-table
            *ngIf="!loading && !error"
            #dt
            [value]="products()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['codigo', 'descricao', 'status']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedProducts"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} produtos"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Gerenciamento de Produtos</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Buscar..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th pSortableColumn="codigo" style="min-width:12rem">
                        Código
                        <p-sortIcon field="codigo" />
                    </th>
                    <th pSortableColumn="descricao" style="min-width:20rem">
                        Descrição
                        <p-sortIcon field="descricao" />
                    </th>
                    <th pSortableColumn="preco" style="min-width: 8rem">
                        Preço
                        <p-sortIcon field="preco" />
                    </th>
                    <th pSortableColumn="departamento" style="min-width:10rem">
                        Departamento
                        <p-sortIcon field="departamento" />
                    </th>
                    <th pSortableColumn="status" style="min-width: 10rem">
                        Status
                        <p-sortIcon field="status" />
                    </th>
                    <th style="min-width: 12rem">Ações</th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="product" />
                    </td>
                    <td style="min-width: 12rem">{{ product.codigo }}</td>
                    <td style="min-width: 20rem">{{ product.descricao }}</td>
                    <td>{{ product.preco | currency: 'BRL' }}</td>
                    <td>{{ product.departamento }}</td>
                    <td>
                        <p-tag [value]="product.status ? 'Ativo' : 'Inativo'"
                               [severity]="product.status ? 'success' : 'danger'" />
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true"
                                 (click)="editProduct(product)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true"
                                 (click)="deleteProduct(product)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="productDialog" [style]="{ width: '500px' }" header="Detalhes do Produto" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="codigo" class="block font-bold mb-3">Código</label>
                        <input type="text" pInputText id="codigo" [(ngModel)]="product.codigo" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !product.codigo">Código é obrigatório.</small>
                    </div>

                    <div>
                        <label for="descricao" class="block font-bold mb-3">Descrição</label>
                        <textarea id="descricao" pTextarea [(ngModel)]="product.descricao" required rows="3" cols="20" fluid></textarea>
                        <small class="text-red-500" *ngIf="submitted && !product.descricao">Descrição é obrigatória.</small>
                    </div>

                    <div>
                        <label for="preco" class="block font-bold mb-3">Preço</label>
                        <p-inputnumber id="preco" [(ngModel)]="product.preco" mode="currency" currency="BRL" locale="pt-BR" fluid />
                    </div>

                    <div>
                        <label for="status" class="block font-bold mb-3">Status</label>
                        <p-selectButton id="status" [(ngModel)]="product.status" [options]="statusOptions" optionLabel="label" optionValue="value" />
                    </div>

                    <div>
                        <label for="departamento" class="block font-bold mb-3">Departamento</label>
                        <p-select
                            [(ngModel)]="product.idDepartamento"
                            inputId="departamento"
                            [options]="departments"
                            optionLabel="nome"
                            optionValue="id"
                            placeholder="Selecione um Departamento"
                            fluid
                            appendTo="body"
                            [overlayOptions]="{ appendTo: 'body' }"
                            [style]="{'width': '100%'}"
                            panelStyleClass="max-h-64 overflow-y-auto">
                        </p-select>
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Salvar" icon="pi pi-check" (click)="saveProduct()" />
            </ng-template>
        </p-dialog>
    `,
  providers: [MessageService, ConfirmationService]
})
export class Product implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('dt') dt!: Table;

  products = signal<ProductModel[]>([]);
  selectedProducts = signal<ProductModel[]>([]);

  // UI state
  productDialog = false;
  loading = true;
  loadingDepartments = false;
  submitted = false;
  error = '';

  // Data
  product: ProductModel = {};
  departments: any[] = [];

  readonly statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
  ];

  readonly cols: Column[] = [
    { field: 'codigo', header: 'Código' },
    { field: 'descricao', header: 'Descrição' },
    { field: 'preco', header: 'Preço' },
    { field: 'departamento', header: 'Departamento' },
    { field: 'status', header: 'Status' }
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products.set(products);
          this.loading = false;
        },
        error: (error) => {
          this.handleError('Erro ao carregar produtos', error);
          this.loading = false;
        }
      });
  }

  loadDepartments(): void {
    this.loadingDepartments = true;

    this.productService.getDepartments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (depts) => {
          this.departments = depts;
          this.loadingDepartments = false;
        },
        error: (error) => {
          this.handleError('Erro ao carregar departamentos', error, false);
          this.loadingDepartments = false;
        }
      });
  }

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew(): void {
    this.product = this.productService.generateProduct();
    this.submitted = false;
    this.productDialog = true;
    this.loadDepartments();
  }

  editProduct(product: ProductModel): void {
    this.product = { ...product };
    this.productDialog = true;
    this.loadDepartments();
  }

  deleteSelectedProducts(): void {
    const selected = this.selectedProducts();
    if (!selected || selected.length === 0) {
      return;
    }

    this.confirmationService.confirm({
      message: `Tem certeza de que deseja excluir ${selected.length} produto(s) selecionado(s)?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.executeBulkDelete(selected);
      }
    });
  }

  deleteProduct(product: ProductModel): void {
    if (!product.id) {
      this.showMessage('warn', 'Aviso', 'Produto não possui ID válido');
      return;
    }

    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir "${product.descricao}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.executeSingleDelete(product);
      }
    });
  }

  saveProduct(): void {
    this.submitted = true;

    if (!this.validateProductForm()) {
      return;
    }

    const productToSave = this.prepareProductForSave();

    if (this.product.id) {
      this.updateProduct(productToSave);
    } else {
      this.createProduct(productToSave);
    }
  }

  exportCSV(): void {
    this.dt.exportCSV();
  }

  hideDialog(): void {
    this.productDialog = false;
    this.submitted = false;
    this.departments = [];
  }

  // Private methods
  private executeBulkDelete(products: ProductModel[]): void {
    const deleteObservables = products
      .filter(product => product.id)
      .map(product =>
        this.productService.deleteProduct(product.id!).pipe(
          catchError(error => of({
            success: false,
            product,
            error: error.message || 'Erro ao excluir produto'
          }))
        )
      );

    if (deleteObservables.length === 0) {
      this.showMessage('warn', 'Aviso', 'Nenhum produto válido para excluir');
      return;
    }

    forkJoin(deleteObservables)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (results) => this.handleBulkDeleteResults(results),
        error: (error) => this.handleBulkDeleteError(error)
      });
  }

  private executeSingleDelete(product: ProductModel): void {
    this.productService.deleteProduct(product.id!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.showMessage('success', 'Sucesso', result.message || 'Produto excluído com sucesso');
          this.loadProducts();
        },
        error: (error) => {
          this.handleError('Erro ao excluir produto', error);
          this.loadProducts();
        }
      });
  }

  private handleBulkDeleteResults(results: any[]): void {
    const successfulDeletes = results.filter(r => r.success === true);
    const failedDeletes = results.filter(r => r.success === false);

    if (successfulDeletes.length > 0) {
      this.showMessage('success', 'Sucesso', `${successfulDeletes.length} produto(s) excluído(s) com sucesso`);
    }

    if (failedDeletes.length > 0) {
      failedDeletes.forEach(failed => {
        this.showMessage('error', 'Erro', `Não foi possível excluir ${failed.product.descricao}: ${failed.error}`, 5000);
      });
    }

    this.loadProducts();
    this.selectedProducts.set([]);
  }

  private handleBulkDeleteError(error: any): void {
    console.error('Erro geral ao excluir produtos:', error);
    this.showMessage('error', 'Erro', 'Ocorreu um erro durante a exclusão');
    this.loadProducts();
  }

  private validateProductForm(): boolean {
    if (!this.product.codigo?.trim()) {
      this.showMessage('error', 'Erro', 'Código é obrigatório');
      return false;
    }

    if (!this.product.descricao?.trim()) {
      this.showMessage('error', 'Erro', 'Descrição é obrigatória');
      return false;
    }

    if (!this.product.idDepartamento) {
      this.showMessage('error', 'Erro', 'Departamento é obrigatório');
      return false;
    }

    return true;
  }

  private prepareProductForSave(): ProductModel {
    return {
      codigo: this.product.codigo!.trim(),
      descricao: this.product.descricao!.trim(),
      preco: this.product.preco || 0,
      status: this.product.status ?? true,
      idDepartamento: this.product.idDepartamento,
      id: this.product.id
    };
  }

  private updateProduct(product: ProductModel): void {
    this.productService.updateProduct(product)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.showMessage('success', 'Sucesso', 'Produto atualizado');
          this.loadProducts();
          this.resetDialog();
        },
        error: (error) => {
          this.handleError('Erro na atualização', error);
        }
      });
  }

  private createProduct(product: ProductModel): void {
    this.productService.createProduct(product)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (novoCodigo) => {
          this.showMessage('success', 'Sucesso', `Produto criado com código: ${novoCodigo}`);
          this.loadProducts();
          this.resetDialog();
        },
        error: (error) => {
          this.handleError('Erro ao criar produto', error);
        }
      });
  }

  private resetDialog(): void {
    this.productDialog = false;
    this.product = {};
  }

  private handleError(summary: string, error: any, showUserMessage = true): void {
    console.error(`${summary}:`, error);
    if (showUserMessage) {
      this.showMessage('error', 'Erro', error.message || summary);
    }
  }

  private showMessage(severity: 'success' | 'error' | 'warn', summary: string, detail: string, life = 3000): void {
    this.messageService.add({ severity, summary, detail, life });
  }
}
