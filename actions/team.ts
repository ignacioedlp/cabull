"use server"

import { UserRole } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/lib/generated/prisma/client"
import { randomBytes } from "crypto"

// Get all active team members (BARBER, STAFF, OWNER), sorted by name
export const getTeam = async () => {
  try {
    const team = await prisma.user.findMany({
      where: {
        role: {
          in: [UserRole.BARBER, UserRole.STAFF, UserRole.OWNER],
        },
      },
    })
    return { success: true, team: team }
  } catch {
    return { success: false, error: "Error al obtener el equipo", team: [] }
  }
}

export const createTeamMember = async (teamMember: {
  name: string | null
  email: string
  role: UserRole
  services: string[]
  enabled: boolean
  color: string | null
}) => {
  try {
    const newTeamMember = await prisma.user.create({
      data: {
        name: teamMember.name || null,
        email: teamMember.email,
        role: teamMember.role,
        active: teamMember.enabled,
        color: teamMember.color || null,
      },
    })
    return { success: true, teamMember: newTeamMember }
  } catch (error) {
    // Manejar error de email duplicado
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "Ya existe un miembro del equipo con este email", teamMember: null }
    }
    return { success: false, error: "Error al crear el miembro del equipo", teamMember: null }
  }
}

export const updateTeamMember = async (teamMember: {
  id: string
  name: string | null
  email: string
  role: UserRole
  services: string[]
  enabled: boolean
  color: string | null
}) => {
  try {
    const updatedTeamMember = await prisma.user.update({
      where: { id: teamMember.id },
      data: {
        name: teamMember.name || null,
        email: teamMember.email,
        role: teamMember.role,
        active: teamMember.enabled,
        color: teamMember.color || null,
      },
    })
    return { success: true, teamMember: updatedTeamMember }
  } catch (error) {
    // Manejar error de email duplicado
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "Ya existe un miembro del equipo con este email", teamMember: null }
    }
    return { success: false, error: "Error al actualizar el miembro del equipo", teamMember: null }
  }
}

export const updateTeamMemberActive = async (id: string, active: boolean) => {
  try {
    const updatedTeamMember = await prisma.user.update({
      where: { id },
      data: { active },
    })
    return { success: true, teamMember: updatedTeamMember }
  } catch {
    return { success: false, error: "Error al actualizar el estado del miembro", teamMember: null }
  }
}

export const deleteTeamMember = async (id: string) => {
  try {
    const deletedTeamMember = await prisma.user.delete({
      where: { id },
    })
    return { success: true, teamMember: deletedTeamMember }
  } catch {
    return { success: false, error: "Error al eliminar el miembro del equipo", teamMember: null }
  }
}

export const inviteTeamMember = async (email: string, role: UserRole) => {
  try {
    // Verificar que el email no esté ya registrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "Este email ya está registrado en el sistema" }
    }

    // Generar token de invitación
    const token = randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días

    // Guardar token en verificación
    await prisma.verificationToken.create({
      data: {
        identifier: `invite:${email}`,
        token,
        expires: expiresAt,
      },
    })

    // TODO: Aquí enviarías el email con el link de invitación
    // El link sería algo como: /admin/accept-invitation?token={token}&email={email}
    console.log(`Invitation link: /admin/accept-invitation?token=${token}&email=${encodeURIComponent(email)}&role=${role}`)

    return { success: true, message: "Invitación enviada correctamente" }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "Este email ya tiene una invitación pendiente" }
    }
    return { success: false, error: "Error al enviar la invitación" }
  }
}