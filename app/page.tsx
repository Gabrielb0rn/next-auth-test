import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Escritório Legal</h1>
        <p className="text-xl text-muted-foreground">Sistema de gestão com controle de acesso por roles</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades</CardTitle>
            <CardDescription>O que nosso sistema oferece</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Autenticação segura</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Controle de acesso por roles</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Dashboard personalizado</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Gestão de usuários</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles Disponíveis</CardTitle>
            <CardDescription>Diferentes níveis de acesso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Administrador</span>
              <span className="text-sm text-muted-foreground">Acesso total</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Advogado</span>
              <span className="text-sm text-muted-foreground">Gestão de casos</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Recepcionista</span>
              <span className="text-sm text-muted-foreground">Atendimento</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Usuário</span>
              <span className="text-sm text-muted-foreground">Acesso básico</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-x-4">
        <Link href="/login">
          <Button size="lg">Fazer Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline" size="lg">
            Criar Conta
          </Button>
        </Link>
      </div>
    </div>
  )
}
