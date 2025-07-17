"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
  const { data: session } = useSession()

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive"
      case "ADVOGADO":
        return "default"
      case "RECEPCIONISTA":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Escritório Legal
          </Link>

          {session && (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>

              {session.user.role === "ADMIN" && (
                <Link href="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Olá, {session.user.name || session.user.email}</span>
                <Badge variant={getRoleBadgeVariant(session.user.role)}>{session.user.role}</Badge>
              </div>
              <Button onClick={() => signOut()} variant="outline">
                Sair
              </Button>
            </>
          ) : (
            <div className="space-x-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Registrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
