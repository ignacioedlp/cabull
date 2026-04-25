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

// Create default business hours for all days of the week
export const createDefaultBusinessHours = async () => {
  try {
    const weekdays = [
      { weekday: 0, startTime: '09:00', endTime: '18:00', isClosed: false },
      { weekday: 1, startTime: '09:00', endTime: '18:00', isClosed: false },
      { weekday: 2, startTime: '09:00', endTime: '18:00', isClosed: false },
      { weekday: 3, startTime: '09:00', endTime: '18:00', isClosed: false },
      { weekday: 4, startTime: '09:00', endTime: '18:00', isClosed: false },
      { weekday: 5, startTime: '09:00', endTime: '18:00', isClosed: false },
      { weekday: 6, startTime: '09:00', endTime: '18:00', isClosed: false },
    ]

    const createdHours = []
    for (const day of weekdays) {
      const hours = await prisma.businessHours.upsert({
        where: { weekday: day.weekday },
        update: {},
        create: {
          weekday: day.weekday,
          startTime: day.startTime,
          endTime: day.endTime,
          isClosed: day.isClosed,
        },
      })
      createdHours.push(hours)
    }

    return { success: true, businessHours: createdHours }
  } catch {
    return { success: false, error: "Error al crear los horarios de negocio por defecto", businessHours: null }
  }
}
