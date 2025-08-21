### 🚀 Como Executar o Frontend

#### Pré-requisitos

- Node.js (versão recomendada: 18+)
- Angular CLI

#### Passo a Passo

1. **Instale as dependências**
   ```bash
   npm install
   ```
2. **Execute em modo desenvolvimento**
   ```bash
   ng serve
3. **Acesse no navegador**
   ```bash
   http://localhost:4200
   ou h + o

4. Caso não consiga rodar automaticamente as migrations, rodar manualmente

**Para Identity (`ApplicationDbContext`):**

```bash
# Navegar até a pasta do projeto API
cd LHFD.CatalogoDeProdutos.Api

# Criar a migration inicial
dotnet ef migrations add _Inicial -c ApplicationDbContext

# Aplicar a migration
dotnet ef database update -c ApplicationDbContext
```
**Para Produtos (`CatalogoDeProdutosDbContext`):**
```bash
# Navegar até o projeto de Data
cd LHFD.CatalogoDeProdutos.Data
