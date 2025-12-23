/**
 * Middleware de Next.js para proteger rutas de admin
 * 
 * Este middleware se ejecuta antes de que cualquier request llegue a las páginas.
 * Verifica si el usuario está autenticado antes de permitir el acceso a las rutas /admin/*
 * 
 * Si el usuario no está autenticado, lo redirige a /admin/login
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "@/lib/auth/magic-link"

export async function proxy(request: NextRequest) {
  // Solo proteger rutas que empiecen con /admin
  // Excluir /admin/login y /api/auth para evitar loops de redirección
  if (request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login") &&
    !request.nextUrl.pathname.startsWith("/api/auth")) {

    try {
      // Obtener la cookie de sesión
      const sessionToken = request.cookies.get("session_token")?.value

      // Si no hay token de sesión, redirigir a login
      if (!sessionToken) {
        const loginUrl = new URL("/admin/login", request.url)
        loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }

      // Verificar la sesión
      const session = await getSession(sessionToken)

      // Si no hay sesión válida, redirigir a login
      if (!session || !session.user) {
        const loginUrl = new URL("/admin/login", request.url)
        loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }

      // Si todo está bien, permitir el acceso
      return NextResponse.next()
    } catch (error) {
      // En caso de error, redirigir a login
      console.error("Error en middleware de autenticación:", error)
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Para todas las demás rutas, permitir el acceso sin verificación
  return NextResponse.next()
}

// Configurar qué rutas deben pasar por este middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

