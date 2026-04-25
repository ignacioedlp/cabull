"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon, XIcon, LogOutIcon, LayoutDashboardIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import Image from "next/image"
import { useSession } from "@/lib/auth-client"
import { logout, getCurrentUser } from "@/actions/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { UserRole } from "@/lib/generated/prisma/enums"
import { User } from "@/lib/generated/prisma/client"

// Definimos el tipo para los items del menú
interface NavItem {
  label: string
  href: string
}

// Props del componente Navbar
interface NavbarProps {
  items?: NavItem[] // Items del menú de navegación
  buttonLabel?: string // Texto del botón
  buttonHref?: string // URL del botón (opcional)
  onButtonClick?: () => void // Función a ejecutar al hacer clic en el botón (opcional)
  className?: string // Clases CSS adicionales
}

export function Navbar({
  items = [
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Reservar", href: "/#reservas" },
    { label: "Galeria", href: "/#galeria" },
    { label: "Contacto", href: "/#localizacion" },
  ],
  buttonLabel = "Reservar",
  buttonHref = "/#reservas",
  onButtonClick,
  className,
}: NavbarProps) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  // Cargar datos del usuario actual (con role)
  React.useEffect(() => {
    if (session?.user?.id) {
      getCurrentUser().then(setCurrentUser)
    } else {
      setCurrentUser(null)
    }
  }, [session?.user?.id])

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

  // Función para logout
  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Sesión cerrada correctamente")
      router.push("/")
      closeMobileMenu()
    } catch {
      toast.error("Error al cerrar sesión")
    }
  }

  // Verificar si el usuario es staff, barber u owner
  const isAdminUser = currentUser && ["STAFF", "BARBER", "OWNER"].includes(currentUser.role as string)

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
              <Image src="/logo.svg" alt="logo" width={100} height={100} className="dark:invert" />
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

            {/* Botones de usuario - visible en desktop */}
            <div className="hidden md:flex items-center gap-3">
              {session?.user ? (
                <>
                  {isAdminUser && (
                    <Link href="/admin">
                      <Button variant="outline" className="flex items-center gap-2">
                        <LayoutDashboardIcon className="size-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                    <LogOutIcon className="size-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link
                  href={buttonHref}
                  onClick={onButtonClick}
                >
                  <Button>{buttonLabel}</Button>
                </Link>
              )}
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
                {/* Botones en el menú móvil */}
                <div className="pt-4 space-y-2">
                  {session?.user ? (
                    <>
                      {isAdminUser && (
                        <Link href="/admin" onClick={closeMobileMenu}>
                          <Button className="w-full flex items-center justify-center gap-2">
                            <LayoutDashboardIcon className="size-4" />
                            Admin
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="destructive"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => {
                          closeMobileMenu()
                          handleLogout()
                        }}
                      >
                        <LogOutIcon className="size-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link
                      href={buttonHref}
                      onClick={() => {
                        closeMobileMenu()
                        onButtonClick?.()
                      }}
                    >
                      <Button className="w-full">{buttonLabel}</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

