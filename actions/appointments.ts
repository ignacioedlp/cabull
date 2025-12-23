"use server"

import { prisma } from "@/lib/prisma"
import { AppointmentStatus } from "@/lib/generated/prisma/enums"
import dayjs from "dayjs"
import crypto from "crypto"
import { headers } from "next/headers"
import { Prisma } from "@/lib/generated/prisma/client"
import { Resend } from "resend"
import ConfirmAppointmentEmail from "@/components/emails/booking-confirmation"

// Helper function to get client IP address
// Obtiene la IP del cliente desde los headers de la request
async function getClientIP(): Promise<string> {
  try {
    const headersList = await headers()
    // Intentar obtener la IP real del cliente
    // x-forwarded-for contiene la IP real cuando hay proxies (Vercel, Cloudflare, etc.)
    const forwardedFor = headersList.get("x-forwarded-for")
    if (forwardedFor) {
      // x-forwarded-for puede contener múltiples IPs separadas por coma
      // La primera es generalmente la IP real del cliente
      return forwardedFor.split(",")[0].trim()
    }

    // Fallback a x-real-ip si está disponible
    const realIP = headersList.get("x-real-ip")
    if (realIP) {
      return realIP.trim()
    }

    // Si no hay headers de proxy, intentar con remote-address
    const remoteAddr = headersList.get("remote-addr")
    if (remoteAddr) {
      return remoteAddr.trim()
    }

    // Si no se puede obtener la IP, retornar "unknown"
    // Esto puede pasar en desarrollo local
    return "unknown"
  } catch {
    // En caso de error, retornar "unknown"
    return "unknown"
  }
}

// Get all appointments for a given day
export const getAppointmentsForDay = async (date: string | Date) => {
  try {
    // Convertir la fecha a inicio y fin del día
    const startOfDay = dayjs(date).startOf('day').toDate()
    const endOfDay = dayjs(date).endOf('day').toDate()

    const appointments = await prisma.appointment.findMany({
      where: {
        startAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        id: true,
        startAt: true,
        serviceId: true,
        status: true,
        service: {
          select: {
            name: true,
            basePrice: true,
            durationMinutes: true,
          },
        },
        barber: {
          select: {
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            email: true,
            name: true,
          },
        },
        customerEmail: true,
      },
      orderBy: {
        startAt: 'asc',
      },
    })
    return { success: true, appointments }
  } catch {
    return { success: false, error: "Error al obtener los turnos para el día", appointments: [] }
  }
}

// Get available time slots for a specific date
export const getAvailableTimeSlots = async (date: string | Date) => {
  try {
    // Obtener business rules (intervalo de reservas)
    const businessRules = await prisma.businessRules.findFirst()
    if (!businessRules) {
      return { success: false, error: "No se encontraron reglas de negocio", slots: [] }
    }

    // Obtener business hours para el día de la semana
    const dayOfWeek = dayjs(date).day() // 0 = domingo, 1 = lunes, etc.
    const businessHours = await prisma.businessHours.findUnique({
      where: { weekday: dayOfWeek },
    })

    if (!businessHours || businessHours.isClosed) {
      return { success: true, slots: [] } // El negocio está cerrado ese día
    }

    // Obtener appointments existentes para ese día
    const appointmentsResult = await getAppointmentsForDay(date)
    if (!appointmentsResult.success) {
      return { success: false, error: appointmentsResult.error, slots: [] }
    }

    const existingAppointments = appointmentsResult.appointments

    // Crear un Set de horarios ocupados (formato HH:mm)
    const occupiedSlots = new Set<string>()
    existingAppointments.forEach((apt) => {
      const timeSlot = dayjs(apt.startAt).format('HH:mm')
      occupiedSlots.add(timeSlot)
    })

    // Generar slots disponibles basándose en el intervalo
    const slots: Array<{ time: string; available: boolean }> = []
    const interval = businessRules.reservationInterval // en minutos

    // Parsear hora de inicio y fin
    const [startHour, startMinute] = businessHours.startTime.split(':').map(Number)
    const [endHour, endMinute] = businessHours.endTime.split(':').map(Number)

    let currentTime = dayjs(date).hour(startHour).minute(startMinute).second(0).millisecond(0)
    const endTime = dayjs(date).hour(endHour).minute(endMinute).second(0).millisecond(0)

    // Generar slots hasta llegar al final del horario
    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      const timeString = currentTime.format('HH:mm')
      const isOccupied = occupiedSlots.has(timeString)
      const ifPastTime = currentTime.isBefore(dayjs())

      slots.push({
        time: timeString,
        available: !isOccupied && !ifPastTime,
      })

      // Avanzar al siguiente slot según el intervalo
      currentTime = currentTime.add(interval, 'minute')
    }

    return { success: true, slots }
  } catch {
    return { success: false, error: "Error al obtener los horarios disponibles", slots: [] }
  }
}

