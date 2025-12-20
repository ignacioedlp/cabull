import Sidebar from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BarChartIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon, LayoutDashboardIcon, Link, MenuIcon, MessageCircleIcon, MoreVerticalIcon, PlusIcon, ScissorsIcon, SearchIcon, SettingsIcon, UsersIcon } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "CABULL | Analiticas",
  description: "CABULL | Analiticas",
  keywords: ["clientes", "barbershop", "La Plata", "Buenos Aires", "Argentina"],
  openGraph: {
    title: "CABULL | Analiticas",
    description: "CABULL | Analiticas",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2"],
  },
}

function AnalyticsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar active="analytics" />
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
        <header className="lg:hidden flex items-center justify-between p-4   dark:bg-dark-card border-b border-muted border-b-2">
          <div className="flex items-center gap-3">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-8" data-alt="Barbershop logo small" style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfnJIhJetPsElvrVhdQ9ni3D7i7dU-6BjSMpvLiIOK5XewoCq6ZT0WUZYh42dWv0FnePXb2Nlt7BEo3JfcZ6rJKFkqKg9wAUWvUGvofwFkSEBDHAGf9bPpK5U31ocleMHOk1zOqOwzmq72q3BwRCZZxdZnZMbzo5nk2C3DXx70SZImoymYf1wh2kkhwJzh_05KKv7QFfO1lFK7-rbA-5dtCpUvFxhRRJAiu6TxxZ8gKbkrB8bvvCWGOEBSq9zY9YWcLjzGw_uzH4fL")'
            }}></div>
            <span className="font-bold text-lg">CABULL</span>
          </div>
          <button className="text-foreground">
            <MenuIcon className="size-4" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">Analisis</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChartIcon className="size-4" />
                <p className="text-base font-medium">Resumen de octubre de 2023</p>
              </div>
            </div>
            <div className="flex gap-3">

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AnalyticsPage