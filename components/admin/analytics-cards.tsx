"use client"


import { AnalyticsData } from '@/actions/analytics'
import { Card, CardHeader, CardContent } from '../ui/card'
import { CalendarIcon, ArrowUpIcon, UsersIcon, ArrowDownIcon, CreditCardIcon } from 'lucide-react'
import { formatPriceARS } from '@/lib/utils'


function AnalyticsCards({ data }: { data: AnalyticsData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border border-muted">
        <CardHeader className="flex justify-between items-start">
          <div className="p-3 bg-muted text-primary">
            <CalendarIcon className="size-4" />
          </div>
          <span className={`flex items-center text-xs font-bold ${data.metrics.appointmentsChangePercent > 0 ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' : 'text-destructive bg-destructive/20'} px-2 py-1 `}>
            {data.metrics.appointmentsChangePercent > 0 ? '+' : '-'}{data.metrics.appointmentsChangePercent}% {data.metrics.appointmentsChangePercent > 0 ? <ArrowUpIcon className="size-4" /> : <ArrowDownIcon className="size-4" />}
          </span>
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="text-muted-foreground text-sm font-medium mb-1">Turnos Completados</span>
          <span className="text-3xl font-black text-foreground">{data.currentMonth.count}</span>
          <span className="text-xs text-muted-foreground mt-2">vs. {data.previousMonth.count} mes pasado</span>
        </CardContent>
      </Card>
      <Card className="border border-muted">
        <CardHeader className="flex justify-between items-start">
          <div className="p-3 bg-muted text-primary">
            <CreditCardIcon className="size-4" />
          </div>
          <span className={`flex items-center text-xs font-bold ${data.metrics.revenueChangePercent > 0 ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' : 'text-destructive bg-destructive/20'} px-2 py-1 `}>
            {data.metrics.revenueChangePercent > 0 ? '+' : '-'}{data.metrics.revenueChangePercent}% {data.metrics.revenueChangePercent > 0 ? <ArrowUpIcon className="size-4" /> : <ArrowDownIcon className="size-4" />}
          </span>
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="text-muted-foreground text-sm font-medium mb-1">Total Ingresos</span>
          <span className="text-3xl font-black text-foreground">{formatPriceARS(data.currentMonth.revenue)}</span>
          <span className="text-xs text-muted-foreground mt-2">vs. {formatPriceARS(data.previousMonth.revenue)} mes pasado</span>
        </CardContent>
      </Card>

      <Card className="border border-muted">
        <CardHeader className="flex justify-between items-start">
          <div className="p-3 bg-muted text-primary">
            <UsersIcon className="size-4" />
          </div>
          <span className={`flex items-center text-xs font-bold ${data.metrics.retentionRate > 0 ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' : 'text-destructive bg-destructive/20'} px-2 py-1 `}>
            {data.metrics.retentionRate > 0 ? '+' : '-'}{data.metrics.retentionRate}% {data.metrics.retentionRate > 0 ? <ArrowUpIcon className="size-4" /> : <ArrowDownIcon className="size-4" />}
          </span>
        </CardHeader>
        <CardContent className="flex flex-col">
          <span className="text-muted-foreground text-sm font-medium mb-1">Tasa de Retención</span>
          <span className="text-3xl font-black text-foreground">{data.metrics.retentionRate}%</span>
          <span className="text-xs text-muted-foreground mt-2">Clientes recurrentes</span>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsCards