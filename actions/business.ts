"use server"

import { prisma } from "@/lib/prisma"

// Get the business rules

export const getBusinessRules = async () => {
  try {
    const businessRules = await prisma.businessRules.findFirst()
    return { success: true, businessRules }
  } catch {
    return { success: false, error: "Error al obtener las reglas de negocio", businessRules: null }
  }
}

export const updateBusinessRules = async (businessRules: {
  reservationWindow: number
  reservationInterval: number
  id: string
}) => {
  try {
    const updatedBusinessRules = await prisma.businessRules.update({
      where: { id: businessRules.id },
      data: businessRules,
    })
    return { success: true, businessRules: updatedBusinessRules }
  } catch {
    return { success: false, error: "Error al actualizar las reglas de negocio", businessRules: null }
  }
}

// Get the business hours
export const getBusinessHours = async () => {
  try {
    const businessHours = await prisma.businessHours.findMany()
    return { success: true, businessHours }
  } catch {
    return { success: false, error: "Error al obtener los horarios de negocio", businessHours: null }
  }
}

// Update the business hours    
export const updateBusinessHours = async (businessHours: {
  id: string
  weekday: number
  startTime: string
  endTime: string
  isClosed: boolean
}) => {
  try {
    const updatedBusinessHours = await prisma.businessHours.update({
      where: { id: businessHours.id },
      data: businessHours,
    })
    return { success: true, businessHours: updatedBusinessHours }
  } catch {
    return { success: false, error: "Error al actualizar los horarios de negocio", businessHours: null }
  }
}
