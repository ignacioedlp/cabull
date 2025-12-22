"use client"

import { MenuIcon } from 'lucide-react'
import { useSidebar } from '@/context/sidebar-context'

/**
 * AdminMobileHeader Component
 * 
 * Este componente muestra el header móvil que aparece en todas las páginas de admin.
 * Solo se muestra en pantallas pequeñas (lg:hidden) y contiene el logo y el botón de menú.
 * 
 * @component
 * @example
 * <AdminMobileHeader />
 */
export default function AdminMobileHeader() {
  const { open } = useSidebar()

  return (
    <header className="lg:hidden flex items-center justify-between p-4 dark:bg-dark-card border-b-2 border-muted">
      {/* Logo y nombre de la barbería */}
      <div className="flex items-center gap-3">
        <div 
          className="bg-center bg-no-repeat bg-cover rounded-full size-8" 
          data-alt="Barbershop logo small" 
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfnJIhJetPsElvrVhdQ9ni3D7i7dU-6BjSMpvLiIOK5XewoCq6ZT0WUZYh42dWv0FnePXb2Nlt7BEo3JfcZ6rJKFkqKg9wAUWvUGvofwFkSEBDHAGf9bPpK5U31ocleMHOk1zOqOwzmq72q3BwRCZZxdZnZMbzo5nk2C3DXx70SZImoymYf1wh2kkhwJzh_05KKv7QFfO1lFK7-rbA-5dtCpUvFxhRRJAiu6TxxZ8gKbkrB8bvvCWGOEBSq9zY9YWcLjzGw_uzH4fL")'
          }}
        />
        <span className="font-bold text-lg">CABULL</span>
      </div>
      
      {/* Botón de menú para abrir/cerrar el sidebar en móvil */}
      <button 
        onClick={open}
        className="text-foreground p-2 hover:bg-muted rounded-lg transition-colors"
        aria-label="Abrir menú"
      >
        <MenuIcon className="size-5" />
      </button>
    </header>
  )
}

