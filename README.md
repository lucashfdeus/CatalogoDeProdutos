# 🚀 Como Executar o Frontend

## 📋 Pré-requisitos
- **Node.js** (versão 20.19.0 ou superior) recomendada (20.19.4)

## 📥 Clonar e Configurar o Projeto

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
cd frontend
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

## 🐳 Execução com Docker

⚠️ **Importante**: Para executar os comandos Docker, você precisa estar na **pasta raiz do projeto frontend**:
```bash
CatalogoDeProdutos\frontend>
```

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
- Certifique-se de estar na pasta correta antes de executar comandos Docker
