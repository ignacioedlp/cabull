// Hacer un action para obtener los datos de analytics
// Recibimos un mes y un año, y nos devuelve los datos de analytics
// Listado de todos los turnos completados
// Listado de todos los turnos completados del mes anterior
// Esto servira para poder obtener la cantidad de turnos completados, el total de ingresos, la tasa de retencion de clientes, la cantidad de popularidad de servicios

"use server"

import { prisma } from "@/lib/prisma"
import { AppointmentStatus } from "@/lib/generated/prisma/enums"
import dayjs from "dayjs"
import { Appointment } from "@/lib/generated/prisma/client"

// Tipo para los appointments del mes actual (incluye customer)
type CurrentMonthAppointment = {
  id: string
  startAt: Date
  totalCost: number | null
  customerEmail: string
  customerId: string | null
  service: {
    id: string
    name: string
    basePrice: number | null
  }
  customer: {
    id: string
    email: string
    name: string | null
  } | null
}

// Tipo para los appointments del mes anterior (sin customer)
type PreviousMonthAppointment = {
  id: string
  totalCost: number | null
  customerEmail: string
  customerId: string | null
  service: {
    id: string
    name: string
    basePrice: number | null
  }
}

// create a interface for the analytics data
export interface AnalyticsData {
  currentMonth: {
    appointments: CurrentMonthAppointment[]
    count: number
    revenue: number
    uniqueClients: number
  },
  // previous month data
  previousMonth: {
    appointments: PreviousMonthAppointment[]
    count: number
    revenue: number
    uniqueClients: number
  },
  // metrics
  metrics: {
    retentionRate: number
    retainedClientsCount: number
    revenueChangePercent: number
    appointmentsChangePercent: number
    servicePopularity: {
      name: string
      count: number
      percentage: number
    }[]
  }
}

