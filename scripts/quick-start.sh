#!/bin/bash

echo "🚀 Quick Start - Sistema de Autenticação"
echo "========================================"

# Verificar dependências
echo "1. Verificando dependências..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "   Instale Node.js 18+ em: https://nodejs.org"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker não encontrado. Usando PostgreSQL local..."
    echo "   Certifique-se de ter PostgreSQL rodando na porta 5432"
else
    echo "✅ Docker encontrado"
fi

# Instalar dependências
echo "2. Instalando dependências..."
npm install

# Configurar banco com Docker
if command -v docker &> /dev/null; then
    echo "3. Configurando PostgreSQL com Docker..."
    
    # Parar containers existentes
    docker stop postgres-escritorio 2>/dev/null || true
    docker rm postgres-escritorio 2>/dev/null || true
    
    # Criar novo container
    docker run --name postgres-escritorio \
        -e POSTGRES_PASSWORD=123456 \
        -e POSTGRES_DB=escritorio_legal \
        -p 5432:5432 \
        -d postgres:15
    
    echo "⏳ Aguardando PostgreSQL..."
    sleep 8
fi

# Criar .env.local
echo "4. Configurando variáveis de ambiente..."
cat > .env.local << 'EOL'
DATABASE_URL="postgresql://postgres:123456@localhost:5432/escritorio_legal"
NEXTAUTH_SECRET="dev-secret-key-change-in-production-12345678901234567890"
NEXTAUTH_URL="http://localhost:3000"
EOL

# Configurar Prisma
echo "5. Configurando banco de dados..."
npx prisma generate
npx prisma db push

echo ""
echo "🎉 Configuração concluída!"
echo ""
echo "Para iniciar:"
echo "  npm run dev"
echo ""
echo "Acesse: http://localhost:3000"
echo ""
echo "👤 Usuários de teste:"
echo "   admin@escritorio.com / admin123 (ADMIN)"
echo "   joao@escritorio.com / admin123 (ADVOGADO)"  
echo "   maria@escritorio.com / admin123 (RECEPCIONISTA)"
echo ""
echo "🛠️  Ferramentas:"
echo "   Prisma Studio: npx prisma studio"
echo "   Ver logs Docker: docker logs postgres-escritorio"
