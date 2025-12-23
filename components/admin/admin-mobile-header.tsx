"use client"

import { MenuIcon } from 'lucide-react'
import { useSidebar } from '@/context/sidebar-context'
import Image from 'next/image'

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
        <Image src="/logo.svg" alt="logo" width={100} height={100} className="dark:invert" />
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

