"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DevTools() {
  const { data: session } = useSession()
  const [showDevTools, setShowDevTools] = useState(false)

  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setShowDevTools(!showDevTools)} variant="outline" size="sm" className="mb-2">
        🛠️ Dev Tools
      </Button>

      {showDevTools && (
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-sm">Ferramentas de Desenvolvimento</CardTitle>
            <CardDescription>Informações da sessão atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {session ? (
              <>
                <div>
                  <strong>Usuário:</strong> {session.user.email}
                </div>
                <div>
                  <strong>Role:</strong> <Badge>{session.user.role}</Badge>
                </div>
                <div>
                  <strong>ID:</strong> <code className="text-xs">{session.user.id}</code>
                </div>
              </>
            ) : (
              <div>Não logado</div>
            )}

            <div className="pt-2 border-t">
              <strong>Usuários de Teste:</strong>
              <div className="text-xs space-y-1 mt-1">
                <div>admin@escritorio.com (ADMIN)</div>
                <div>joao@escritorio.com (ADVOGADO)</div>
                <div>maria@escritorio.com (RECEPCIONISTA)</div>
                <div>carlos@email.com (USER)</div>
                <div className="text-muted-foreground">Senha: admin123</div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <strong>Links Úteis:</strong>
              <div className="text-xs space-y-1 mt-1">
                <div>
                  <a href="http://localhost:5555" target="_blank" className="text-blue-500" rel="noreferrer">
                    Prisma Studio
                  </a>
                </div>
                <div>
                  <a href="/api/auth/session" target="_blank" className="text-blue-500" rel="noreferrer">
                    Session API
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
