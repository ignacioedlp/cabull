/**
 * Sistema de Magic Link personalizado
 * 
 * Este módulo maneja la autenticación con magic links sin usar Better Auth.
 * Usa las tablas existentes: admin_users, sessions, verification_tokens
 */

import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { Resend } from "resend"
import React from "react"
import MagicLinkEmail from "@/components/emails/magic-link-email"

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Genera un token único para el magic link
 */
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

/**
 * Envía un magic link por email
 */
export async function sendMagicLink(email: string, redirectTo: string = "/admin/bookings") {
  try {
    // Verificar que el usuario existe en admin_users y está activo
    const adminUser = await prisma.adminUser.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
      },
    })

    // Si el usuario no existe o no está activo, no revelamos esto por seguridad
    if (!adminUser || !adminUser.active) {
      console.warn(`Intento de login con email no autorizado: ${email}`)
      // Devolvemos éxito para no revelar si el email existe o no
      return { success: true }
    }

    // Generar token único
    const token = generateToken()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos

    // Eliminar tokens anteriores para este email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    })

    // Guardar el token en la base de datos
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: expiresAt,
      },
    })

    // Generar la URL del magic link
    const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const magicLinkUrl = `${baseURL}/api/auth/verify-magic-link?token=${token}&email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirectTo)}`

    // Enviar el email usando el componente de React Email
    await resend.emails.send({
      from: `Cabull Admin <no-reply@${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: "🔐 Tu enlace de acceso a Cabull Admin",
      react: MagicLinkEmail({
        adminName: adminUser.name || undefined,
        magicLinkUrl: magicLinkUrl,
      }) as React.ReactElement,
    })

    return { success: true }
  } catch (error) {
    console.error("Error al enviar magic link:", error)
    return { success: false, error: "Error al enviar el email" }
  }
}

/**
 * Verifica un magic link y crea una sesión
 */
export async function verifyMagicLink(token: string, email: string) {
  try {
    // Buscar el token en la base de datos
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
    })

    // Verificar que el token existe y no ha expirado
    if (!verificationToken) {
      return { success: false, error: "Token inválido" }
    }

    if (verificationToken.expires < new Date()) {
      // Eliminar el token expirado
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token: token,
          },
        },
      })
      return { success: false, error: "Token expirado" }
    }

    // Verificar que el usuario existe y está activo
    const adminUser = await prisma.adminUser.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
      },
    })

    if (!adminUser || !adminUser.active) {
      return { success: false, error: "Usuario no autorizado" }
    }

    // Generar token de sesión
    const sessionToken = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días

    // Crear la sesión
    const session = await prisma.session.create({
      data: {
        userId: adminUser.id,
        token: sessionToken,
        expiresAt: expiresAt,
        ipAddress: null,
        userAgent: null,
      },
    })

    // Eliminar el token de verificación (solo se puede usar una vez)
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
    })

    return {
      success: true,
      sessionToken,
      userId: adminUser.id,
    }
  } catch (error) {
    console.error("Error al verificar magic link:", error)
    return { success: false, error: "Error al verificar el token" }
  }
}

/**
 * Obtiene la sesión actual del usuario
 */
export async function getSession(sessionToken: string) {
  try {
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            active: true,
          },
        },
      },
    })

    // Verificar que la sesión existe y no ha expirado
    if (!session) {
      return null
    }

    if (session.expiresAt < new Date()) {
      // Eliminar la sesión expirada
      await prisma.session.delete({
        where: { token: sessionToken },
      })
      return null
    }

    // Verificar que el usuario está activo
    if (!session.user.active) {
      return null
    }

    return {
      session: {
        id: session.id,
        userId: session.userId,
        token: session.token,
        expiresAt: session.expiresAt,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      },
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
    }
  } catch (error) {
    console.error("Error al obtener sesión:", error)
    return null
  }
}

/**
 * Cierra la sesión del usuario
 */
export async function signOut(sessionToken: string) {
  try {
    await prisma.session.delete({
      where: { token: sessionToken },
    })
    return { success: true }
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    return { success: false }
  }
}

