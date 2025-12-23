"use server"

import { AdminRole } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/lib/generated/prisma/client"

// Get all active team members, sorted by name
export const getTeam = async () => {
  try {
    const team = await prisma.adminUser.findMany({
      where: {
        role: {
          in: [AdminRole.BARBER, AdminRole.STAFF, AdminRole.OWNER],
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
  role: AdminRole
  services: string[]
  enabled: boolean
  color: string | null
}) => {
  try {
    const newTeamMember = await prisma.adminUser.create({
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
  role: AdminRole
  services: string[]
  enabled: boolean
  color: string | null
}) => {
  try {
    const updatedTeamMember = await prisma.adminUser.update({
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
    const updatedTeamMember = await prisma.adminUser.update({
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
    const deletedTeamMember = await prisma.adminUser.delete({
      where: { id },
    })
    return { success: true, teamMember: deletedTeamMember }
  } catch {
    return { success: false, error: "Error al eliminar el miembro del equipo", teamMember: null }
  }
}