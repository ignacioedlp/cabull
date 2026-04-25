/**
 * Server Actions para autenticación
 *
 * Estas acciones se ejecutan en el servidor y manejan la autenticación
 * con Google OAuth via Better Auth.
 */

"use server"

import { auth } from "@/lib/auth"

/**
 * Obtiene la sesión actual del usuario
 *
 * @returns La sesión del usuario o null si no hay sesión válida
 */
export async function getCurrentSession() {
  try {
    const result = await auth.api.getSession({
      headers: {},
    })
    return result
  } catch (error) {
    console.error("Error al obtener sesión:", error)
    return null
  }
}

/**
 * Obtiene el usuario actual con todos sus campos, incluyendo role
 */
export async function getCurrentUser() {
  try {
    const { headers } = await import("next/headers")
    const requestHeaders = await headers()

    const session = await auth.api.getSession({
      headers: requestHeaders,
    })

    if (!session?.user?.id) {
      return null
    }

    const { prisma } = await import("@/lib/prisma")
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    return user
  } catch (error) {
    console.error("Error al obtener usuario:", error)
    return null
  }
}

/**
 * Cierra sesión del usuario actual
 */
export async function logout() {
  try {
    const { headers } = await import("next/headers")
    const requestHeaders = await headers()

    await auth.api.signOut({
      headers: requestHeaders,
    })
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    throw error
  }
}

