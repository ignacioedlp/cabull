"use client"

import { Card, CardHeader, CardContent } from '../ui/card'
import { CalendarIcon, ClockIcon, DollarSignIcon } from 'lucide-react'
import { formatPriceARS } from '@/lib/utils'
import { AppointmentStatus } from '@/lib/generated/prisma/client'

interface Appointment {
  service: {
    durationMinutes: number;
    basePrice: number | null;
    name: string;
  };
  id: string;
  status: AppointmentStatus;
  customerEmail: string;
  serviceId: string;
  startAt: Date;
  customer: {
    name: string | null;
    email: string;
  } | null;
  barber: {
    name: string | null;
    email: string;
  };
}

function BookingsCards({ appointments }: { appointments: Appointment[] }) {
  const totalAppointments = appointments.length
  const totalHoursReserved = appointments.reduce((acc, appointment) => acc + appointment.service.durationMinutes, 0)
  const totalEarnings = appointments.reduce((acc, appointment) => acc + (appointment.service.basePrice || 0), 0)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card >
        <CardHeader className="flex items-center gap-2 text-muted-foreground">
          <CalendarIcon className="size-4" />
          <p className="text-sm font-medium uppercase tracking-wide">Turnos Programados</p>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-3xl font-bold">{totalAppointments}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center gap-2 text-muted-foreground">
          <ClockIcon className="size-4" />
          <p className="text-sm font-medium uppercase tracking-wide">Horas Reservadas</p>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-3xl font-bold">{(totalHoursReserved / 60)} hs</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center gap-2 text-muted-foreground">
          <DollarSignIcon className="size-4" />
          <p className="text-sm font-medium uppercase tracking-wide">Ingresos Estimados</p>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-3xl font-bold">{formatPriceARS(totalEarnings)}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingsCards