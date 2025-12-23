"use server"

import { prisma } from "@/lib/prisma"

// Get all active services, sorted by name
export const getServices = async (onlyActive: boolean = true) => {
  try {
    const services = await prisma.service.findMany({
      where: {
        ...(onlyActive ? { active: true } : {}),
      },
      select: {
        id: true,
        name: true,
        description: true,
        durationMinutes: true,
        basePrice: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        features: true,
      },
      orderBy: {
        name: "asc", // Sort by name alphabetically
      },
    })

    return { success: true, services }
  } catch (error) {
    return { success: false, error: "Error al obtener los servicios", services: [] }
  }
}

export const updateService = async (service: {
  id: string
  name: string
  active: boolean
  description: string | null
  durationMinutes: number
  basePrice: number | null
  features: string[]
}) => {
  try {
    const updatedService = await prisma.service.update({
      where: { id: service.id },
      data: {
        name: service.name,
        active: service.active,
        description: service.description || null,
        durationMinutes: service.durationMinutes,
        basePrice: service.basePrice || null,
        features: service.features || [],
      },
    })
    return { success: true, service: updatedService }
  } catch (error) {
    return { success: false, error: "Error al actualizar el servicio", service: null }
  }
}

export const createService = async (service: {
  name: string
  active: boolean
  description: string | null
  durationMinutes: number
  basePrice: number | null
  features: string[]
}) => {
  try {
    const newService = await prisma.service.create({
      data: {
        name: service.name,
        active: service.active,
        description: service.description || null,
        durationMinutes: service.durationMinutes,
        basePrice: service.basePrice || null,
        features: service.features || [],
      },
    })
    return { success: true, service: newService }
  } catch (error) {
    return { success: false, error: "Error al crear el servicio", service: null }
  }
}

export const deleteService = async (id: string) => {
  try {
    const deletedService = await prisma.service.delete({
      where: { id: id },
    })
    return { success: true, service: deletedService }
  } catch (error) {
    return { success: false, error: "Error al eliminar el servicio", service: null }
  }
}