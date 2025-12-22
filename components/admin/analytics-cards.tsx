"use client"


import { Card, CardHeader, CardContent } from '../ui/card'
import { CalendarIcon, ArrowUpIcon, UsersIcon, ArrowDownIcon, CreditCardIcon } from 'lucide-react'

function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border border-muted">
        <CardHeader className="flex justify-between items-start">
          <div className="p-3 bg-muted text-primary">
            <CalendarIcon className="size-4" />
          </div>
          <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 ">
            +12% <ArrowUpIcon className="size-4 " />
          </span>
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="text-muted-foreground text-sm font-medium mb-1">Turnos Completados</span>
          <span className="text-3xl font-black text-foreground">142</span>
          <span className="text-xs text-muted-foreground mt-2">vs. 126 mes pasado</span>
        </CardContent>
      </Card>
      <Card className="border border-muted">
        <CardHeader className="flex justify-between items-start">
          <div className="p-3 bg-muted text-primary">
            <CreditCardIcon className="size-4" />
          </div>
          <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 ">
            +8.5% <ArrowUpIcon className="size-4" />
          </span>
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="text-muted-foreground text-sm font-medium mb-1">Total Ingresos</span>
          <span className="text-3xl font-black text-foreground">$4,250</span>
          <span className="text-xs text-muted-foreground mt-2">vs. $3,910 mes pasado</span>
        </CardContent>
      </Card>

      <Card className="border border-muted">
        <CardHeader className="flex justify-between items-start">
          <div className="p-3 bg-muted text-primary">
            <UsersIcon className="size-4" />
          </div>
          <span className="flex items-center text-xs font-bold text-destructive bg-destructive/20 px-2 py-1 ">
            -2.1% <ArrowDownIcon className="size-4" />
          </span>
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="text-muted-foreground text-sm font-medium mb-1">Tasa de Retención</span>
          <span className="text-3xl font-black text-foreground">78%</span>
          <span className="text-xs text-muted-foreground mt-2">Clientes recurrentes</span>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsCards