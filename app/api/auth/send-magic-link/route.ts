/**
 * Ruta API para enviar magic links
 */

import { sendMagicLink } from "@/lib/auth/magic-link"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, redirectTo } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      )
    }

    const result = await sendMagicLink(email, redirectTo || "/admin/bookings")

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Error al enviar el magic link" },
        { status: 500 }
      )
    }

    // Siempre devolvemos éxito para no revelar si el email existe o no
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en send-magic-link:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

