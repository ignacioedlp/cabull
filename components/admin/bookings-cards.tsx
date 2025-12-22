"use client"

import { Card, CardHeader, CardContent } from '../ui/card'
import { CalendarIcon, ClockIcon, DollarSignIcon } from 'lucide-react'
import { formatPriceARS } from '@/lib/utils'

function BookingsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card >
        <CardHeader className="flex items-center gap-2 text-muted-foreground">
          <CalendarIcon className="size-4" />
          <p className="text-sm font-medium uppercase tracking-wide">Turnos Programados</p>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-3xl font-bold">8</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center gap-2 text-muted-foreground">
          <ClockIcon className="size-4" />
          <p className="text-sm font-medium uppercase tracking-wide">Horas Reservadas</p>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-3xl font-bold">6.5</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center gap-2 text-muted-foreground">
          <DollarSignIcon className="size-4" />
          <p className="text-sm font-medium uppercase tracking-wide">Ingresos Estimados</p>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-3xl font-bold">{formatPriceARS(240000)}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingsCards