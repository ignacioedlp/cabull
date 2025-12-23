"use client"

import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

// Interface para definir las props del componente TimelineRow
interface TimelineRowProps {
  // Hora de la cita
  time: string
  timePeriod: string // "AM" o "PM"
  
  // Contenido del círculo (ícono o imagen)
  circleContent: 'icon' | 'image' | 'nested-image'
  icon?: LucideIcon // Ícono a mostrar si circleContent es 'icon'
  imageUrl?: string // URL de la imagen si circleContent es 'image' o 'nested-image'
  imageAlt?: string // Texto alternativo para la imagen
  circleBgColor?: string // Color de fondo del círculo (para íconos)
  circleBorderColor?: string // Color del borde del círculo
  
  // Información de la cita
  customerName: string
  serviceName: string
  serviceIcon?: LucideIcon // Ícono del servicio
  serviceDuration?: string // Duración del servicio
  
  // Estado y badges
  status?: {
    label: string
    bgColor: string // Clase completa, ej: "bg-green-100"
    textColor: string // Clase completa, ej: "text-green-700"
    darkBgColor: string // Clase completa con dark:, ej: "dark:bg-green-900/30"
    darkTextColor: string // Clase completa con dark:, ej: "dark:text-green-400"
  }
  isCompleted?: boolean // Si la cita está completada (tacha el nombre)
  
  // Estilos de la tarjeta
  cardBgColor?: string
  cardBorderStyle?: 'solid' | 'dashed' // Estilo del borde
  leftBorderColor?: string // Color del borde izquierdo
  showLeftBorder?: boolean // Mostrar borde izquierdo
  
  // Botones de acción
  buttons?: ReactNode // Contenido personalizado para los botones
  
  // Opciones adicionales
  opacityOnHover?: boolean // Si debe cambiar la opacidad al hacer hover
}

// Componente TimelineRow - representa una fila individual del timeline
function TimelineRow({
  time,
  timePeriod,
  circleContent,
  icon: Icon,
  imageUrl,
  imageAlt,
  circleBgColor = 'bg-primary',
  circleBorderColor = 'border-background-light dark:border-background-dark',
  customerName,
  serviceName,
  serviceIcon: ServiceIcon,
  serviceDuration,
  status,
  isCompleted = false,
  cardBgColor = 'bg-background dark:bg-dark-card',
  cardBorderStyle = 'solid',
  leftBorderColor,
  showLeftBorder = false,
  buttons,
  opacityOnHover = false,
}: TimelineRowProps) {
  // Renderiza el contenido del círculo según el tipo
  const renderCircleContent = () => {
    if (circleContent === 'icon' && Icon) {
      // Círculo con ícono
      return (
        <div className={`${circleBgColor} text-primary-foreground rounded-full size-14 flex items-center justify-center border-4 ${circleBorderColor} shadow-sm`}>
          <Icon className="size-4" />
        </div>
      )
    }
    
    if (circleContent === 'image' && imageUrl) {
      // Círculo con imagen directa
      return (
        <div 
          className="bg-center bg-no-repeat bg-cover rounded-full size-14 border-4 border-primary shadow-md" 
          data-alt={imageAlt}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      )
    }
    
    if (circleContent === 'nested-image' && imageUrl) {
      // Círculo con imagen anidada (con contenedor adicional)
      return (
        <div className={`bg-background dark:bg-dark-card rounded-full size-14 flex items-center justify-center border-4 ${circleBorderColor}`}>
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-full"
            data-alt={imageAlt}
            style={{
              backgroundImage: `url("${imageUrl}")`,
              opacity: 0.8,
            }}
          />
        </div>
      )
    }
    
    return null
  }

  // Determina las clases CSS para el borde izquierdo
  // Usamos un objeto de mapeo para las clases de Tailwind (no se pueden construir dinámicamente)
  const leftBorderClassMap: Record<string, string> = {
    'primary': 'border-l-4 border-l-primary',
    'transparent': 'border-l-4 border-transparent',
  }
  
  const leftBorderClass = showLeftBorder && leftBorderColor && leftBorderClassMap[leftBorderColor]
    ? leftBorderClassMap[leftBorderColor]
    : 'border-l-4 border-transparent'

  // Construye las clases de la tarjeta
  const cardClasses = [
    'flex flex-col md:flex-row gap-4',
    cardBgColor,
    'p-5 rounded-xl border border-muted',
    cardBorderStyle === 'dashed' ? 'border-dashed' : '',
    cardBorderStyle === 'solid' ? 'border-b-2 shadow-sm' : '',
    showLeftBorder && leftBorderColor === 'primary' ? 'border-l-4 border-l-primary' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`grid grid-cols-[auto_1fr] gap-x-6 pb-8 ${opacityOnHover ? 'group opacity-60 hover:opacity-100 transition-opacity' : ''}`}>
      {/* Círculo del timeline */}
      <div className="flex flex-col items-center pt-1 z-10">
        {renderCircleContent()}
      </div>
      
      {/* Tarjeta con información de la cita */}
      <div className={cardClasses}>
        {/* Sección de hora */}
        <div className={`flex flex-col justify-center min-w-[80px] ${leftBorderClass} pl-3 md:border-l-0 md:pl-0 md:border-r md:border-muted md:pr-6`}>
          <p className="text-foreground text-lg font-bold">{time}</p>
          <p className="text-muted-foreground text-sm">{timePeriod}</p>
        </div>
        
        {/* Sección de información del cliente y servicio */}
        <div className="flex-1 flex flex-col justify-center gap-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-foreground text-lg font-bold ${isCompleted ? 'line-through decoration-muted-foreground' : ''}`}>
              {customerName}
            </h4>
            {status && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${status.bgColor} ${status.textColor} ${status.darkBgColor} ${status.darkTextColor}`}>
                {status.label}
              </span>
            )}
          </div>
          {serviceName && (
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              {ServiceIcon && <ServiceIcon className="size-4" />}
              {serviceName}{serviceDuration && ` • ${serviceDuration}`}
            </p>
          )}
        </div>
        
        {/* Sección de botones */}
        {buttons && (
          <div className="flex items-center md:border-l md:border-muted md:pl-6 gap-2">
            {buttons}
          </div>
        )}
      </div>
    </div>
  )
}

export default TimelineRow