// Create a new appointment
export const createAppointment = async (data: {
  serviceId: string
  customerEmail: string
  startAt: string | Date // Fecha y hora del turno
  barberId: string
  status?: AppointmentStatus | null
}) => {
  try {
    // ============================================
    // CONTROL DE INTENTOS - Múltiples capas de protección
    // ============================================


    // Control 1: Verificar si el email ya tiene un turno activo (pendiente o confirmado) en el mismo dia del turno que se está creando
    const sameDayStart = dayjs(data.startAt).startOf('day').toDate()
    const sameDayEnd = dayjs(data.startAt).endOf('day').toDate()
    const existingActiveAppointment = await prisma.appointment.findFirst({
      where: {
        customerEmail: data.customerEmail,
        startAt: {
          gte: sameDayStart,
          lte: sameDayEnd,
        },
        status: {
          // Solo considerar turnos que están activos (no cancelados ni expirados)
          notIn: [AppointmentStatus.CANCELLED, AppointmentStatus.EXPIRED],
        },
      },
      orderBy: {
        startAt: 'asc', // Ordenar por fecha más cercana
      },
    })

    if (existingActiveAppointment) {
      const appointmentDate = dayjs(existingActiveAppointment.startAt).format('DD/MM/YYYY HH:mm')
      return {
        success: false,
        error: `Ya tienes un turno reservado para el ${appointmentDate}. Solo puedes tener un turno activo a la vez.`,
        appointment: null,
      }
    }

    // Control 2: Rate limiting por IP (evita abuso usando diferentes emails desde la misma IP)
    const clientIP = await getClientIP()

    // Solo aplicar rate limiting si pudimos obtener la IP (no en desarrollo local)
    if (clientIP !== "unknown") {
      const fifteenMinutesAgo = dayjs().subtract(50, 'minutes').toDate()

      // Contar intentos recientes desde esta IP
      const recentAttemptsByIP = await prisma.rateLimitAttempt.count({
        where: {
          ipAddress: clientIP,
          createdAt: {
            gte: fifteenMinutesAgo,
          },
        },
      })

      const MAX_ATTEMPTS_PER_IP_PER_50MIN = 10
      if (recentAttemptsByIP >= MAX_ATTEMPTS_PER_IP_PER_50MIN) {
        return {
          success: false,
          error: "Has realizado demasiadas solicitudes desde esta dirección. Por favor, espera unos minutos antes de intentar nuevamente.",
          appointment: null,
        }
      }

      // Registrar este intento en la base de datos
      // El registro expirará después de 1 hora para limpieza automática
      const expiresAt = dayjs().add(1, 'hour').toDate()
      await prisma.rateLimitAttempt.create({
        data: {
          ipAddress: clientIP,
          expiresAt: expiresAt,
        },
      })
    }

    // Validar que el servicio existe y está activo
    const service = await prisma.service.findUnique({
      where: { id: data.serviceId },
    })

    if (!service || !service.active) {
      return { success: false, error: "El servicio no existe o no está disponible", appointment: null }
    }

    // Validar que el barbero existe y está activo
    const barber = await prisma.adminUser.findUnique({
      where: { id: data.barberId },
    })

    if (!barber || !barber.active) {
      return { success: false, error: "El barbero no existe o no está disponible", appointment: null }
    }

    const confirmationToken = crypto.randomUUID()
    const confirmationTokenHash = crypto.createHash('sha256').update(confirmationToken).digest('hex')
    const confirmationExpiresAt = dayjs().add(1, 'hour').toDate()

    // Crear el appointment
    const appointment = await prisma.appointment.create({
      data: {
        serviceId: data.serviceId,
        customerEmail: data.customerEmail,
        startAt: data.startAt,
        barberId: data.barberId,
        status: data.status || AppointmentStatus.PENDING_CONFIRMATION,
        confirmationTokenHash: confirmationTokenHash,
        confirmationExpiresAt: confirmationExpiresAt,
      },
    })

    if (data.status === AppointmentStatus.CONFIRMED) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: `Cabull <no-reply@${process.env.RESEND_FROM_EMAIL}>`,
        to: [data.customerEmail],
        subject: "✂️ Confirmá tu turno en Cabull",
        react: ConfirmAppointmentEmail({
          customerName: appointment.customerEmail,
          date: dayjs(appointment.startAt).format('DD/MM/YYYY'),
          time: dayjs(appointment.startAt).format('HH:mm'),
          service: service?.name || "",
          barber: barber?.name || "",
          confirmUrl: `${process.env.NEXT_PUBLIC_APP_URL}/confirmation?token=${confirmationTokenHash}`,
          expiresText: `Este link vence en ${dayjs(appointment.confirmationExpiresAt).diff(dayjs(), 'hours')} horas.`,
        }) as React.ReactElement,
      });
    }

    return { success: true, appointment }
  } catch (error) {
    // Manejar error de horario duplicado
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "Ya existe un turno para este horario", appointment: null }
    }
    return { success: false, error: "Error al crear el turno", appointment: null }
  }
}

