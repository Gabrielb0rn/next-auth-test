"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/components/role-guard"

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de controle</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Usuário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Nome:</span>
            <span>{session.user.name || "Não informado"}</span>
          </div>
          <div className="flex justify-between">
            <span>Email:</span>
            <span>{session.user.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Função:</span>
            <Badge>{session.user.role}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <RoleGuard allowedRoles={["ADMIN", "ADVOGADO"]}>
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Casos</CardTitle>
              <CardDescription>Acesso disponível para Advogados e Administradores</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Aqui você pode gerenciar os casos do escritório.</p>
            </CardContent>
          </Card>
        </RoleGuard>

        <RoleGuard allowedRoles={["ADMIN", "RECEPCIONISTA"]}>
          <Card>
            <CardHeader>
              <CardTitle>Atendimento</CardTitle>
              <CardDescription>Acesso disponível para Recepcionistas e Administradores</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Gerencie o atendimento aos clientes.</p>
            </CardContent>
          </Card>
        </RoleGuard>

        <RoleGuard allowedRoles={["ADMIN"]}>
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>Acesso exclusivo para Administradores</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Configure as definições do sistema.</p>
            </CardContent>
          </Card>
        </RoleGuard>

        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Disponível para todos os usuários</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Gerencie suas informações pessoais.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
