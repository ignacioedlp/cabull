import { CircleCheck } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { getServices } from '@/actions/services'

// Define the type for service data
interface Service {
  title: string
  price: number
  features: string[]
  isPopular?: boolean
}

// Helper function to format price in Argentine Peso (ARS) format
function formatPriceARS(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Reusable ServiceCard component
interface ServiceCardProps {
  service: Service
}

function ServiceCard({ service }: ServiceCardProps) {

  // Determine card styles based on whether it's popular
  const cardClasses = service.isPopular
    ? 'flex flex-col gap-6 border-2 border-primary/20 bg-background relative overflow-hidden'
    : 'flex flex-col gap-6 border border-muted bg-background hover:border-primary/50 transition-colors'


  return (
    <Card className={cardClasses}>
      {/* Popular badge - only shown if service is popular */}
      {service.isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
          POPULAR
        </div>
      )}

      {/* Service header with title and price */}
      <CardHeader>
        <CardTitle>
          {service.title}
        </CardTitle>
        <div className="flex items-baseline gap-1 text-primary">
          <span className="text-4xl font-black tracking-tighter">{formatPriceARS(service.price)}</span>
          <span className="text-sm font-bold text-muted-foreground">/ turno</span>
        </div>
      </CardHeader>

      {/* Features list */}
      <CardContent>
        <ul className="flex flex-col gap-3">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
              <CircleCheck className="size-4" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      {/* Call to action button */}
      <CardFooter className="border-none"> <Button className="w-full">Seleccionar Servicio</Button></CardFooter>
    </Card>
  )
}

async function Services() {

  const { services } = await getServices()

  return (
    <section className="py-12 md:py-20 border-y border-muted" id="servicios">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="px-4 mb-10 text-center">
              <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Menú de Servicios</h2>
              <h1 className=" text-3xl md:text-4xl font-black leading-tight">Inversión en Ti</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              {/* Map through services data to render each service card */}
              {services.map((service, index) => (
                <ServiceCard key={index} service={{
                  title: service.name,
                  price: service.basePrice || 0,
                  features: service.features || [],
                  isPopular: false
                } as Service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services