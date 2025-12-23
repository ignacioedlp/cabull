/**
 * Página de Login para Admin
 * 
 * Esta página permite a los usuarios administradores iniciar sesión
 * usando magic links (enlaces mágicos) enviados por email.
 * 
 * Solo los usuarios que existan en la tabla admin_users y estén activos
 * podrán recibir el email con el magic link.
 */

"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailIcon, LoaderIcon, AlertCircleIcon } from "lucide-react"
import Image from "next/image"

// Componente interno que usa useSearchParams
function LoginForm() {
  const searchParams = useSearchParams()
  
  // Estados del formulario
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  // Verificar si hay un error en los query params (del middleware)
  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam === "unauthorized") {
      setError("No tenés autorización para acceder. Contactá al administrador.")
    }
  }, [searchParams])

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const redirectTo = searchParams.get("redirect") || "/admin/bookings"
      
      const response = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          redirectTo: redirectTo,
        }),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        setError("No se pudo enviar el enlace. Verificá que el email sea correcto y que tengas acceso.")
      } else {
        // Éxito: mostrar mensaje de confirmación
        setSuccess(true)
      }
    } catch (err) {
      console.error("Error al enviar magic link:", err)
      setError("Ocurrió un error. Intentá nuevamente más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Formulario de login */}
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-bold tracking-wider uppercase text-foreground"
            >
              Email
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 pl-10 pr-4 text-base"
                autoComplete="email"
              />
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircleIcon className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Botón de envío */}
          <Button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full h-12 text-base font-medium"
          >
            {isLoading ? (
              <>
                <LoaderIcon className="size-4 animate-spin mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <MailIcon className="size-4 mr-2" />
                Enviar enlace de acceso
              </>
            )}
          </Button>
        </form>
      ) : (
        // Mensaje de éxito
        <div className="space-y-6 text-center">
          <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex justify-center mb-4">
              <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center">
                <MailIcon className="size-8 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              ¡Email enviado!
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Revisá tu bandeja de entrada en <strong>{email}</strong> y hacé click en el enlace para acceder.
            </p>
            <p className="text-xs text-muted-foreground">
              El enlace expira en 15 minutos y solo puede usarse una vez.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSuccess(false)
              setEmail("")
            }}
            className="w-full"
          >
            Enviar a otro email
          </Button>
        </div>
      )}
    </>
  )
}

// Componente principal que envuelve LoginForm en Suspense
export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo y título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Cabull"
              width={120}
              height={40}
              className="dark:invert"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Acceso Admin
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Ingresá tu email para recibir un enlace de acceso
            </p>
          </div>
        </div>

        {/* Formulario envuelto en Suspense */}
        <Suspense fallback={
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-12 bg-muted animate-pulse rounded-lg" />
            </div>
            <div className="h-12 bg-muted animate-pulse rounded-lg" />
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Información adicional */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Solo usuarios autorizados pueden acceder al panel de administración.
          </p>
        </div>
      </div>
    </div>
  )
}

