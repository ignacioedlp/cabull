"use client"

import { Switch } from "../ui/switch"

// Interface que define las propiedades que recibe el componente
interface DayScheduleRowProps {
  // Nombre del día (ej: "Lunes", "Martes", etc.)
  dayName: string
  // ID único para el toggle checkbox (ej: "toggle-mon")
  toggleId: string
  // Valor inicial de la hora de inicio (formato HH:MM)
  startTime: string
  // Valor inicial de la hora de fin (formato HH:MM)
  endTime: string
  // Si el día está habilitado o no
  isEnabled: boolean
  // Si el día está deshabilitado (como el domingo)
  isDisabled?: boolean
  // Función que se ejecuta cuando cambia la hora de inicio
  onStartTimeChange: (value: string) => void
  // Función que se ejecuta cuando cambia la hora de fin
  onEndTimeChange: (value: string) => void
  // Función que se ejecuta cuando cambia el estado del toggle
  onToggleChange: (checked: boolean) => void
}

/**
 * Componente que representa una fila individual para configurar el horario de un día
 * Incluye: nombre del día, inputs de hora inicio/fin, y un toggle para habilitar/deshabilitar
 */
function DayScheduleRow({
  dayName,
  startTime,
  endTime,
  isEnabled,
  isDisabled = false,
  onStartTimeChange,
  onEndTimeChange,
  onToggleChange,
}: DayScheduleRowProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg bg-background-main border border-border-light `}
    >
      {/* Nombre del día */}
      <span className="text-text-main text-sm font-medium w-20">{dayName}</span>

      {/* Contenedor de los inputs de hora */}
      <div className="flex items-center gap-2 flex-1 justify-end mr-4">
        {/* Input de hora de inicio */}
        <input
          className={`bg-surface-card border border-border-light text-text-main text-xs rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none shadow-sm ${isDisabled ? "text-text-secondary cursor-not-allowed" : ""
            }`}
          type="time"
          value={startTime}
          disabled={isDisabled}
          onChange={(e) => onStartTimeChange(e.target.value)}
        />
        {/* Separador "a" entre las horas */}
        <span className="text-text-secondary text-xs font-medium">a</span>
        {/* Input de hora de fin */}
        <input
          className={`bg-surface-card border border-border-light text-text-main text-xs rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none shadow-sm ${isDisabled ? "text-text-secondary cursor-not-allowed" : ""
            }`}
          type="time"
          value={endTime}
          disabled={isDisabled}
          onChange={(e) => onEndTimeChange(e.target.value)}
        />
      </div>

      {/* Switch para habilitar/deshabilitar el día */}
      <Switch
        checked={isEnabled}
        onCheckedChange={onToggleChange}
        aria-label={`Habilitar o deshabilitar ${dayName}`}
      />
    </div>
  )
}

export default DayScheduleRow

