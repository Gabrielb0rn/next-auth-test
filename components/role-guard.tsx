"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface RoleGuardProps {
  allowedRoles: string[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Carregando...</div>
  }

  if (!session) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Você precisa estar logado para acessar esta página.</AlertDescription>
      </Alert>
    )
  }

  if (!allowedRoles.includes(session.user.role)) {
    return (
      fallback || (
        <Alert variant="destructive">
          <AlertDescription>Você não tem permissão para acessar esta página.</AlertDescription>
        </Alert>
      )
    )
  }

  return <>{children}</>
}
