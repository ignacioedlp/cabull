"use client"

import { Button } from '@/components/ui/button'
import { CalendarIcon, UsersIcon, BarChartIcon, SettingsIcon, XIcon, LogOutIcon } from 'lucide-react'
import { ModeToggle } from '../mode-toggle'
import { useSidebar } from '@/context/sidebar-context'
import { logout } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function Sidebar({ active }: { active: 'bookings' | 'clients' | 'analytics' | 'settings' }) {
  const { isOpen, close } = useSidebar()
  const router = useRouter()

  // Función para cerrar sesión usando server action
  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result.success) {
        // Redirigir a la página de login después de cerrar sesión
        router.push('/admin/login')
      } else {
        // Aún así redirigir a login si hubo un error
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      // Aún así redirigir a login
      router.push('/admin/login')
    }
  }

  const menuItems = [
    {
      icon: CalendarIcon,
      label: 'Itinerario Diario',
      href: '/admin/bookings'
    },
    {
      icon: UsersIcon,
      label: 'Clientes',
      href: '/admin/clients'
    },
    {
      icon: BarChartIcon,
      label: 'Rendimiento',
      href: '/admin/analytics'
    },
    {
      icon: SettingsIcon,
      label: 'Configuraciones',
      href: '/admin/settings'
    }
  ]

  return (
    <>
      {/* Overlay para móviles - se muestra cuando el sidebar está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static
        top-0 left-0
        h-full w-72
        bg-background border-r border-border
        flex flex-col justify-between
        z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 flex flex-col gap-8">
          {/* Header del sidebar con botón de cerrar en móviles */}
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center w-full justify-center">
              <Image src="/logo.svg" alt="logo" width={180} height={180} className="dark:invert" />
            </div>
          </div>
          <nav className="flex flex-col gap-2">

            {menuItems.map((item) => (
              <a
                key={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group ${active === item.href.split('/')[2] ? 'bg-muted' : ''}`}
                href={item.href}
                onClick={close} // Cerrar el sidebar al hacer clic en un enlace en móviles
              >
                <item.icon className="size-4" />
                <span className="text-muted-foreground group-hover:text-primary text-sm font-medium">{item.label}</span>
              </a>
            ))}

          </nav>
        </div>
        <div className="p-6 border-t border-border flex gap-4 items-center justify-between">
          <Button
            className="flex items-center justify-center gap-2 flex-1"
            onClick={handleLogout}
            variant={"destructive"}
          >
            <LogOutIcon className="size-4" />
            <span>Cerrar Sesión</span>
          </Button>
          <ModeToggle />
        </div>
      </aside>
    </>
  )
}

export default Sidebar