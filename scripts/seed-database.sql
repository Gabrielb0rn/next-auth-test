-- Script para criar um usuário administrador inicial
-- Execute este script após configurar o banco de dados

-- Inserir usuário admin (senha: admin123)
-- Hash bcrypt para 'admin123': $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF.
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  'admin-seed-001',
  'Administrador',
  'admin@escritorio.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF.',
  'ADMIN',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Inserir usuário advogado de exemplo
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  'advogado-seed-001',
  'Dr. João Silva',
  'joao@escritorio.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF.',
  'ADVOGADO',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Inserir usuário recepcionista de exemplo
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  'recep-seed-001',
  'Maria Santos',
  'maria@escritorio.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF.',
  'RECEPCIONISTA',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;
