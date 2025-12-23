"use client"

import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { AnalyticsData } from '@/actions/analytics'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'

// Función para procesar datos agrupados por hora (0-23)
function processHourlyData(appointments: AnalyticsData['currentMonth']['appointments']) {
  // Inicializar un objeto con todas las horas del día (0-23) con valor 0
  const hourlyData: Record<number, { count: number; revenue: number }> = {}
  for (let hour = 0; hour < 24; hour++) {
    hourlyData[hour] = { count: 0, revenue: 0 }
  }

  // Contar citas y calcular revenue por hora
  appointments.forEach(appointment => {
    const hour = dayjs(appointment.startAt).hour()
    const cost = appointment.totalCost || appointment.service.basePrice || 0
    hourlyData[hour].count += 1
    hourlyData[hour].revenue += cost
  })

  // Convertir a array y ordenar por hora
  return Object.entries(hourlyData)
    .map(([hour, data]) => ({
      label: `${hour.toString().padStart(2, '0')}:00`,
      value: data.count,
      revenue: data.revenue,
      hour: parseInt(hour, 10),
      description: `Hora ${hour.toString().padStart(2, '0')}:00`
    }))
    .sort((a, b) => a.hour - b.hour)
}

// Función para procesar datos agrupados por día de la semana
function processDailyData(appointments: AnalyticsData['currentMonth']['appointments']) {
  // Días de la semana en español (Lunes = 1, Domingo = 0)
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

  // Inicializar contador para cada día de la semana
  const dailyData: Record<number, { count: number; revenue: number }> = {}
  for (let day = 0; day < 7; day++) {
    dailyData[day] = { count: 0, revenue: 0 }
  }

  // Contar citas y calcular revenue por día de la semana
  appointments.forEach(appointment => {
    const dayOfWeek = dayjs(appointment.startAt).day() // 0 = domingo, 1 = lunes, etc.
    const cost = appointment.totalCost || appointment.service.basePrice || 0
    dailyData[dayOfWeek].count += 1
    dailyData[dayOfWeek].revenue += cost
  })

  // Convertir a array, pero ordenar para que Lunes sea el primero
  // Reordenamos: Lunes(1), Martes(2), ..., Domingo(0)
  const orderedDays = [1, 2, 3, 4, 5, 6, 0] // Lunes a Domingo

  return orderedDays.map(day => ({
    label: dayNames[day],
    value: dailyData[day].count || 0,
    revenue: dailyData[day].revenue || 0,
    dayOfWeek: day,
    description: dayNames[day]
  }))
}

// Función para procesar datos agrupados por semana del mes
function processWeeklyData(appointments: AnalyticsData['currentMonth']['appointments']) {
  // Agrupar citas por semana del mes
  const weeklyData: Record<number, { count: number; revenue: number }> = {}

  appointments.forEach(appointment => {
    const date = dayjs(appointment.startAt)
    // Calcular la semana del mes (1-4 o 5)
    // Obtener el día del mes (1-31)
    const dayOfMonth = date.date()
    // Calcular la semana: dividir el día del mes por 7 y redondear hacia arriba
    const weekOfMonth = Math.ceil(dayOfMonth / 7)
    const cost = appointment.totalCost || appointment.service.basePrice || 0

    if (!weeklyData[weekOfMonth]) {
      weeklyData[weekOfMonth] = { count: 0, revenue: 0 }
    }
    weeklyData[weekOfMonth].count += 1
    weeklyData[weekOfMonth].revenue += cost
  })

  // Obtener el número máximo de semanas en el mes (puede ser 4 o 5)
  const maxWeeks = Math.max(...Object.keys(weeklyData).map(Number), 4)

  // Convertir a array con todas las semanas del mes
  return Array.from({ length: maxWeeks }, (_, i) => i + 1).map(week => ({
    label: `Semana ${week}`,
    value: weeklyData[week]?.count || 0,
    revenue: weeklyData[week]?.revenue || 0,
    weekNumber: week,
    description: `Semana ${week} del mes`
  }))
}

// Función para procesar datos agrupados por día del mes
function processMonthlyData(appointments: AnalyticsData['currentMonth']['appointments']) {
  // Si no hay citas, no podemos determinar el mes, así que retornamos array vacío
  if (appointments.length === 0) {
    return []
  }

  // Obtener el mes y año de la primera cita para determinar cuántos días tiene el mes
  const firstAppointment = appointments[0]
  const firstDate = dayjs(firstAppointment.startAt)

  // Obtener el número de días en el mes (28, 29, 30 o 31)
  const daysInMonth = firstDate.daysInMonth()

  // Inicializar un objeto con todos los días del mes (1-31) con valor 0
  const dailyData: Record<number, { count: number; revenue: number }> = {}
  for (let day = 1; day <= daysInMonth; day++) {
    dailyData[day] = { count: 0, revenue: 0 }
  }

  // Contar citas y calcular revenue por día del mes
  appointments.forEach(appointment => {
    const dayOfMonth = dayjs(appointment.startAt).date() // Obtiene el día del mes (1-31)
    const cost = appointment.totalCost || appointment.service.basePrice || 0
    dailyData[dayOfMonth].count += 1
    dailyData[dayOfMonth].revenue += cost
  })

  // Convertir a array y ordenar por día del mes
  return Object.entries(dailyData)
    .map(([day, data]) => ({
      label: day, // Mostrar solo el número del día
      value: data.count,
      revenue: data.revenue,
      dayOfMonth: parseInt(day, 10),
      description: `Día ${day} del mes`
    }))
    .sort((a, b) => a.dayOfMonth - b.dayOfMonth)
}

