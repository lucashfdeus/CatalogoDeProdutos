# BrackEnd

Sistema de catálogo de produtos com arquitetura em camadas, mensageria com RabbitMQ e persistência em PostgreSQL. Desenvolvido com .NET 8.

## 🛠️ Tecnologias Principais

### Backend (.NET 8)
- **ASP.NET Core**: Framework principal para construção da API.
- **Entity Framework Core**: ORM para acesso ao banco de dados PostgreSQL.
- **AutoMapper**: Mapeamento entre objetos (DTOs e entidades).
- **FluentValidation**: Validação de modelos.
- **MassTransit + RabbitMQ**: Comunicação assíncrona entre serviços via mensageria.
- **JWT Bearer Authentication**: Autenticação baseada em tokens.
- **Swashbuckle (Swagger)**: Documentação interativa da API.
- **Versionamento de API**: Gerenciado com `Asp.Versioning.Mvc.ApiExplorer`.

### Banco de Dados
- **PostgreSQL**: Banco de dados relacional utilizado.
- **Npgsql**: Provider do EF Core para PostgreSQL.

### Serviços
- **Worker Service**: Serviço consumidor de eventos RabbitMQ.
- **Docker**: Contêineres para serviços e banco de dados.
- **Docker Compose**: Orquestração dos contêineres.

## 📁 Estrutura do Projeto
- `LHFD.CatalogoDeProdutos.Api`: Camada de apresentação (API).
- `LHFD.CatalogoDeProdutos.Business`: Regras de negócio e contratos.
- `LHFD.CatalogoDeProdutos.Data`: Persistência e acesso ao banco.
- `LHFD.CatalogoDeProdutos.EventConsumer`: Serviço Worker que consome eventos.

## 🚀 Como Executar com Docker Compose

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Docker](https://www.docker.com/)
- Docker Compose

### Passo a Passo

1. **Clone o repositório Branch Main**
   ```bash
   [git clone https://github.com/seu-usuario/LHFD.CatalogoDeProdutos.git](https://github.com/lucashfdeus/CatalogoDeProdutos.git)
   ````
   Navegue até a raiz do projeto EX: .../CatalogoDeProdutos\backend>
   ```bash
      cd CatalogoDeProdutos\backend
3. *Execute o Docker Compose*
   ```bash
   docker-compose up --build
4. Acesse a API Após a inicialização, a API estará disponível em:
   [https://localhost:5001/swagger](https://localhost:5001/swagger/index.html)

5. Caso não consiga rodar automaticamente as migrations, rodar manualmente

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

# Criar a migration inicial
dotnet ef migrations add _Inicial -c CatalogoDeProdutosDbContext

# Aplicar a migration
dotnet ef database update -c CatalogoDeProdutosDbContext
````

## 🖥️ Frontend - Angular

Aplicação desenvolvida com Angular, utilizando SCSS, componentes standalone e integração com a API de catálogo de produtos.

### ⚙️ Tecnologias Utilizadas

- **Angular**: Framework principal para construção da interface.
- **SCSS**: Pré-processador CSS para estilos mais organizados e reutilizáveis.
- **Componentes Standalone**: Arquitetura moderna do Angular para componentes independentes.
- **Angular CLI**: Ferramenta para scaffolding, build e serve da aplicação.

### 📁 Estrutura e Configurações

- **Estilos globais**: `src/assets/styles.scss`
- **Assets públicos**: Diretório `public/`
- **Configurações de build**:
  - Produção: otimização, hashing de arquivos, limites de tamanho.
  - Desenvolvimento: source maps e licenças mantidas.

### 🚀 Como Executar o Frontend - Altere para branch "frontEnd"
   [Branch FrontEnd](https://github.com/lucashfdeus/CatalogoDeProdutos/tree/frontend)
