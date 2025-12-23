/**
 * Ruta API para obtener la sesión actual
 */

import { getSession } from "@/lib/auth/magic-link"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session_token")?.value

    if (!sessionToken) {
      return NextResponse.json({ session: null, user: null })
    }

    const session = await getSession(sessionToken)

    if (!session) {
      // Eliminar la cookie si la sesión no es válida
      cookieStore.delete("session_token")
      return NextResponse.json({ session: null, user: null })
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error en get-session:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

