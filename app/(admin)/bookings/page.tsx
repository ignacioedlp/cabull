import Sidebar from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BarChartIcon, CalendarIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, DollarSignIcon, ScanFace, LayoutDashboardIcon, Link, MenuIcon, MessageCircleIcon, MoreVerticalIcon, PlusIcon, ScissorsIcon, SearchIcon, SettingsIcon, UsersIcon, CoffeeIcon, CheckCircleIcon, BrushIcon, XIcon, Trash2Icon } from 'lucide-react'
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

// Helper function to format price in Argentine Peso (ARS) format
function formatPriceARS(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

function ClientPgae() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar active="bookings" />
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
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">Programación Diaria</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="size-4" />
                <p className="text-base font-medium">Martes, 24 de Octubre</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant={"outline"} >
                Día Anterior
              </Button>
              <Button variant={"outline"} >
                Día Siguiente
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-background dark:bg-dark-card border border-muted border-b-2 shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="size-4" />
                <p className="text-sm font-medium uppercase tracking-wide">Appointments</p>
              </div>
              <p className="text-foreground text-3xl font-bold">8</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-background dark:bg-dark-card border border-muted border-b-2 shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ClockIcon className="size-4" />
                <p className="text-sm font-medium uppercase tracking-wide">Horas Reservadas</p>
              </div>
              <p className="text-foreground text-3xl font-bold">6.5</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-background dark:bg-dark-card border border-muted border-b-2 shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSignIcon className="size-4" />
                <p className="text-sm font-medium uppercase tracking-wide">Ingresos Estimados</p>
              </div>
              <p className="text-foreground text-3xl font-bold">{formatPriceARS(240000)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-10 p-6 bg-background dark:bg-dark-card rounded-xl border border-muted border-b-2 shadow-sm">
            <div className="flex gap-6 justify-between items-center">
              <h3 className="text-foreground text-base font-bold">Progreso Diario</h3>
              <span className="text-foreground text-sm font-bold bg-muted px-2 py-1 rounded">25%</span>
            </div>
            <div className="rounded-full bg-muted h-3 overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: '25%' }}></div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">2 de 8 citas completadas</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-6 text-foreground">Cronología</h3>
            <div className="relative">
              <div className="absolute left-[27px] md:left-[27px] top-4 bottom-0 w-px bg-muted"></div>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 pb-8 group opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center pt-1 z-10">
                  <div className="bg-primary text-primary-foreground rounded-full size-14 md:size-14 flex items-center justify-center border-4 border-background-light dark:border-background-dark shadow-sm">
                    <CheckIcon className="size-4" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 bg-background dark:bg-dark-card p-5 rounded-xl border border-muted border-b-2 shadow-sm">
                  <div className="flex flex-col justify-center min-w-[80px] border-l-4 border-primary pl-3 md:border-l-0 md:pl-0 md:border-r md:border-muted md:pr-6">
                    <p className="text-foreground text-lg font-bold">09:00</p>
                    <p className="text-muted-foreground text-sm">AM</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-foreground text-lg font-bold line-through decoration-muted-foreground">Juan Pérez</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Completado</span>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <ScissorsIcon className="size-4" />
                      Classic Cut • 45m
                    </p>
                  </div>
                  <div className="flex items-center md:border-l md:border-muted md:pl-6">
                    <Button variant={"outline"} disabled>
                      Completado
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 pb-8 group opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center pt-1 z-10">
                  <div className="bg-primary text-primary-foreground rounded-full size-14 flex items-center justify-center border-4 border-background-light dark:border-background-dark shadow-sm">
                    <CheckIcon className="size-4" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4  p-5 rounded-xl border border-muted border-b-2 shadow-sm">
                  <div className="flex flex-col justify-center min-w-[80px] border-l-4 border-primary pl-3 md:border-l-0 md:pl-0 md:border-r md:border-muted md:pr-6">
                    <p className="text-foreground text-lg font-bold">10:15</p>
                    <p className="text-muted-foreground text-sm">AM</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-foreground text-lg font-bold line-through decoration-muted-foreground">Lucas Rodriguez</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Completado</span>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <ScanFace className="size-4" />
                      Barba y Toalla Caliente • 30m
                    </p>
                  </div>
                  <div className="flex items-center md:border-l md:border-muted md:pl-6">
                    <Button variant={"outline"} disabled>
                      Completado
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 pb-8">
                <div className="flex flex-col items-center pt-1 z-10">
                  <div className="bg-muted text-muted-foreground rounded-full size-14 flex items-center justify-center border-4 border-background-light dark:border-background-dark">
                    <CoffeeIcon className="size-4" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 p-5 rounded-xl border border-dashed border-muted bg-background dark:bg-dark-card">
                  <div className="flex flex-col justify-center min-w-[80px] pl-3 md:pl-0 md:pr-6">
                    <p className="text-foreground text-lg font-bold">11:30</p>
                    <p className="text-muted-foreground text-sm">AM</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-foreground text-lg font-bold">Lunch Break</h4>
                    <p className="text-muted-foreground text-sm">1 hour</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 pb-8">
                <div className="flex flex-col items-center pt-1 z-10">
                  <div className="bg-center bg-no-repeat bg-cover rounded-full size-14 border-4 border-primary shadow-md" data-alt="Client Martin Gomez photo" style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFUAKxdCimcLnyAmqoSV6P_BLMr650699zzCovKDAw_eO8h-ClZqnQS4mf4yYJS-QC5-2dSvwYvLzLxZZ786C-R0oLyOoZlv-ly_zpWO5uzMf-33NA35ODTNlHjedAElexDaWj8k5HjPivZeyfxlNgbsjTkf2_Rr9Njt0IvXkjnh-QfwV51MX9TlZqwjw2g8Okz8wxZQxxeCPR-2qlKoTzdu9V1swAhb3PdxJB4jJ1IMSOPiPSNNKsFS8zaYiJxy4-3DgjWhR4ZUan")'
                  }}></div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 bg-background dark:bg-dark-card p-5 rounded-xl border-l-4 border-primary border-y border-r border-y-muted border-r-muted shadow-md ring-4 ring-primary/5 dark:ring-primary/20">
                  <div className="flex flex-col justify-center min-w-[80px] pl-3 md:pl-0 md:border-r md:border-muted md:pr-6">
                    <p className="text-foreground text-lg font-bold">01:00</p>
                    <p className="text-muted-foreground text-sm">PM</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-foreground text-lg font-bold">Martin Gomez</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">En Silla</span>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <ScissorsIcon className="size-4" />
                      Fade &amp; Style • 45m
                    </p>
                  </div>
                  <div className="flex items-center md:border-l md:border-muted md:pl-6">
                    <Button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-primary hover:bg-[#505050] text-sm font-bold transition-all shadow-md active:scale-95">
                      <CheckCircleIcon className="size-4" />
                      Marcar Completado
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 pb-8">
                <div className="flex flex-col items-center pt-1 z-10">
                  <div className="bg-background dark:bg-dark-card rounded-full size-14 flex items-center justify-center border-4 border-background-light dark:border-background-dark">
                    <div
                      className="bg-center bg-no-repeat bg-cover rounded-full size-full"
                      data-alt="Client Julianne photo"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlqIu_1GXzb2YMNd-ow-2075erhywjNdfr5mrqFvZF4X3k-TRHUrsTzLeCsJO_HRca7BFBiveyMKjYHB0S03jcMI-yLtPWrOz7-tmEs-oXc38KVMp8VDmYgliyPg8GaKrRWqqILYDNo66AhVaA1U8Lyjs3XQh_NruMdPqsCM6wu3J2WNSdGRbm_s9aSonHZVFHIWPcPQWgyMH2oSqoaxKF6UlXQj_UfdQA-0us3jcbl-Su_dIxt7VEgevhlmcD-aBSff3P_6o0apCI")',
                        opacity: 0.8,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4  dark:bg-dark-card p-5 rounded-xl border border-muted border-b-2 shadow-sm">
                  <div className="flex flex-col justify-center min-w-[80px] border-l-4 border-transparent pl-3 md:border-l-0 md:pl-0 md:border-r md:border-muted md:pr-6">
                    <p className="text-foreground text-lg font-bold">02:00</p>
                    <p className="text-muted-foreground text-sm">PM</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <h4 className="text-foreground text-lg font-bold">Julianne Moore</h4>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <BrushIcon className="size-4" />
                      Color y Highlights • 2h
                    </p>
                  </div>
                  <div className="flex items-center md:border-l md:border-muted md:pl-6 gap-2">
                    <Button variant={"secondary"} >
                      <CheckCircleIcon className="size-4" />
                      Completar
                    </Button>
                    <Button variant={"ghost"}>
                      <Trash2Icon className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 pb-8">
                <div className="flex flex-col items-center pt-1 z-10">
                  <div className="bg-background dark:bg-dark-card text-foreground font-bold text-lg rounded-full size-14 flex items-center justify-center border-4 border-background-light dark:border-background-dark shadow-sm">
                    <ClockIcon className="size-4" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4  dark:bg-dark-card p-5 rounded-xl border border-muted border-b-2 shadow-sm">
                  <div className="flex flex-col justify-center min-w-[80px] border-l-4 border-transparent pl-3 md:border-l-0 md:pl-0 md:border-r md:border-muted md:pr-6">
                    <p className="text-foreground text-lg font-bold">04:15</p>
                    <p className="text-muted-foreground text-sm">PM</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <h4 className="text-foreground text-lg font-bold">Sam Davis</h4>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <ScissorsIcon className="size-4" />
                      Kids Cut • 30m
                    </p>
                  </div>
                  <div className="flex items-center md:border-l md:border-muted md:pl-6 gap-2">
                    <Button variant={"secondary"} >
                      <CheckCircleIcon className="size-4" />
                      Completar
                    </Button>
                    <Button variant={"ghost"}>
                      <Trash2Icon className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4 mb-12">
              <p className="text-muted-foreground text-sm">Fin de las citas programadas</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ClientPgae