#!/bin/bash

echo "🚀 Configurando ambiente local..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se Docker está disponível
if command -v docker &> /dev/null; then
    echo "🐳 Docker encontrado. Configurando PostgreSQL..."
    
    # Parar container existente se houver
    docker stop postgres-escritorio 2>/dev/null || true
    docker rm postgres-escritorio 2>/dev/null || true
    
    # Criar novo container PostgreSQL
    docker run --name postgres-escritorio \
        -e POSTGRES_PASSWORD=123456 \
        -e POSTGRES_DB=escritorio_legal \
        -p 5432:5432 \
        -d postgres:15
    
    echo "⏳ Aguardando PostgreSQL inicializar..."
    sleep 5
    
else
    echo "⚠️  Docker não encontrado. Certifique-se de ter PostgreSQL rodando localmente."
fi

# Criar arquivo .env.local se não existir
if [ ! -f .env.local ]; then
    echo "📝 Criando arquivo .env.local..."
    cat > .env.local << EOL
# Banco de dados
DATABASE_URL="postgresql://postgres:123456@localhost:5432/escritorio_legal"

# NextAuth
NEXTAUTH_SECRET="$(openssl rand -hex 32)"
NEXTAUTH_URL="http://localhost:3000"
EOL
    echo "✅ Arquivo .env.local criado!"
else
    echo "✅ Arquivo .env.local já existe."
fi

# Configurar Prisma
echo "🗄️  Configurando banco de dados..."
npx prisma generate
npx prisma db push

echo "🎉 Configuração concluída!"
echo ""
echo "Para iniciar o projeto:"
echo "  npm run dev"
echo ""
echo "Usuários de teste:"
echo "  Admin: admin@escritorio.com / admin123"
echo "  Advogado: joao@escritorio.com / admin123"
echo "  Recepcionista: maria@escritorio.com / admin123"
