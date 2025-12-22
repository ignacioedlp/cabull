import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

/**
 * AdminPageHeader Component
 * 
 * Este componente muestra el header principal de cada página de admin.
 * Incluye un título, subtítulo con icono, y acciones opcionales a la derecha.
 * 
 * @component
 * @param {string} title - El título principal de la página (ej: "Analisis", "Clientes")
 * @param {string} subtitle - El subtítulo que aparece debajo del título (ej: "Resumen de octubre de 2023")
 * @param {LucideIcon} icon - El componente de icono de lucide-react para mostrar junto al subtítulo
 * @param {ReactNode} [actions] - Contenido opcional para mostrar a la derecha (botones, inputs, etc.)
 * 
 * @example
 * // Sin acciones
 * <AdminPageHeader 
 *   title="Configuraciones" 
 *   subtitle="Administra las operaciones"
 *   icon={SettingsIcon}
 * />
 * 
 * @example
 * // Con acciones
 * <AdminPageHeader 
 *   title="Clientes" 
 *   subtitle="Total 2,453 Clientes"
 *   icon={UsersIcon}
 *   actions={
 *     <>
 *       <Input placeholder="Buscar..." />
 *       <Button>Agregar</Button>
 *     </>
 *   }
 * />
 */
interface AdminPageHeaderProps {
  title: string
  subtitle: string
  icon: LucideIcon
  actions?: ReactNode
}

export default function AdminPageHeader({ 
  title, 
  subtitle, 
  icon: Icon, 
  actions 
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      {/* Sección izquierda: Título y subtítulo */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="size-4" />
          <p className="text-base font-medium">{subtitle}</p>
        </div>
      </div>
      
      {/* Sección derecha: Acciones opcionales */}
      {actions && (
        <div className="flex gap-3 w-full md:w-auto">
          {actions}
        </div>
      )}
    </div>
  )
}

