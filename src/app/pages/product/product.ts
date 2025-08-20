import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductModel, ProductService } from '../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    TableModule,
    FormsModule,
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

  productDialog: boolean = false;
  products = signal<ProductModel[]>([]);
  product: ProductModel = {};
  selectedProducts = signal<ProductModel[]>([]);
  submitted: boolean = false;
  loading = true;
  error = '';

  statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
  ];

  departments: any[] = [];
  loadingDepartments: boolean = false;

  cols: Column[] = [
    { field: 'codigo', header: 'Código' },
    { field: 'descricao', header: 'Descrição' },
    { field: 'preco', header: 'Preço' },
    { field: 'departamento', header: 'Departamento' },
    { field: 'status', header: 'Status' }
  ];

  @ViewChild('dt') dt!: Table;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProducts().subscribe({
      next: (products: ProductModel[]) => {
        this.products.set(products);
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erro ao carregar produtos';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  loadDepartments(): void {
    this.loadingDepartments = true;
    this.productService.getDepartments().subscribe({
      next: (depts) => {
        this.departments = depts;
        this.loadingDepartments = false;
      },
      error: (error) => {
        console.error('Erro ao carregar departamentos:', error);
        this.loadingDepartments = false;
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.product = this.productService.generateProduct();
    this.submitted = false;
    this.productDialog = true;
    this.loadDepartments();
  }

  editProduct(product: ProductModel) {
    this.product = { ...product };
    this.productDialog = true;
    this.loadDepartments();
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir os produtos selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const currentProducts = this.products();
        const selected = this.selectedProducts();

        const filteredProducts = currentProducts.filter(
          val => !selected.some(selectedProduct => selectedProduct.id === val.id)
        );

        this.products.set(filteredProducts);
        this.selectedProducts.set([]);

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produtos excluídos',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.departments = [];
  }

  deleteProduct(product: ProductModel) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + product.descricao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const currentProducts = this.products();
        const filteredProducts = currentProducts.filter(val => val.id !== product.id);
        this.products.set(filteredProducts);

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto excluído',
          life: 3000
        });
      }
    });
  }

  saveProduct() {
    this.submitted = true;

    // Debug para verificar os valores atuais
    console.log('🔍 Valores atuais do produto:', {
      status: this.product.status,
      tipoStatus: typeof this.product.status,
      idDepartamento: this.product.idDepartamento,
      tipoIdDepartamento: typeof this.product.idDepartamento
    });

    if (this.product.codigo?.trim() && this.product.descricao?.trim()) {
      // Garantir que os tipos estão corretos
      const productToUpdate: ProductModel = {
        id: this.product.id,
        codigo: this.product.codigo.trim(),
        descricao: this.product.descricao.trim(),
        preco: this.product.preco,
        status: this.product.status, // Já deve estar como boolean
        idDepartamento: this.product.idDepartamento // Já deve estar como number
      };

      console.log('📤 Enviando para atualização:', productToUpdate);

      if (this.product.id) {
        this.productService.updateProduct(productToUpdate).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto atualizado',
              life: 3000
            });
            this.loadProducts();
            this.productDialog = false;
            this.product = {};
          },
          error: (error) => {
            console.error('❌ Erro na atualização:', error);
            // Log mais detalhado do erro
            if (error.error) {
              console.error('❌ Resposta da API:', error.error);
            }
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível atualizar o produto',
              life: 3000
            });
          }
        });
      } else {
        // Lógica para criar novo produto
        const currentProducts = this.products();
        this.product.id = this.generateId();
        this.products.set([...currentProducts, { ...this.product }]);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto criado',
          life: 3000
        });
        this.productDialog = false;
        this.product = {};
      }
    }
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
