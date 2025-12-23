/**
 * Ruta API para cerrar sesión
 */

import { signOut } from "@/lib/auth/magic-link"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session_token")?.value

    if (sessionToken) {
      await signOut(sessionToken)
    }

    // Eliminar la cookie
    cookieStore.delete("session_token")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en sign-out:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

