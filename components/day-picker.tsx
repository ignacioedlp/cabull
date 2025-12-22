"use client"

import { Button } from "./ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState, useMemo, useCallback } from "react"
import dayjs, { Dayjs } from "dayjs"
import 'dayjs/locale/es'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { es } from "react-day-picker/locale";

// Tipos para las props del componente
interface DayPickerProps {
  // Fecha mínima desde la cual se puede navegar hacia atrás
  minDate?: Dayjs | string | Date
  // Fecha máxima hasta la cual se puede navegar hacia adelante
  maxDate?: Dayjs | string | Date
  // Array de días de la semana que no pueden ser elegidos
  // 0 = Domingo, 1 = Lunes, 2 = Martes, ..., 6 = Sábado
  disabledDaysOfWeek?: number[]
}

function DayPicker({
  minDate,
  maxDate,
  disabledDaysOfWeek = []
}: DayPickerProps) {
  const [date, setDate] = useState(dayjs())
  const [open, setOpen] = useState(false)

  // Convertir las fechas límite a objetos dayjs para comparaciones
  const minDateObj = useMemo(() => {
    return minDate ? dayjs(minDate) : null
  }, [minDate])

  const maxDateObj = useMemo(() => {
    return maxDate ? dayjs(maxDate) : null
  }, [maxDate])

  // Función auxiliar para verificar si un día está deshabilitado
  const isDayDisabled = useCallback((day: Dayjs): boolean => {
    // Verificar si el día de la semana está en la lista de deshabilitados
    const dayOfWeek = day.day() // 0 = domingo, 1 = lunes, etc.
    if (disabledDaysOfWeek.includes(dayOfWeek)) {
      return true
    }

    // Verificar límites de fecha
    if (minDateObj && day.isBefore(minDateObj, 'day')) {
      return true
    }

    if (maxDateObj && day.isAfter(maxDateObj, 'day')) {
      return true
    }

    return false
  }, [disabledDaysOfWeek, minDateObj, maxDateObj])

  // Función para encontrar el siguiente día habilitado hacia adelante
  const findNextEnabledDay = useCallback((currentDate: Dayjs): Dayjs => {
    let nextDate = currentDate.add(1, 'day')
    let attempts = 0
    const maxAttempts = 14 // Evitar bucles infinitos (máximo 2 semanas)

    while (isDayDisabled(nextDate) && attempts < maxAttempts) {
      nextDate = nextDate.add(1, 'day')
      attempts++
    }

    return nextDate
  }, [isDayDisabled])

  // Función para encontrar el siguiente día habilitado hacia atrás
  const findPreviousEnabledDay = useCallback((currentDate: Dayjs): Dayjs => {
    let prevDate = currentDate.subtract(1, 'day')
    let attempts = 0
    const maxAttempts = 14 // Evitar bucles infinitos (máximo 2 semanas)

    while (isDayDisabled(prevDate) && attempts < maxAttempts) {
      prevDate = prevDate.subtract(1, 'day')
      attempts++
    }

    return prevDate
  }, [isDayDisabled])

  // Verificar si podemos navegar hacia atrás
  const canGoPrevious = useMemo(() => {
    if (!minDateObj && disabledDaysOfWeek.length === 0) {
      return true // Sin restricciones, siempre se puede ir hacia atrás
    }

    const previousDay = findPreviousEnabledDay(date)
    // Verificar que el día anterior no esté antes del mínimo
    if (minDateObj && previousDay.isBefore(minDateObj, 'day')) {
      return false
    }
    // Verificar que el día anterior sea diferente al actual (hay días disponibles)
    return !previousDay.isSame(date, 'day')
  }, [date, minDateObj, disabledDaysOfWeek, findPreviousEnabledDay])

  // Verificar si podemos navegar hacia adelante
  const canGoNext = useMemo(() => {
    if (!maxDateObj && disabledDaysOfWeek.length === 0) {
      return true // Sin restricciones, siempre se puede ir hacia adelante
    }

    const nextDay = findNextEnabledDay(date)
    // Verificar que el día siguiente no esté después del máximo
    if (maxDateObj && nextDay.isAfter(maxDateObj, 'day')) {
      return false
    }
    // Verificar que el día siguiente sea diferente al actual (hay días disponibles)
    return !nextDay.isSame(date, 'day')
  }, [date, maxDateObj, disabledDaysOfWeek, findNextEnabledDay])

  const handlePreviousDay = () => {
    if (!canGoPrevious) return

    const previousDay = findPreviousEnabledDay(date)
    // Solo actualizar si encontramos un día válido
    if (!minDateObj || !previousDay.isBefore(minDateObj, 'day')) {
      setDate(previousDay)
    }
  }

  const handleNextDay = () => {
    if (!canGoNext) return

    const nextDay = findNextEnabledDay(date)
    // Solo actualizar si encontramos un día válido
    if (!maxDateObj || !nextDay.isAfter(maxDateObj, 'day')) {
      setDate(nextDay)
    }
  }

  const handleToday = () => {
    const today = dayjs()
    // Si hoy está deshabilitado, encontrar el día habilitado más cercano
    if (isDayDisabled(today)) {
      // Intentar encontrar el siguiente día habilitado
      const nextEnabled = findNextEnabledDay(today.subtract(1, 'day'))
      if (!maxDateObj || !nextEnabled.isAfter(maxDateObj, 'day')) {
        setDate(nextEnabled)
      }
    } else {
      setDate(today)
    }
  }

  // Función para deshabilitar días en el calendario
  const isCalendarDayDisabled = useCallback((day: Date): boolean => {
    return isDayDisabled(dayjs(day))
  }, [isDayDisabled])

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={"outline"}
        onClick={handlePreviousDay}
        disabled={!canGoPrevious}
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      {date.format('YYYY-MM-DD') !== dayjs().format('YYYY-MM-DD') && (
        <Button type="button" variant={"outline"} onClick={handleToday}>
          Hoy
        </Button>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            id="date"
            className="w-48 justify-center font-normal items-center"
          >
            {date.locale('es').format('dddd, DD [de] MMMM')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date.toDate()}
            captionLayout="dropdown"
            formatters={{
              formatMonthDropdown: (date) =>
                date.toLocaleString("es", { month: "short" }),
            }}
            locale={es}
            // Pasar las fechas límite al calendario
            hidden={
              minDateObj && maxDateObj
                ? [{ before: minDateObj.toDate() }, { after: maxDateObj.toDate() }]
                : minDateObj
                  ? { before: minDateObj.toDate() }
                  : maxDateObj
                    ? { after: maxDateObj.toDate() }
                    : undefined
            }
            // Deshabilitar días según la lógica definida
            disabled={isCalendarDayDisabled}
            onSelect={(date) => {
              if (date) {
                const selectedDay = dayjs(date)
                // Solo permitir seleccionar días habilitados
                if (!isDayDisabled(selectedDay)) {
                  setDate(selectedDay)
                  setOpen(false)
                }
              }
            }}
          />
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant={"outline"}
        onClick={handleNextDay}
        disabled={!canGoNext}
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  )
}

export default DayPicker