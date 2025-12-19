"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon, Scissors, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Definimos el tipo para los items del menú
interface NavItem {
  label: string
  href: string
}

// Props del componente Navbar
interface NavbarProps {
  logo?: React.ReactNode // Permite pasar un logo personalizado
  items?: NavItem[] // Items del menú de navegación
  buttonLabel?: string // Texto del botón
  buttonHref?: string // URL del botón (opcional)
  onButtonClick?: () => void // Función a ejecutar al hacer clic en el botón (opcional)
  className?: string // Clases CSS adicionales
}

export function Navbar({
  logo,
  items = [
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Reservar", href: "/#reservar" },
    { label: "Galeria", href: "/#galeria" },
    { label: "Contacto", href: "/#contacto" },
  ],
  className,
}: NavbarProps) {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Función para alternar (abrir/cerrar) el menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Función para cerrar el menú móvil cuando se hace clic en un enlace
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={cn(
        // Estilos base del navbar
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo a la izquierda */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-foreground flex items-center gap-2"
              onClick={closeMobileMenu}
            >
              <Scissors className="size-6" />
              CABULL
            </Link>
          </div>

          {/* Menú de navegación - visible en desktop, oculto en móvil */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Botón a la derecha - visible en desktop */}
          <div className="hidden md:flex md:items-center">
            <Link href={"/#reservar"}>
              <Button>Reservar</Button>
            </Link>
          </div>

          {/* Botón del menú hamburguesa - visible solo en móvil */}
          <button
            type="button"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-border px-2 pb-3 pt-4">
              {/* Items del menú en móvil */}
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              {/* Botón en el menú móvil */}
              <div className="pt-2">
                <Link href={"/#reservar"} onClick={closeMobileMenu}>
                  <Button className="w-full">Reservar</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

