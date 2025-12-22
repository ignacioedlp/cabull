"use client"

import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

function AnalyticsCharts() {


  const services = [
    {
      name: 'Corte de Pelo & Barba',
      value: 60
    },
    {
      name: 'Corte Clásico',
      value: 40
    },
    {
      name: 'Afeitar',
      value: 30
    },
    {
      name: 'Lavado de Cabello',
      value: 10
    },
    {
      name: 'Otros',
      value: 5
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border border-muted">
        <CardHeader className="flex justify-between items-center w-full">
          <CardTitle>Resumen de Ingresos</CardTitle>
          <div className="flex justify-end items-center gap-2">
            <Button variant="default" >Diario</Button>
            <Button variant="outline" >Semanal</Button>
            <Button variant="outline" >Mensual</Button>
          </div>

        </CardHeader>

        <CardContent className="relative h-64 w-full flex items-end justify-between gap-2 px-2">
          <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '45%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">$180</div>
          </div>
          <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '60%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">$240</div>
          </div>
          <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '35%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">$140</div>
          </div>
          <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '75%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">$300</div>
          </div>
          <div className="w-full bg-primary rounded-t-sm relative group cursor-pointer shadow-lg shadow-primary/30" style={{ height: '90%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">$360</div>
          </div>
          <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '80%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">$320</div>
          </div>
          <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '55%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">$220</div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
          <span>Lunes</span>
          <span>Martes</span>
          <span>Miércoles</span>
          <span>Jueves</span>
          <span>Viernes</span>
          <span>Sábado</span>
          <span>Domingo</span>
        </CardFooter>
      </Card>
      <Card className="border border-muted flex flex-col h-full">
        <CardHeader>
          <CardTitle>Popularidad de Servicios</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col  gap-6">
          {services.map((service) => (
            <div key={service.name} className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-foreground">{service.name}</span>
                <span className="text-muted-foreground">{service.value}%</span>
              </div>
              <Progress
                value={service.value}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsCharts