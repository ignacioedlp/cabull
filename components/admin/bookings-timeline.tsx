"use client"

import { Button } from '../ui/button'
import { CheckIcon, ScissorsIcon, ScanFace, CheckCircleIcon, BrushIcon, Trash2Icon, ClockIcon, UserRoundIcon, PlayIcon, TimerIcon } from 'lucide-react'
import { AppointmentStatus } from '@/lib/generated/prisma/enums'
import TimelineRow from './timeline-row'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { startAppointment, completeAppointment, cancelAppointment, confirmAppointmentByAdmin } from '@/actions/appointments'

// Extender dayjs con los plugins necesarios
// utc debe extenderse antes que timezone
dayjs.extend(utc)
dayjs.extend(timezone)

// Función helper para obtener la configuración visual según el estado de la cita
// Ahora recibe el appointmentId y los handlers para los botones
function getAppointmentConfig(
  status: AppointmentStatus,
  appointmentId: string,
  onStart: (id: string) => void,
  onComplete: (id: string) => void,
  onCancel: (id: string) => void,
  onConfirm: (id: string) => void,
  processingId: string | null
) {
  // Verificar si esta cita específica está siendo procesada
  const isPending = processingId === appointmentId
  switch (status) {
    case AppointmentStatus.COMPLETED:
      return {
        circleContent: 'icon' as const,
        icon: CheckIcon,
        circleBgColor: 'bg-primary',
        statusConfig: {
          label: 'Completado',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          darkBgColor: 'dark:bg-green-900/30',
          darkTextColor: 'dark:text-green-400',
        },
        isCompleted: true,
        showLeftBorder: true,
        leftBorderColor: 'primary' as const,
        opacityOnHover: true,
        buttons: (
          <Button variant="outline" disabled>
            Completado
          </Button>
        ),
      }

    case AppointmentStatus.IN_PROGRESS:
      return {
        circleContent: 'icon' as const,
        icon: UserRoundIcon,
        circleBgColor: 'bg-primary',
        statusConfig: {
          label: 'En Silla',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          darkBgColor: 'dark:bg-blue-900/30',
          darkTextColor: 'dark:text-blue-400',
        },
        showLeftBorder: true,
        leftBorderColor: 'primary' as const,
        buttons: (
          <Button
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-primary hover:bg-[#505050] text-sm font-bold transition-all shadow-md active:scale-95"
            onClick={() => onComplete(appointmentId)}
            disabled={isPending}
          >
            <CheckCircleIcon className="size-4" />
            {isPending ? 'Completando...' : 'Marcar Completado'}
          </Button>
        ),
      }

    case AppointmentStatus.CONFIRMED:
      return {
        circleContent: 'icon' as const,
        icon: UserRoundIcon,
        circleBgColor: 'bg-primary',
        buttons: (
          <>
            <Button
              variant="secondary"
              onClick={() => onStart(appointmentId)}
              disabled={isPending}
            >
              <PlayIcon className="size-4" />
              {isPending ? 'Iniciando...' : 'Comenzar'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => onCancel(appointmentId)}
              disabled={isPending}
            >
              <Trash2Icon className="size-4 text-destructive" />
            </Button>
          </>
        ),
      }

    case AppointmentStatus.PENDING_CONFIRMATION:
      return {
        circleContent: 'icon' as const,
        icon: TimerIcon,
        circleBgColor: 'bg-primary/80',
        statusConfig: {
          label: 'Pendiente de Confirmación',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          darkBgColor: 'dark:bg-yellow-900/30',
          darkTextColor: 'dark:text-yellow-400',
        },
        buttons: (
          <>
            <Button
              variant="secondary"
              onClick={() => onConfirm(appointmentId)}
              disabled={isPending}
            >
              <CheckCircleIcon className="size-4" />
              {isPending ? 'Confirmando...' : 'Confirmar'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => onCancel(appointmentId)}
              disabled={isPending}
            >
              <Trash2Icon className="size-4 text-destructive" />
            </Button>
          </>
        ),
      }

    case AppointmentStatus.CANCELLED:
      return {
        circleContent: 'icon' as const,
        icon: Trash2Icon,
        circleBgColor: 'bg-primary/80',
        statusConfig: {
          label: 'Cancelado',
          bgColor: 'bg-destructive/10',
          textColor: 'text-destructive',
          darkBgColor: 'dark:bg-destructive/30',
          darkTextColor: 'dark:text-destructive',
        },
      }

    default:
      return {
        circleContent: 'icon' as const,
        icon: ClockIcon,
        circleBgColor: 'bg-background dark:bg-dark-card',
        buttons: (
          <>
            <Button
              variant="secondary"
              onClick={() => onComplete(appointmentId)}
              disabled={isPending}
            >
              <CheckCircleIcon className="size-4" />
              {isPending ? 'Completando...' : 'Completar'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => onCancel(appointmentId)}
              disabled={isPending}
            >
              <Trash2Icon className="size-4 text-destructive" />
            </Button>
          </>
        ),
      }
  }
}

// Función helper para obtener el ícono del servicio según su nombre
function getServiceIcon(serviceName: string) {
  const name = serviceName.toLowerCase()
  if (name.includes('barba') || name.includes('toalla')) {
    return ScanFace
  }
  if (name.includes('color') || name.includes('resaltado')) {
    return BrushIcon
  }
  return ScissorsIcon // Por defecto, ícono de tijeras
}

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

function BookingsTimeline({ appointments }: { appointments: Appointment[] }) {
  const [processingId, setProcessingId] = useState<string | null>(null)
  const router = useRouter()

  // Handler para iniciar una cita
  const handleStart = async (appointmentId: string) => {
    setProcessingId(appointmentId)
    try {
      const result = await startAppointment(appointmentId)
      setProcessingId(null)
      if (result?.success) {
        toast.success('Cita iniciada correctamente')
        router.refresh()
      } else {
        toast.error(result?.error || 'Error al iniciar la cita')
      }
    } catch (error) {
      setProcessingId(null)
      toast.error('Error al iniciar la cita')
    }
  }

  // Handler para completar una cita
  const handleComplete = async (appointmentId: string) => {
    setProcessingId(appointmentId)
    try {
      const result = await completeAppointment(appointmentId)
      setProcessingId(null)
      if (result?.success) {
        toast.success('Cita completada correctamente')
        router.refresh()
      } else {
        toast.error(result?.error || 'Error al completar la cita')
      }
    } catch (error) {
      setProcessingId(null)
      toast.error('Error al completar la cita')
    }
  }

  // Handler para cancelar una cita
  const handleCancel = async (appointmentId: string) => {
    setProcessingId(appointmentId)
    try {
      const result = await cancelAppointment(appointmentId)
      setProcessingId(null)
      if (result?.success) {
        toast.success('Cita cancelada correctamente')
        router.refresh()
      } else {
        toast.error(result?.error || 'Error al cancelar la cita')
      }
    } catch (error) {
      setProcessingId(null)
      toast.error('Error al cancelar la cita')
    }
  }

  // Handler para confirmar una cita desde el admin
  const handleConfirm = async (appointmentId: string) => {
    setProcessingId(appointmentId)
    try {
      const result = await confirmAppointmentByAdmin(appointmentId)
      setProcessingId(null)
      if (result?.success) {
        toast.success('Turno confirmado correctamente')
        router.refresh()
      } else {
        toast.error(result?.error || 'Error al confirmar el turno')
      }
    } catch (error) {
      setProcessingId(null)
      toast.error('Error al confirmar el turno')
    }
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-bold mb-6 text-foreground">Cronología</h3>
      <div className="relative">
        {/* Línea vertical del timeline */}
        <div className="absolute left-[27px] md:left-[27px] top-4 bottom-0 w-px bg-muted"></div>

        {appointments?.map((appointment) => {
          // Formatear la fecha y hora de la cita
          const appointmentDate = dayjs(appointment.startAt).tz('America/Argentina/Buenos_Aires')
          const time = appointmentDate.format('HH:mm')
          const timePeriod = appointmentDate.format('A')

          // Obtener la configuración visual según el estado
          // Pasamos el appointmentId y los handlers
          const config = getAppointmentConfig(
            appointment.status,
            appointment.id,
            handleStart,
            handleComplete,
            handleCancel,
            handleConfirm,
            processingId
          )

          // Obtener el nombre del cliente (o email si no tiene nombre)
          const customerName = appointment.customer?.name || appointment.customerEmail || 'Cliente'

          // Obtener el ícono del servicio
          const ServiceIcon = getServiceIcon(appointment.service.name)

          // Formatear la duración del servicio
          const durationMinutes = appointment.service.durationMinutes
          const serviceDuration = durationMinutes >= 60
            ? `${Math.floor(durationMinutes / 60)}h${durationMinutes % 60 > 0 ? ` ${durationMinutes % 60}m` : ''}`
            : `${durationMinutes}m`

          // Determinar el tipo de contenido del círculo y la imagen
          // Por ahora usamos íconos por defecto, pero puedes agregar lógica para imágenes si las tienes
          const circleContent = config.circleContent
          const icon = config.icon
          const circleBgColor = config.circleBgColor

          // Si el estado es IN_PROGRESS o CONFIRMED y queremos usar imagen del cliente
          // (cuando tengas la imagen en el modelo de datos, puedes descomentar esto)
          // const customerImageUrl = appointment.customer?.imageUrl
          // if (customerImageUrl && (appointment.status === AppointmentStatus.IN_PROGRESS || appointment.status === AppointmentStatus.CONFIRMED)) {
          //   circleContent = appointment.status === AppointmentStatus.IN_PROGRESS ? 'image' : 'nested-image'
          // }

          return (
            <TimelineRow
              key={appointment.id}
              time={time}
              timePeriod={timePeriod}
              circleContent={circleContent}
              icon={icon}
              imageAlt={`Cliente ${customerName} photo`}
              circleBgColor={circleBgColor}
              customerName={customerName}
              serviceName={appointment.service.name}
              serviceIcon={ServiceIcon}
              serviceDuration={serviceDuration}
              status={config.statusConfig}
              isCompleted={config.isCompleted}
              showLeftBorder={config.showLeftBorder}
              leftBorderColor={config.leftBorderColor}
              buttons={config.buttons}
              opacityOnHover={config.opacityOnHover}
            />
          )
        })}
      </div>
      <div className="flex justify-center mt-4 mb-12">
        <p className="text-muted-foreground text-sm">Fin de las citas programadas</p>
      </div>
    </div>
  )
}

export default BookingsTimeline