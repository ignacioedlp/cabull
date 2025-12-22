"use client"

import { useState } from "react"
import DayScheduleRow from "./day-schedule-row"

// Interface que define la estructura de datos para cada día
interface DaySchedule {
  // Nombre del día en español
  name: string
  // ID corto para el toggle (ej: "mon", "tue")
  id: string
  // Hora de inicio por defecto
  defaultStartTime: string
  // Hora de fin por defecto
  defaultEndTime: string
  // Si el día está habilitado por defecto
  defaultEnabled: boolean
  // Si el día está deshabilitado (no se puede modificar)
  isDisabled?: boolean
}

/**
 * Componente que maneja toda la sección de "Días de Operación"
 * Utiliza un array de configuración para generar dinámicamente las filas de días
 */
function OperatingDays() {
  // Array de configuración con los datos de cada día de la semana
  // Esto hace que sea fácil agregar, modificar o reordenar días
  const [daysConfig] = useState<DaySchedule[]>([
    {
      name: "Lunes",
      id: "mon",
      defaultStartTime: "09:00",
      defaultEndTime: "18:00",
      defaultEnabled: true,
    },
    {
      name: "Martes",
      id: "tue",
      defaultStartTime: "09:00",
      defaultEndTime: "18:00",
      defaultEnabled: true,
    },
    {
      name: "Miércoles",
      id: "wed",
      defaultStartTime: "09:00",
      defaultEndTime: "18:00",
      defaultEnabled: true,
    },
    {
      name: "Jueves",
      id: "thu",
      defaultStartTime: "09:00",
      defaultEndTime: "18:00",
      defaultEnabled: true,
    },
    {
      name: "Viernes",
      id: "fri",
      defaultStartTime: "09:00",
      defaultEndTime: "19:00",
      defaultEnabled: true,
    },
    {
      name: "Sábado",
      id: "sat",
      defaultStartTime: "10:00",
      defaultEndTime: "16:00",
      defaultEnabled: true,
    },
    {
      name: "Domingo",
      id: "sun",
      defaultStartTime: "",
      defaultEndTime: "",
      defaultEnabled: false,
      isDisabled: true,
    },
  ])

  // Estado para almacenar los horarios actuales de cada día
  // Usamos un objeto donde la clave es el ID del día
  const [schedules, setSchedules] = useState<Record<string, { startTime: string; endTime: string; enabled: boolean }>>(
    () => {
      // Inicializamos el estado con los valores por defecto
      const initialSchedules: Record<string, { startTime: string; endTime: string; enabled: boolean }> = {}
      daysConfig.forEach((day) => {
        initialSchedules[day.id] = {
          startTime: day.defaultStartTime,
          endTime: day.defaultEndTime,
          enabled: day.defaultEnabled,
        }
      })
      return initialSchedules
    }
  )

  // Función que maneja el cambio de hora de inicio para un día específico
  const handleStartTimeChange = (dayId: string, value: string) => {
    setSchedules((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        startTime: value,
      },
    }))
    console.log(`${dayId} start time changed to:`, value)
  }

  // Función que maneja el cambio de hora de fin para un día específico
  const handleEndTimeChange = (dayId: string, value: string) => {
    setSchedules((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        endTime: value,
      },
    }))
    console.log(`${dayId} end time changed to:`, value)
  }

  // Función que maneja el cambio del toggle (habilitar/deshabilitar día)
  const handleToggleChange = (dayId: string, checked: boolean) => {
    setSchedules((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        enabled: checked,
      },
    }))
    console.log(`${dayId} enabled:`, checked)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Título de la sección */}
      <label className="text-text-main text-sm font-bold uppercase tracking-wider mb-2">
        Días de Operación
      </label>

      {/* Iteramos sobre el array de días y creamos una fila para cada uno */}
      {daysConfig.map((day) => {
        const schedule = schedules[day.id]
        return (
          <DayScheduleRow
            key={day.id}
            dayName={day.name}
            toggleId={`toggle-${day.id}`}
            startTime={schedule.startTime}
            endTime={schedule.endTime}
            isEnabled={schedule.enabled}
            isDisabled={!schedule.enabled}
            onStartTimeChange={(value) => handleStartTimeChange(day.id, value)}
            onEndTimeChange={(value) => handleEndTimeChange(day.id, value)}
            onToggleChange={(checked) => handleToggleChange(day.id, checked)}
          />
        )
      })}
    </div>
  )
}

export default OperatingDays

