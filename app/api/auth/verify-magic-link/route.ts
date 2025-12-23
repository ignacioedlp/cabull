/**
 * Ruta API para verificar magic links
 */

import { verifyMagicLink } from "@/lib/auth/magic-link"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")
    const email = searchParams.get("email")
    const redirectTo = searchParams.get("redirect") || "/admin/bookings"

    if (!token || !email) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid_token", request.url))
    }

    const result = await verifyMagicLink(token, email)

    if (!result.success) {
      return NextResponse.redirect(new URL(`/admin/login?error=${result.error}`, request.url))
    }

    // Establecer la cookie de sesión
    const cookieStore = await cookies()
    cookieStore.set("session_token", result.sessionToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    })

    // Redirigir a la página solicitada
    return NextResponse.redirect(new URL(redirectTo, request.url))
  } catch (error) {
    console.error("Error en verify-magic-link:", error)
    return NextResponse.redirect(new URL("/admin/login?error=server_error", request.url))
  }
}

