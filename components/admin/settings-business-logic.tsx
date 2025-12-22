"use client"

import { Card, CardHeader, CardContent } from '../ui/card'
import { CalendarIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import OperatingDays from './operating-days'
import { useState } from 'react'

function SettingsBusinessLogic() {


  const [reservationWindow, setReservationWindow] = useState('7')
  const [reservationInterval, setReservationInterval] = useState('30')

  const handleReservationWindowChange = (value: string) => {
    setReservationWindow(value)
    console.log("reservationWindow", value)
  }

  const handleReservationIntervalChange = (value: string) => {
    setReservationInterval(value)
    console.log("reservationInterval", value)
  }

  return (
    <Card>
      <CardHeader className=" flex justify-between items-center">
        <div>
          <h3 className="text-text-main text-lg font-bold">Horarios de Operación y Reglas</h3>
          <p className="text-text-secondary text-sm mt-1">Establece tu horario semanal y los intervalos de citas.</p>
        </div>
        <CalendarIcon className="size-4" />
      </CardHeader>
      <CardContent className=" grid gap-8 md:grid-cols-2">
        {/* Componente modularizado para los días de operación */}
        <OperatingDays />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-text-main text-sm font-bold uppercase tracking-wider">Intervalo de Citas</label>
            <p className="text-text-secondary text-xs mb-1">Tiempo entre slots mostrados a los clientes.</p>
            <div className="relative">
              <Select value={reservationInterval} onValueChange={handleReservationIntervalChange}>
                <SelectTrigger className="w-full border border-border-light text-text-main text-sm rounded-lg focus:ring-primary focus:border-primary p-3 appearance-none shadow-sm">
                  <SelectValue placeholder={`${reservationInterval} Minutos`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="15">15 Minutos</SelectItem>
                    <SelectItem value="30">30 Minutos</SelectItem>
                    <SelectItem value="45">45 Minutos</SelectItem>
                    <SelectItem value="60">60 Minutos</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-text-main text-sm font-bold uppercase tracking-wider">Ventana de Reservas</label>
            <p className="text-text-secondary text-xs mb-1">Cuánto tiempo antes pueden reservar los clientes.</p>
            <div className="relative">
              <Select value={reservationWindow} onValueChange={handleReservationWindowChange}>
                <SelectTrigger className="w-full border border-border-light text-text-main text-sm rounded-lg focus:ring-primary focus:border-primary p-3 appearance-none shadow-sm">
                  <SelectValue placeholder={`${reservationWindow} Semanas`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="7">1 Semana</SelectItem>
                    <SelectItem value="14">2 Semanas</SelectItem>
                    <SelectItem value="30">1 Mes</SelectItem>
                    <SelectItem value="90">3 Meses</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SettingsBusinessLogic