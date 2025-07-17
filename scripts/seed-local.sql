-- Script para popular banco local com dados de teste
-- Execute após configurar o banco

-- Limpar dados existentes (opcional)
-- DELETE FROM users;

-- Inserir usuário administrador
-- Senha: admin123 (hash bcrypt)
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  'clp123admin001',
  'Administrador Sistema',
  'admin@escritorio.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF.',
  'ADMIN',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Inserir advogado
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  'clp123adv001',
  'Dr. João Silva',
  'joao@escritorio.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF.',
  'ADVOGADO',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Inserir recepcionista
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  'clp123rec001',
  'Maria Santos',
  'maria@escritorio.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF.',
  'RECEPCIONISTA',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Inserir usuário comum
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  'clp123user001',
  'Carlos Cliente',
  'carlos@email.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF.',
  'USER',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Verificar dados inseridos
SELECT id, name, email, role, created_at FROM users ORDER BY created_at;