// Función para confirmar la reserva, y si el user no existe con ese email, lo creamos y lo asociamos a la reserva
export const confirmAppointment = async (token: string) => {
  try {
    // Buscar el appointment con todas las relaciones necesarias
    const appointment = await prisma.appointment.findFirst({
      where: {
        confirmationTokenHash: token,
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            basePrice: true,
            durationMinutes: true,
          },
        },
        barber: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!appointment) {
      return { success: false, error: "La reserva no existe o el token es inválido", appointment: null }
    }

    // Verificar si el token ha expirado
    if (appointment.confirmationExpiresAt && appointment.confirmationExpiresAt < new Date()) {
      return { success: false, error: "La reserva ha expirado", appointment: null }
    }

    // Verificar si ya está confirmada
    if (appointment.status === AppointmentStatus.CONFIRMED) {
      return { success: true, error: null, appointment }
    }

    // Buscar o crear el usuario
    let user = await prisma.user.findUnique({
      where: {
        email: appointment.customerEmail,
      },
    })

    // Si el usuario no existe, lo creamos
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: appointment.customerEmail,
          userType: "NEW",
        },
      })
    }

    // Actualizar el appointment: asociar al usuario y cambiar el status a CONFIRMED
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        customerId: user.id,
        status: AppointmentStatus.CONFIRMED,
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            basePrice: true,
            durationMinutes: true,
          },
        },
        barber: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return { success: true, error: null, appointment: updatedAppointment }
  } catch {
    return { success: false, error: "Error al confirmar la reserva", appointment: null }
  }
}

// Función para que los administradores confirmen un turno directamente (sin token)
// Útil cuando alguien llega al lugar sin haber confirmado su cita
export const confirmAppointmentByAdmin = async (appointmentId: string) => {
  try {
    // Buscar el appointment con todas las relaciones necesarias
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            basePrice: true,
            durationMinutes: true,
          },
        },
        barber: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!appointment) {
      return { success: false, error: "El turno no existe", appointment: null }
    }

    // Verificar si ya está confirmada
    if (appointment.status === AppointmentStatus.CONFIRMED) {
      return { success: true, error: null, appointment }
    }

    // Verificar que el turno esté pendiente de confirmación
    if (appointment.status !== AppointmentStatus.PENDING_CONFIRMATION) {
      return {
        success: false,
        error: `No se puede confirmar un turno con estado ${appointment.status}`,
        appointment: null
      }
    }

    // Buscar o crear el usuario
    let user = await prisma.user.findUnique({
      where: {
        email: appointment.customerEmail,
      },
    })

    // Si el usuario no existe, lo creamos
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: appointment.customerEmail,
          userType: "NEW",
        },
      })
    }

    // Actualizar el appointment: asociar al usuario y cambiar el status a CONFIRMED
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        customerId: user.id,
        status: AppointmentStatus.CONFIRMED,
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            basePrice: true,
            durationMinutes: true,
          },
        },
        barber: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return { success: true, error: null, appointment: updatedAppointment }
  } catch {
    return { success: false, error: "Error al confirmar el turno", appointment: null }
  }
}

export const startAppointment = async (appointmentId: string) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: AppointmentStatus.IN_PROGRESS },
    })
    return { success: true, appointment }
  } catch {
    return { success: false, error: "Error al iniciar el turno", appointment: null }
  }
}

export const completeAppointment = async (appointmentId: string) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: AppointmentStatus.COMPLETED },
    })
    return { success: true, appointment }
  } catch {
    return { success: false, error: "Error al completar el turno", appointment: null }
  }
}

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: AppointmentStatus.CANCELLED },
    })
    return { success: true, appointment }
  } catch {
    return { success: false, error: "Error al cancelar el turno", appointment: null }
  }
}

