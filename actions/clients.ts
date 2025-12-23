"use server"

// Actions to get, create, update and delete clients

import { UserType, AppointmentStatus } from "@/lib/generated/prisma/enums"
import { prisma } from "@/lib/prisma"

// Get all clients, sorted by name always, but i could filter by name, email and user type, and always paginated, and return the total count of clients
export const getClients = async (
  page: number,
  pageSize: number,
  filter: {
    name?: string
    email?: string
    userType?: string
    activityFilter?: "recent" | "inactive" | null // "recent" = visitantes recientes (15 días), "inactive" = inactivos (1 mes)
  }
) => {
  // Calculate date thresholds for filtering
  const now = new Date()
  const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 days ago (1 month)

  // Build the where clause for appointment filtering
  let appointmentFilter: any = undefined

  if (filter.activityFilter === "recent") {
    // Visitantes recientes: tienen al menos un turno en los últimos 15 días
    // con status válido (CONFIRMED, COMPLETED, o IN_PROGRESS)
    appointmentFilter = {
      some: {
        startAt: {
          gte: fifteenDaysAgo, // Greater than or equal to 15 days ago
          lte: now, // And less than or equal to now (no future appointments)
        },
        status: {
          in: [AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED, AppointmentStatus.IN_PROGRESS],
        },
      },
    }
  } else if (filter.activityFilter === "inactive") {
    // Inactivos: no tienen turnos en el último mes con status válido
    appointmentFilter = {
      none: {
        startAt: {
          gte: oneMonthAgo, // No appointments in the last month
        },
        status: {
          in: [AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED, AppointmentStatus.IN_PROGRESS],
        },
      },
    }
  }

  // Build the where clause
  const whereClause: any = {
    name: filter.name ? { contains: filter.name, mode: "insensitive" } : undefined,
    email: filter.email ? { contains: filter.email, mode: "insensitive" } : undefined,
    userType: filter.userType ? { equals: filter.userType as UserType } : undefined,
  }

  // Add appointment filter if activity filter is specified
  if (appointmentFilter) {
    whereClause.appointments = appointmentFilter
  }

  // Remove undefined values from where clause
  Object.keys(whereClause).forEach((key) => {
    if (whereClause[key] === undefined) {
      delete whereClause[key]
    }
  })

  // Get total count before pagination
  const total = await prisma.user.count({
    where: whereClause,
  })

  // Build appointments include filter
  const appointmentsIncludeFilter: any = {
    status: {
      in: [AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED, AppointmentStatus.IN_PROGRESS],
    },
  }

  // If filtering by recent, also filter appointments by date
  if (filter.activityFilter === "recent") {
    appointmentsIncludeFilter.startAt = {
      gte: fifteenDaysAgo,
      lte: now,
    }
  }

  // Get paginated clients with their appointments info
  const clients = await prisma.user.findMany({
    where: whereClause,
    include: {
      preferredService: {
        select: {
          id: true,
          name: true,
        },
      },
      appointments: {
        where: appointmentsIncludeFilter,
        orderBy: {
          startAt: "desc",
        },
        take: 1, // Only get the most recent appointment for display
      },
      _count: {
        select: {
          appointments: {
            where: {
              status: {
                in: [AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED, AppointmentStatus.IN_PROGRESS],
              },
            },
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  return {
    clients,
    total,
  }
}


export const createClient = async (clientData: {
  name: string
  email: string
  phone: string
  userType: UserType
  notes: string
  preferredServiceId: string | null
}) => {
  try {
    // Validate required fields
    if (!clientData.email) {
      return { success: false, error: "El email es requerido" }
    }

    // Create the client
    const client = await prisma.user.create({
      data: {
        name: clientData.name || null,
        email: clientData.email,
        phone: clientData.phone || null,
        userType: clientData.userType,
        notes: clientData.notes || null,
        preferredServiceId: clientData.preferredServiceId || null,
      },
    })

    return { success: true, client }
  } catch (error: any) {
    // Handle unique constraint violation (duplicate email)
    if (error.code === "P2002") {
      return { success: false, error: "Ya existe un cliente con este email" }
    }
    return { success: false, error: "Error al crear el cliente" }
  }
}

export const updateClient = async (clientData: {
  id: string
  name: string
  email: string
  phone: string
  userType: UserType
  notes: string
  preferredServiceId: string | null
}) => {
  try {
    // Validate required fields
    if (!clientData.email) {
      return { success: false, error: "El email es requerido" }
    }

    // Update the client
    const client = await prisma.user.update({
      where: { id: clientData.id },
      data: {
        name: clientData.name || null,
        email: clientData.email,
        phone: clientData.phone || null,
        userType: clientData.userType,
        notes: clientData.notes || null,
        preferredServiceId: clientData.preferredServiceId || null,
      },
    })

    return { success: true, client }
  } catch (error: any) {
    // Handle unique constraint violation (duplicate email)
    if (error.code === "P2002") {
      return { success: false, error: "Ya existe un cliente con este email" }
    }
    // Handle record not found
    if (error.code === "P2025") {
      return { success: false, error: "Cliente no encontrado" }
    }
    return { success: false, error: "Error al actualizar el cliente" }
  }
}

export const deleteClient = async (id: string) => {
  try {
    // Delete the client
    await prisma.user.delete({
      where: { id },
    })

    return { success: true }
  } catch (error: any) {
    // Handle record not found
    if (error.code === "P2025") {
      return { success: false, error: "Cliente no encontrado" }
    }
    // Handle foreign key constraint (if client has appointments)
    if (error.code === "P2003") {
      return { success: false, error: "No se puede eliminar el cliente porque tiene citas asociadas" }
    }
    return { success: false, error: "Error al eliminar el cliente" }
  }
}
