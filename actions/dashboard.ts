/**
 * Server Actions para el dashboard del admin
 * 
 * Estas acciones proporcionan datos rápidos para la página principal del admin
 */

"use server"

import { prisma } from "@/lib/prisma"
import { AppointmentStatus } from "@/lib/generated/prisma/enums"
import dayjs from "dayjs"

/**
 * Obtiene estadísticas rápidas para el dashboard
 * 
 * @returns Estadísticas del día actual y generales
 */
export async function getDashboardStats() {
  try {
    // Obtener la fecha de hoy
    const today = dayjs().startOf('day').toDate()
    const endOfToday = dayjs().endOf('day').toDate()

    // Contar turnos de hoy
    const todayAppointments = await prisma.appointment.count({
      where: {
        startAt: {
          gte: today,
          lte: endOfToday,
        },
      },
    })

    // Contar turnos confirmados de hoy
    const todayConfirmed = await prisma.appointment.count({
      where: {
        startAt: {
          gte: today,
          lte: endOfToday,
        },
        status: AppointmentStatus.CONFIRMED,
      },
    })

    // Contar total de clientes
    const totalClients = await prisma.user.count()

    // Contar turnos pendientes (próximos 7 días)
    const nextWeek = dayjs().add(7, 'days').endOf('day').toDate()
    const upcomingAppointments = await prisma.appointment.count({
      where: {
        startAt: {
          gte: today,
          lte: nextWeek,
        },
        status: {
          in: [AppointmentStatus.CONFIRMED, AppointmentStatus.PENDING_CONFIRMATION],
        },
      },
    })

    // Obtener ingresos del mes actual
    const startOfMonth = dayjs().startOf('month').toDate()
    const endOfMonth = dayjs().endOf('month').toDate()

    const monthlyAppointments = await prisma.appointment.findMany({
      where: {
        status: AppointmentStatus.COMPLETED,
        startAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      select: {
        totalCost: true,
        service: {
          select: {
            basePrice: true,
          },
        },
      },
    })

    const monthlyRevenue = monthlyAppointments.reduce((sum, appointment) => {
      return sum + (appointment.totalCost || appointment.service.basePrice || 0)
    }, 0)

    return {
      success: true,
      stats: {
        todayAppointments,
        todayConfirmed,
        totalClients,
        upcomingAppointments,
        monthlyRevenue,
      },
    }
  } catch (error) {
    console.error("Error al obtener estadísticas del dashboard:", error)
    return {
      success: false,
      error: "Error al obtener estadísticas",
      stats: {
        todayAppointments: 0,
        todayConfirmed: 0,
        totalClients: 0,
        upcomingAppointments: 0,
        monthlyRevenue: 0,
      },
    }
  }
}