function AnalyticsCharts({ data }: { data: AnalyticsData }) {
  const [selectedView, setSelectedView] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('daily')

  const handleViewChange = (view: 'hourly' | 'daily' | 'weekly' | 'monthly') => {
    setSelectedView(view)
  }

  // Procesar datos según la vista seleccionada usando useMemo para optimización
  const chartData = useMemo(() => {
    switch (selectedView) {
      case 'hourly':
        return processHourlyData(data.currentMonth.appointments)
      case 'daily':
        return processDailyData(data.currentMonth.appointments)
      case 'weekly':
        return processWeeklyData(data.currentMonth.appointments)
      case 'monthly':
        return processMonthlyData(data.currentMonth.appointments)
      default:
        return processDailyData(data.currentMonth.appointments)
    }
  }, [selectedView, data.currentMonth.appointments])

  // Calcular la altura máxima para normalizar las barras
  const maxValue = Math.max(...chartData.map(item => item.value), 1)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border border-muted">
        <CardHeader className="flex justify-between items-center w-full">
          <CardTitle>Distribución de Citas</CardTitle>
          <div className="flex justify-end items-center gap-2">
            <Button variant={selectedView === 'hourly' ? 'default' : 'outline'} onClick={() => handleViewChange('hourly')}>
              Horario
            </Button>
            <Button variant={selectedView === 'daily' ? 'default' : 'outline'} onClick={() => handleViewChange('daily')}>
              Diario
            </Button>
            <Button variant={selectedView === 'weekly' ? 'default' : 'outline'} onClick={() => handleViewChange('weekly')}>
              Semanal
            </Button>
            <Button variant={selectedView === 'monthly' ? 'default' : 'outline'} onClick={() => handleViewChange('monthly')}>
              Mensual
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative h-64 w-full flex items-end justify-between gap-2 px-2">
          {chartData.length > 0 ? (
            chartData.map((item, index) => {
              // Calcular la altura de la barra como porcentaje del valor máximo
              const heightPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0
              // Determinar si esta es la barra con el valor más alto para destacarla
              const isMaxValue = item.value === maxValue && item.value > 0
              // Formatear el revenue como moneda
              const formattedRevenue = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(item.revenue || 0)

              // Determinar si la barra es muy alta (más del 60%) para mostrar el tooltip al lado
              const isTallBar = heightPercent > 60
              // Determinar si estamos cerca del final del array para mostrar el tooltip a la izquierda
              const isNearEnd = index > chartData.length * 0.7
              // Clase para posicionar el tooltip: arriba si es barra baja, al lado si es alta
              const tooltipPositionClass = isTallBar
                ? isNearEnd
                  ? 'right-full top-1/2 -translate-y-1/2 mr-2' // Al lado izquierdo, centrado verticalmente
                  : 'left-full top-1/2 -translate-y-1/2 ml-2' // Al lado derecho, centrado verticalmente
                : '-top-20 left-1/2 -translate-x-1/2' // Arriba, centrado horizontalmente

              return (
                <div
                  key={`${selectedView}-${index}`}
                  className={`w-full rounded-t-sm relative group cursor-pointer transition-all ${isMaxValue
                    ? 'bg-primary shadow-lg shadow-primary/30'
                    : 'bg-primary/20'
                    }`}
                  style={{ height: `${Math.max(heightPercent, 5)}%` }} // Mínimo 5% para que sea visible
                >
                  {/* Tooltip mejorado que aparece al hacer hover */}
                  <div className={`absolute ${tooltipPositionClass} bg-foreground text-background text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 font-bold shadow-lg min-w-max`}>
                    <div className="flex flex-col gap-1 items-center">
                      {/* Descripción de qué representa la vela */}
                      <div className="text-[10px] font-normal opacity-90 border-b border-background/20 pb-1 mb-1">
                        {item.description || item.label}
                      </div>
                      {/* Cantidad de citas */}
                      <div>
                        {item.value} {item.value === 1 ? 'cita' : 'citas'}
                      </div>
                      {/* Revenue total */}
                      <div className="text-[10px] font-normal opacity-90">
                        {formattedRevenue}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <p>No hay datos disponibles</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
          {chartData.length > 0 ? (
            chartData.map((item, index) => (
              <span key={`label-${selectedView}-${index}`} className="text-center flex-1 truncate">
                {item.label}
              </span>
            ))
          ) : (
            <span className="w-full text-center">Sin datos</span>
          )}
        </CardFooter>
      </Card>
      <Card className="border border-muted flex flex-col h-full">
        <CardHeader>
          <CardTitle>Popularidad de Servicios</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col  gap-6">
          {data.metrics.servicePopularity.map((service) => (
            <div key={service.name} className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-foreground">{service.name}</span>
                <span className="text-muted-foreground">{service.percentage}%</span>
              </div>
              <Progress
                value={service.percentage}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsCharts