"use client"

import { useRouter } from 'next/navigation'
import DayPicker from '@/components/day-picker'
import dayjs, { Dayjs } from 'dayjs'

/**
 * BookingsDayPicker Component
 * 
 * Este componente envuelve el DayPicker y maneja la navegación
 * cuando se selecciona una fecha. Es necesario porque no podemos
 * pasar funciones del servidor directamente a componentes cliente.
 * 
 * @component
 * @param {string} day - La fecha actual en formato YYYY-MM-DD
 */
interface BookingsDayPickerProps {
  day: string
}

export default function BookingsDayPicker({ day }: BookingsDayPickerProps) {
  // useRouter es un hook de Next.js que nos permite navegar desde componentes cliente
  const router = useRouter()

  // Esta función se ejecuta cuando el usuario selecciona una fecha
  // Usa router.push para navegar a la nueva URL con el parámetro de fecha
  const handleDateChange = (date: Dayjs) => {
    // Formatear la fecha como YYYY-MM-DD y actualizar la URL
    router.push(`/admin/bookings?day=${date.format('YYYY-MM-DD')}`)
  }

  return (
    <DayPicker
      handleAction={handleDateChange}
      day={day}
    />
  )
}

