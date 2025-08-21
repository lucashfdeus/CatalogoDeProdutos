# 🚀 Como Executar o Frontend

## 📋 Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **NPM** (vem incluído com o Node.js)
- **Git** (para clonar o repositório)

## 📥 Clonar o Repositório

### 1. Clonar o projeto
```bash
git clone https://github.com/lucashfdeus/CatalogoDeProdutos.git
```

### 2. Acessar a branch frontend
```bash
cd CatalogoDeProdutos
git checkout frontend
```

### 3. Navegar para a pasta raiz do frontend
```bash
cd frontend  # ou o nome da pasta do projeto frontend
```

## 🚀 Execução Rápida (Desenvolvimento)

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento
```bash
npm start
```
ou
```bash
ng serve
```

### 3. Acessar a aplicação
Abra seu navegador em:  
**http://localhost:4200**  
ou simplemente digite `localhost:4200` e pressione Enter

## 🐳 Execução com Docker (Opcional)

### Build da imagem Docker
```bash
npm run docker:build
```

### Executar com Docker Compose
```bash
npm run docker:prod
```

### Executar em segundo plano
```bash
npm run docker:prod:detached
```

### Parar containers
```bash
npm run docker:down
```

## 💡 Observações
- A aplicação recarrega automaticamente quando você edita os arquivos
- Para funcionamento completo, a API precisa estar rodando em **https://localhost:5001**
