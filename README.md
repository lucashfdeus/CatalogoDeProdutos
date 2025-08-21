# 🚀 Catalogo de Produtos - Backend

Sistema de catálogo de produtos com arquitetura em camadas, mensageria com RabbitMQ e persistência em PostgreSQL. Desenvolvido com .NET 8.

## 📋 Pré-requisitos

- **.NET 8 SDK** - [Download aqui](https://dotnet.microsoft.com/en-us/download)
- **Docker** - [Download aqui](https://www.docker.com/)
- **Docker Compose** (vem incluído com Docker Desktop)
- **Git** - Para clonar o repositório

## 🚀 Como Executar

### 1. Clonar o Repositório
```bash
git clone https://github.com/lucashfdeus/CatalogoDeProdutos.git
cd CatalogoDeProdutos/backend
```

### 2. Executar com Docker Compose
```bash
docker-compose up --build
```

### 3. Acessar a API
Após a inicialização, acesse:  
**https://localhost:5001/swagger**

## 🛠️ Tecnologias Utilizadas

### Backend (.NET 8)
- **ASP.NET Core** - Framework principal
- **Entity Framework Core** - ORM para PostgreSQL
- **AutoMapper** - Mapeamento entre objetos
- **MassTransit + RabbitMQ** - Mensageria assíncrona
- **JWT Bearer Authentication** - Autenticação por tokens
- **Swagger** - Documentação interativa da API

### Banco de Dados
- **PostgreSQL** - Banco de dados principal
- **Npgsql** - Provider para PostgreSQL

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 📁 Estrutura do Projeto

```
backend/
├── LHFD.CatalogoDeProdutos.Api/          # Camada de apresentação (API)
├── LHFD.CatalogoDeProdutos.Business/     # Regras de negócio e contratos
├── LHFD.CatalogoDeProdutos.Data/         # Persistência e acesso ao banco
└── LHFD.CatalogoDeProdutos.EventConsumer/ # Serviço Worker consumidor
```

## ⚠️ Migrations Manuais (Se Necessário)

Caso as migrations não executem automaticamente:

### Para Identity (ApplicationDbContext):
```bash
cd LHFD.CatalogoDeProdutos.Api
dotnet ef migrations add Inicial -c ApplicationDbContext
dotnet ef database update -c ApplicationDbContext
```

### Para Produtos (CatalogoDeProdutosDbContext):
```bash
cd LHFD.CatalogoDeProdutos.Data
dotnet ef migrations add Inicial -c CatalogoDeProdutosDbContext
dotnet ef database update -c CatalogoDeProdutosDbContext
```

## 🌐 Frontend Angular

O frontend está disponível na branch **frontend** do mesmo repositório:

```bash
git checkout frontend
cd frontend
npm install
npm start
```

Acesse: **http://localhost:4200**

## 📞 Suporte

Em caso de problemas:
1. Verifique se todos os containers estão rodando: `docker ps`
2. Confirme se as portas 5001 (API) e 5432 (PostgreSQL) estão livres
3. Execute `docker-compose logs` para ver logs detalhados
