import Sidebar from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BarChartIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon, LayoutDashboardIcon, Link, MenuIcon, MessageCircleIcon, MoreVerticalIcon, PlusIcon, ScissorsIcon, SearchIcon, SettingsIcon, UsersIcon } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "CABULL | Clientes",
  description: "CABULL | Clientes",
  keywords: ["clientes", "barbershop", "La Plata", "Buenos Aires", "Argentina"],
  openGraph: {
    title: "CABULL | Clientes",
    description: "CABULL | Clientes",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2"],
  },
}

function ClientPgae() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar active="clients" />
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
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">Clientes</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <UsersIcon className="size-4" />
                <p className="text-base font-medium">Total 2,453 Clientes</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="w-full pl-10 pr-4 h-10 rounded-lg border border-muted border-b-2 bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all " placeholder="Search clients..." type="text" />
              </div>
              <Button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                <PlusIcon className="size-4" />
                <span>Agregar Cliente</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <Button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">Todos</Button>
            <Button className="px-4 py-2 rounded-full bg-muted border border-muted border-b-2 text-muted-foreground text-sm font-medium hover:bg-muted transition-colors">Miembros VIP</Button>
            <Button className="px-4 py-2 rounded-full bg-muted border border-muted border-b-2 text-muted-foreground text-sm font-medium hover:bg-muted transition-colors">Visitantes Recientes</Button>
            <Button className="px-4 py-2 rounded-full bg-muted border border-muted border-b-2 text-muted-foreground text-sm font-medium hover:bg-muted transition-colors">Inactivos</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-background rounded-xl border border-muted border-b-2 p-6 hover:shadow-lg transition-shadow group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-muted-foreground hover:text-primary">
                  <MoreVerticalIcon className="size-4" />
                </button>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-16 shadow-md border-2 border-background" style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFUAKxdCimcLnyAmqoSV6P_BLMr650699zzCovKDAw_eO8h-ClZqnQS4mf4yYJS-QC5-2dSvwYvLzLxZZ786C-R0oLyOoZlv-ly_zpWO5uzMf-33NA35ODTNlHjedAElexDaWj8k5HjPivZeyfxlNgbsjTkf2_Rr9Njt0IvXkjnh-QfwV51MX9TlZqwjw2g8Okz8wxZQxxeCPR-2qlKoTzdu9V1swAhb3PdxJB4jJ1IMSOPiPSNNKsFS8zaYiJxy4-3DgjWhR4ZUan")'
                }}></div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Martin Gomez</h3>
                  <p className="text-muted-foreground text-sm mb-2">+54 221 555-0123</p>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-800">VIP Member</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-muted flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last Visit</span>
                  <span className="font-bold text-foreground">Oct 20, 2023</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Visits</span>
                  <span className="font-bold text-foreground">24</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Preferred</span>
                  <span className="font-bold text-foreground flex items-center gap-1">
                    <ScissorsIcon className="size-4" /> Fade
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 py-2 ">Reservar Cita</Button>
                <Button variant={"outline"}>
                  <MessageCircleIcon className="size-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <div className="bg-background rounded-xl border border-muted border-b-2 p-6 hover:shadow-lg transition-shadow group cursor-pointer relative overflow-hidden flex flex-col justify-center items-center min-h-[280px] border-dashed">
              <div className="bg-muted rounded-full size-16 flex items-center justify-center mb-4 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <PlusIcon className="size-4" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Agregar Cliente</h3>
              <p className="text-muted-foreground text-sm text-center px-4">Crea un nuevo perfil para un cliente nuevo o una nueva reserva.</p>
            </div>
          </div>
          <div className="flex justify-center mt-12 mb-8">
            <nav className="flex items-center gap-2">
              <Button variant={"outline"} className="flex items-center justify-center size-10 rounded-lg border border-muted border-b-2 text-muted-foreground hover:bg-muted disabled:opacity-50">
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button variant={"default"} className="size-10">1</Button>
              <Button variant={"outline"} className='size-10'>2</Button>
              <Button variant={"outline"} className='size-10'>3</Button>
              <span className="text-muted-foreground px-2">...</span>
              <Button variant={"outline"} className='size-10'>
                <ChevronRightIcon className="size-4" />
              </Button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ClientPgae