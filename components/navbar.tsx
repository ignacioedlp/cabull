"use client"

import * as React from "react"
import Link from "next/link"
import { CalendarIcon, MenuIcon, Scissors, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

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
    { label: "Contacto", href: "/#localizacion" },
  ],
  buttonLabel = "Reservar",
  buttonHref = "/#reservar",
  onButtonClick,
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
    <header
      className={cn(
        // Estilos base del navbar - iguales al de page.tsx
        "sticky top-0 z-50 w-full border-b border-[#e7d0d1] bg-background-light/95 backdrop-blur-sm dark:bg-background-dark/95 dark:border-gray-800",
        className
      )}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="w-full max-w-[960px] flex items-center justify-between py-4">
            {/* Logo a la izquierda */}
            <div className="flex items-center gap-4 ">
              {logo || (
                <div className="size-6 text-primary">
                  <Scissors className="size-6" />
                </div>
              )}
              <h2 className="text-xl font-black leading-tight tracking-tight">CABULL</h2>
            </div>

            {/* Menú de navegación - visible en desktop, oculto en móvil */}
            <nav className="hidden md:flex items-center gap-8">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                >
                  <Button variant="link">{item.label}</Button>
                </Link>
              ))}
            </nav>

            {/* Botón "Reservar" - visible en desktop */}
            <div className="hidden md:flex">
              <Link
                href={buttonHref}
                onClick={onButtonClick}
              >
                <Button>{buttonLabel}</Button>
              </Link>
            </div>

            {/* Botón del menú hamburguesa - visible solo en móvil */}
            <button
              type="button"
              className="md:hidden "
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
        </div>

        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#e7d0d1] dark:border-gray-800">
            <div className="px-4 md:px-10 lg:px-40">
              <div className="w-full max-w-[960px] space-y-1 px-2 pb-3 pt-4">
                {/* Items del menú en móvil */}
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium "
                    onClick={closeMobileMenu}
                  >
                    <Button variant="link">{item.label}</Button>
                  </Link>
                ))}
                {/* Botón en el menú móvil */}
                <div className="pt-2">
                  <Link
                    href={buttonHref}
                    onClick={(e) => {
                      closeMobileMenu()
                      onButtonClick?.()
                    }}
                  >
                    <Button className="w-full">{buttonLabel}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