export const getAnalytics = async (month: string, year: string) => {
  try {
    // Convertir mes y año a números
    // month viene como string "01", "02", etc.
    const monthNum = parseInt(month, 10)
    const yearNum = parseInt(year, 10)

    // Validar que los valores sean válidos
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return {
        success: false,
        error: "Mes inválido"
      }
    }

    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
      return {
        success: false,
        error: "Año inválido"
      }
    }

    // Obtener el rango de fechas del mes especificado
    // dayjs usa meses basados en 0 (0 = enero, 11 = diciembre)
    const monthFormatted = month.padStart(2, '0')
    const startOfMonth = dayjs(`${yearNum}-${monthFormatted}-01`).startOf('month').toDate()
    const endOfMonth = dayjs(`${yearNum}-${monthFormatted}-01`).endOf('month').toDate()

    // Obtener el rango de fechas del mes anterior
    const previousMonthDate = dayjs(`${yearNum}-${monthFormatted}-01`).subtract(1, 'month')
    const startOfPreviousMonth = previousMonthDate.startOf('month').toDate()
    const endOfPreviousMonth = previousMonthDate.endOf('month').toDate()

    // Obtener todos los turnos completados del mes especificado
    const currentMonthAppointments = await prisma.appointment.findMany({
      where: {
        status: AppointmentStatus.COMPLETED,
        startAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      select: {
        id: true,
        startAt: true,
        totalCost: true,
        customerEmail: true,
        customerId: true,
        service: {
          select: {
            id: true,
            name: true,
            basePrice: true,
          },
        },
        customer: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    // Obtener todos los turnos completados del mes anterior
    const previousMonthAppointments = await prisma.appointment.findMany({
      where: {
        status: AppointmentStatus.COMPLETED,
        startAt: {
          gte: startOfPreviousMonth,
          lte: endOfPreviousMonth,
        },
      },
      select: {
        id: true,
        totalCost: true,
        customerEmail: true,
        customerId: true,
        service: {
          select: {
            id: true,
            name: true,
            basePrice: true,
          },
        },
      },
    })

    // Calcular métricas del mes actual
    const currentMonthCount = currentMonthAppointments.length
    const currentMonthRevenue = currentMonthAppointments.reduce((sum, appointment) => {
      // Usar totalCost si está disponible, sino usar basePrice del servicio
      return sum + (appointment.totalCost || appointment.service.basePrice || 0)
    }, 0)

    // Calcular métricas del mes anterior
    const previousMonthCount = previousMonthAppointments.length
    const previousMonthRevenue = previousMonthAppointments.reduce((sum, appointment) => {
      // Usar totalCost si está disponible, sino usar basePrice del servicio
      return sum + (appointment.totalCost || appointment.service.basePrice || 0)
    }, 0)

    // Calcular tasa de retención de clientes
    // Un cliente se considera "retenido" si tuvo turnos en ambos meses
    // Creamos sets de emails únicos para cada mes
    const currentMonthClients = new Set(
      currentMonthAppointments.map(apt => apt.customerEmail)
    )
    const previousMonthClients = new Set(
      previousMonthAppointments.map(apt => apt.customerEmail)
    )

    // Clientes que aparecen en ambos meses (retenidos)
    const retainedClients = new Set(
      Array.from(currentMonthClients).filter(email => previousMonthClients.has(email))
    )

    // Calcular porcentaje de retención
    // Si no hay clientes en el mes anterior, no podemos calcular retención
    const retentionRate = previousMonthClients.size > 0
      ? Math.round((retainedClients.size / previousMonthClients.size) * 100)
      : 0

    // Calcular popularidad de servicios (cantidad de turnos por servicio)
    const servicePopularity: Record<string, { name: string; count: number; percentage: number }> = {}

    // Contar turnos por servicio en el mes actual
    currentMonthAppointments.forEach(appointment => {
      const serviceId = appointment.service.id
      const serviceName = appointment.service.name

      if (!servicePopularity[serviceId]) {
        servicePopularity[serviceId] = {
          name: serviceName,
          count: 0,
          percentage: 0,
        }
      }
      servicePopularity[serviceId].count++
    })

    // Calcular porcentajes de popularidad
    Object.keys(servicePopularity).forEach(serviceId => {
      servicePopularity[serviceId].percentage = currentMonthCount > 0
        ? Math.round((servicePopularity[serviceId].count / currentMonthCount) * 100)
        : 0
    })

    // Convertir a array y ordenar por cantidad (más popular primero)
    const servicePopularityArray = Object.values(servicePopularity)
      .sort((a, b) => b.count - a.count)

    // Calcular porcentaje de cambio para turnos completados
    const appointmentsChangePercent = previousMonthCount > 0
      ? Math.round(((currentMonthCount - previousMonthCount) / previousMonthCount) * 100)
      : currentMonthCount > 0 ? 100 : 0

    // Calcular porcentaje de cambio para ingresos
    const revenueChangePercent = previousMonthRevenue > 0
      ? Math.round(((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100)
      : currentMonthRevenue > 0 ? 100 : 0

    // Retornar todos los datos calculados
    return {
      success: true,
      data: {
        // Datos del mes actual
        currentMonth: {
          appointments: currentMonthAppointments,
          count: currentMonthCount,
          revenue: currentMonthRevenue,
          uniqueClients: currentMonthClients.size,
        },
        // Datos del mes anterior
        previousMonth: {
          appointments: previousMonthAppointments,
          count: previousMonthCount,
          revenue: previousMonthRevenue,
          uniqueClients: previousMonthClients.size,
        },
        // Métricas calculadas
        metrics: {
          retentionRate,
          retainedClientsCount: retainedClients.size,
          servicePopularity: servicePopularityArray,
          appointmentsChangePercent,
          revenueChangePercent,
        },
      },
    }
  } catch (error) {
    console.error("Error al obtener analytics:", error)
    return {
      success: false,
      error: "Error al obtener los datos de analytics",
    }
  }
}