# Sistema de Autenticação com Roles - Escritório Legal

Sistema completo de autenticação e controle de acesso por roles usando Next.js, NextAuth.js e Prisma.

## 🚀 Configuração Local

### 1. Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado localmente OU Docker
- Git

### 2. Clonar e Instalar Dependências

\`\`\`bash
# Clonar o projeto (ou baixar do v0)
git clone <seu-repositorio>
cd auth-roles-system

# Instalar dependências
npm install
\`\`\`

### 3. Configurar Banco de Dados

#### Opção A: PostgreSQL Local
\`\`\`bash
# Instalar PostgreSQL no seu sistema
# Ubuntu/Debian:
sudo apt install postgresql postgresql-contrib

# macOS (com Homebrew):
brew install postgresql
brew services start postgresql

# Criar banco de dados
sudo -u postgres createdb escritorio_legal
\`\`\`

#### Opção B: Docker (Recomendado)
\`\`\`bash
# Criar container PostgreSQL
docker run --name postgres-escritorio \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=escritorio_legal \
  -p 5432:5432 \
  -d postgres:15

# Verificar se está rodando
docker ps
\`\`\`

### 4. Configurar Variáveis de Ambiente

Criar arquivo `.env.local` na raiz do projeto:

\`\`\`env
# Banco de dados
DATABASE_URL="postgresql://postgres:123456@localhost:5432/escritorio_legal"

# NextAuth
NEXTAUTH_SECRET="sua-chave-super-secreta-aqui-mude-isso"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 5. Configurar Prisma

\`\`\`bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações (criar tabelas)
npx prisma db push

# (Opcional) Visualizar banco no Prisma Studio
npx prisma studio
\`\`\`

### 6. Popular Banco com Dados Iniciais

Execute o script SQL ou use o Prisma Studio para inserir usuários:

**Usuários de Teste:**
- **Admin**: admin@escritorio.com / admin123
- **Advogado**: joao@escritorio.com / admin123  
- **Recepcionista**: maria@escritorio.com / admin123

### 7. Executar o Projeto

\`\`\`bash
# Modo desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:3000
\`\`\`

## 🧪 Como Testar

### 1. Teste de Autenticação
- Acesse `/login`
- Use qualquer um dos usuários de teste
- Verifique se o login funciona

### 2. Teste de Roles
- **Como ADMIN**: Acesse `/admin` - deve funcionar
- **Como USER**: Tente acessar `/admin` - deve ser bloqueado
- **Dashboard**: Cada role vê conteúdo diferente

### 3. Teste de Registro
- Acesse `/register`
- Crie um novo usuário
- Faça login com as novas credenciais

## 🔧 Comandos Úteis

\`\`\`bash
# Resetar banco de dados
npx prisma db push --force-reset

# Ver logs do banco (Docker)
docker logs postgres-escritorio

# Parar container (Docker)
docker stop postgres-escritorio

# Iniciar container (Docker)
docker start postgres-escritorio
\`\`\`

## 🐛 Troubleshooting

### Erro de Conexão com Banco
- Verifique se PostgreSQL está rodando
- Confirme a DATABASE_URL no .env.local
- Teste conexão: `npx prisma db push`

### Erro de Autenticação
- Verifique NEXTAUTH_SECRET no .env.local
- Limpe cookies do navegador
- Reinicie o servidor de desenvolvimento

### Erro de Prisma
\`\`\`bash
# Regenerar cliente
npx prisma generate

# Resetar e recriar banco
npx prisma db push --force-reset
