"use client"

import { Button } from '@/components/ui/button'
import { CalendarIcon, UsersIcon, BarChartIcon, SettingsIcon, XIcon, LogOutIcon } from 'lucide-react'
import { ModeToggle } from '../mode-toggle'
import { useSidebar } from '@/context/sidebar-context'

function Sidebar({ active }: { active: 'bookings' | 'clients' | 'analytics' | 'settings' }) {
  const { isOpen, close } = useSidebar()

  const menuItems = [

    {
      icon: CalendarIcon,
      label: 'Schedule',
      href: '/bookings'
    },
    {
      icon: UsersIcon,
      label: 'Clients',
      href: '/clients'
    },
    {
      icon: BarChartIcon,
      label: 'Performance',
      href: '/analytics'
    },
    {
      icon: SettingsIcon,
      label: 'Settings',
      href: '/settings'
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
            <div className="flex gap-4 items-center">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm"
                data-alt="Barbershop logo with scissors and comb icon"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuATp5ATnvlUtV8g_ZnyAMDIcj9F_YQzJE9lTA3xfRGLFRb1LmB0jusL00RKrvrxfijvCucyh_JDZJY-gthnsPQduOXEF40-tfJq75MP4wpuCOAxFYkVzqSmgrbtn2Iygrp21XTtjLI5KzrsCFcAnWVIT-kuzEPD7fATSjj_ewRCT1BOoYTKuLsCQtUGY7WRH1KzPZCM6kxQO4-pu1WQNXKaHFO5F3j47BSSowSK9DsFh-eKUZScvAAaeU4YpR0It-71ri1KDjqcZoVD")'
                }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-tight">CABULL Barber</h1>
                <p className="text-muted-foreground text-sm font-medium">La Plata Branch</p>
              </div>
            </div>
            {/* Botón de cerrar solo visible en móviles */}
            <button
              onClick={close}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Cerrar menú"
            >
              <XIcon className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">

            {menuItems.map((item) => (
              <a
                key={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group ${active === item.href.split('/')[1] ? 'bg-muted' : ''}`}
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
          <Button className="flex items-center justify-center gap-2 w-45" onClick={close} variant={"destructive"}>
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