/**
 * Server Actions para autenticación
 * 
 * Estas acciones se ejecutan en el servidor y manejan la autenticación
 * con magic links y sesiones.
 */

"use server"

import { signOut, getSession } from "@/lib/auth/magic-link"
import { cookies } from "next/headers"

/**
 * Cierra la sesión del usuario actual
 * 
 * Esta función:
 * 1. Obtiene el token de sesión de las cookies
 * 2. Elimina la sesión de la base de datos
 * 3. Elimina la cookie de sesión
 * 
 * Nota: No redirige aquí porque redirect() lanza una excepción especial.
 * La redirección debe manejarse en el componente cliente.
 * 
 * @returns {Promise<{ success: boolean }>} Indica si el logout fue exitoso
 */
export async function logout() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session_token")?.value

    if (sessionToken) {
      // Eliminar la sesión de la base de datos
      await signOut(sessionToken)
    }

    // Eliminar la cookie de sesión
    cookieStore.delete("session_token")

    return { success: true }
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    // Aún así intentar eliminar la cookie
    try {
      const cookieStore = await cookies()
      cookieStore.delete("session_token")
    } catch (e) {
      // Ignorar errores al eliminar la cookie
    }
    return { success: false, error: "Error al cerrar sesión" }
  }
}

/**
 * Obtiene la sesión actual del usuario
 * 
 * @returns La sesión del usuario o null si no hay sesión válida
 */
export async function getCurrentSession() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session_token")?.value

    if (!sessionToken) {
      return null
    }

    const session = await getSession(sessionToken)
    return session
  } catch (error) {
    console.error("Error al obtener sesión:", error)
    return null
  }
}

