"use client"

import { Card, CardHeader, CardContent, CardFooter } from '../ui/card'
import { Progress } from "@/components/ui/progress"
import { AppointmentStatus } from '@/lib/generated/prisma/enums'

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

function BookingsProgress({ appointments }: { appointments: Appointment[] }) {
  const totalAppointments = appointments.length
  const completedAppointments = appointments.filter(appointment => appointment.status === AppointmentStatus.COMPLETED).length
  const progress = (completedAppointments / totalAppointments) * 100

  return (
    <Card>
      <CardHeader className="flex gap-6 justify-between items-center">
        <h3 className="text-foreground text-base font-bold">Progreso Diario</h3>
        <span className="text-foreground text-sm font-bold bg-muted px-2 py-1 rounded">{Math.round(progress)}%</span>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
      </CardContent>

      <CardFooter className="text-muted-foreground text-sm font-medium">{completedAppointments} de {totalAppointments} citas completadas</CardFooter>
    </Card>
  )
}

export default BookingsProgress