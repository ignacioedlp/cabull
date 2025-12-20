import { Button } from '@/components/ui/button'
import { LayoutDashboardIcon, CalendarIcon, UsersIcon, BarChartIcon, SettingsIcon, PlusIcon } from 'lucide-react'

function Sidebar({ active }: { active: 'bookings' | 'clients' | 'analytics' | 'settings' }) {


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
    <aside className="w-72 bg-background border-r border-border flex flex-col justify-between lg:flex">
      <div className="p-6 flex flex-col gap-8">
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
        <nav className="flex flex-col gap-2">

          {menuItems.map((item) => (
            <a key={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group ${active === item.href.split('/')[1] ? 'bg-muted' : ''}`} href={item.href}>
              <item.icon className="size-4" />
              <span className="text-muted-foreground group-hover:text-primary text-sm font-medium">{item.label}</span>
            </a>
          ))}

        </nav>
      </div>
      <div className="p-6 border-t border-border">
        <Button className="w-full flex items-center justify-center gap-2 ">
          <PlusIcon className="size-4" />
          <span>Agregar Cliente</span>
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar