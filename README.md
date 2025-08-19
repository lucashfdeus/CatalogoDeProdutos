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

1. **Clone o repositório**
   ```bash
   [git clone https://github.com/seu-usuario/LHFD.CatalogoDeProdutos.git](https://github.com/lucashfdeus/CatalogoDeProdutos.git)
   cd CatalogoDeProdutos\backend
2. *Execute o Docker Compose*
   ```bash
   docker-compose up --build
3. Acesse a API Após a inicialização, a API estará disponível em:
   [(http://localhost:5001/swagger](https://localhost:5001/swagger/index.html)


  
