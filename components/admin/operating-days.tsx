"use client"
import { BusinessHours } from "@/lib/generated/prisma/client"
import DayScheduleRow from "./day-schedule-row"
import { useState, useTransition } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/es'
import { updateBusinessHours, createDefaultBusinessHours } from "@/actions/business";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react";
/**
 * Componente que maneja toda la sección de "Días de Operación"
 * Utiliza un array de configuración para generar dinámicamente las filas de días
 */
function OperatingDays({ businessHours }: { businessHours: BusinessHours[] }) {
  const [schedules, setSchedules] = useState<BusinessHours[]>(businessHours)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Función que maneja el cambio de hora de inicio para un día específico
  const handleStartTimeChange = (dayId: string, value: string) => {
    // Actualizamos el estado local para feedback inmediato en la UI
    setSchedules((prev) =>
      prev.map((hour) =>
        hour.id === dayId ? { ...hour, startTime: value } : hour
      )
    )

    // Buscamos el día correspondiente para enviar al server action
    const day = schedules.find((hour) => hour.id === dayId)
    if (!day) return

    startTransition(async () => {
      try {
        const result = await updateBusinessHours({
          id: day.id,
          weekday: day.weekday,
          startTime: value,       // nuevo inicio
          endTime: day.endTime,   // fin actual
          isClosed: day.isClosed, // estado actual abierto/cerrado
        })

        if (result.success) {
          toast.success("Horario de inicio actualizado correctamente.")
          router.refresh()
        } else {
          toast.error(result.error || "Ocurrió un error al actualizar el horario de inicio.")
        }
      } catch {
        toast.error("Error inesperado al actualizar el horario de inicio.")
      }
    })
  }

  // Función que maneja el cambio de hora de fin para un día específico
  const handleEndTimeChange = (dayId: string, value: string) => {
    setSchedules((prev) =>
      prev.map((hour) =>
        hour.id === dayId ? { ...hour, endTime: value } : hour
      )
    )

    const day = schedules.find((hour) => hour.id === dayId)
    if (!day) return

    startTransition(async () => {
      try {
        const result = await updateBusinessHours({
          id: day.id,
          weekday: day.weekday,
          startTime: day.startTime,
          endTime: value,         // nuevo fin
          isClosed: day.isClosed,
        })

        if (result.success) {
          toast.success("Horario de fin actualizado correctamente.")
          router.refresh()
        } else {
          toast.error(result.error || "Ocurrió un error al actualizar el horario de fin.")
        }
      } catch {
        toast.error("Error inesperado al actualizar el horario de fin.")
      }
    })
  }

  // Función que maneja el cambio del toggle (habilitar/deshabilitar día)
  const handleToggleChange = (dayId: string, checked: boolean) => {
    // En el switch, "checked" significa día habilitado, pero la DB guarda "isClosed"
    const newIsClosed = !checked

    setSchedules((prev) =>
      prev.map((hour) =>
        hour.id === dayId ? { ...hour, isClosed: newIsClosed } : hour
      )
    )

    const day = schedules.find((hour) => hour.id === dayId)
    if (!day) return

    startTransition(async () => {
      try {
        const result = await updateBusinessHours({
          id: day.id,
          weekday: day.weekday,
          startTime: day.startTime,
          endTime: day.endTime,
          isClosed: newIsClosed, // nuevo valor
        })

        if (result.success) {
          toast.success("Estado del día actualizado correctamente.")
          router.refresh()
        } else {
          toast.error(result.error || "Ocurrió un error al actualizar el estado del día.")
        }
      } catch {
        toast.error("Error inesperado al actualizar el estado del día.")
      }
    })
  }

  // Función para crear horarios por defecto (9:00 a 18:00 todos los días)
  const handleCreateDefaultHours = () => {
    startTransition(async () => {
      try {
        const result = await createDefaultBusinessHours()
        if (result.success && result.businessHours) {
          setSchedules(result.businessHours)
          toast.success("Horarios de negocio creados correctamente.")
          router.refresh()
        } else {
          toast.error(result.error || "Ocurrió un error al crear los horarios de negocio.")
        }
      } catch {
        toast.error("Error inesperado al crear los horarios de negocio.")
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Título de la sección */}
      <label className="text-text-main text-sm font-bold uppercase tracking-wider mb-2">
        Días de Operación
      </label>

      {/* Estado vacío - mostrar cuando no hay horarios */}
      {schedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed border-border-light bg-surface-card gap-4">
          <div className="text-center">
            <h4 className="text-text-main font-bold text-base mb-2">
              No hay horarios de operación configurados
            </h4>
            <p className="text-text-secondary text-sm mb-4">
              Establece los días y horarios de funcionamiento de tu negocio. Puedes crear horarios por defecto y luego personalizarlos.
            </p>
          </div>
          <Button
            onClick={handleCreateDefaultHours}
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <PlusIcon className="size-4" />
            {isPending ? "Creando horarios..." : "Crear Horarios por Defecto"}
          </Button>
        </div>
      ) : (
        <>
          {/* Iteramos sobre el array de días y creamos una fila para cada uno */}
          {schedules.map((schedule) => {
            return (
              <DayScheduleRow
                key={schedule.id}
                // Usamos dayjs para convertir el número del día a su nombre en español 0 al 6 (domingo al sábado)
                dayName={dayjs().day(schedule.weekday).locale('es').format('dddd')}
                toggleId={`toggle-${schedule.id}`}
                startTime={schedule.startTime}
                endTime={schedule.endTime}
                isEnabled={!schedule.isClosed}
                isDisabled={schedule.isClosed}
                isPending={isPending}
                onStartTimeChange={(value) => handleStartTimeChange(schedule.id, value)}
                onEndTimeChange={(value) => handleEndTimeChange(schedule.id, value)}
                onToggleChange={(checked) => handleToggleChange(schedule.id, checked)}
              />
            )
          })}
        </>
      )}
    </div>
  )
}

export default OperatingDays

