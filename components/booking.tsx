import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { CalendarClockIcon, ChevronDownIcon, InfoIcon, ArrowRightIcon } from "lucide-react"

function Booking() {

  const hours = [
    { hour: '10:00', available: true },
    { hour: '11:00', available: true },
    { hour: '12:00', available: true },
    { hour: '13:00', available: true },
    { hour: '14:00', available: true },
    { hour: '15:00', available: false },
    { hour: '16:00', available: true },
  ]

  return (
    <section className="bg-background py-16 md:py-24" id="reservas">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="px-4 mb-10 text-center">
              <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Reservas</h2>
              <h1 className=" text-3xl md:text-4xl font-black leading-tight">Reserva tu Cita</h1>
              <p className="text-muted-foreground mt-2">Selecciona tu servicio, elige un horario y confirma tu reserva.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 px-4">
              <div className="flex-1 bg-background p-6 md:p-8 rounded-xl border border-muted shadow-sm">
                <form className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground" htmlFor="service">Selecciona un Servicio</label>
                    <div className="relative">
                      <select className="w-full h-12 rounded-lg border-muted bg-background text-foreground focus:border-primary focus:ring-primary pl-4 pr-10 appearance-none cursor-pointer" id="service" name="service">
                        <option disabled selected value="">Seleccionar un servicio...</option>
                        <option value="classic-cut">Corte Clásico ($25.000)</option>
                        <option value="beard-sculpt">Escultura de Barba ($15.000)</option>
                        <option value="full-experience">Experiencia Completa ($45.000)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <ChevronDownIcon className="size-6 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground" htmlFor="date">Selecciona una Fecha</label>
                    <input className="w-full h-12 rounded-lg border-muted bg-background text-foreground focus:border-primary focus:ring-primary pl-4" id="date" min="2023-10-27" name="date" type="date" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground" htmlFor="email">Email</label>
                    <input className="w-full h-12 rounded-lg border-muted bg-background text-foreground focus:border-primary focus:ring-primary pl-4 placeholder:text-muted-foreground" id="email" name="email" placeholder="you@example.com" type="email" />
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
                    <CalendarClockIcon className="size-6 text-primary" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">Horario Seleccionado</span>
                      <span className="text-sm font-medium text-foreground">Selecciona un horario abajo</span>
                    </div>
                  </div>
                  <Button type="submit">
                    <span>Confirmar Reserva</span>
                    <ArrowRightIcon className="size-6 text-primary-foreground" />
                  </Button>
                </form>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CalendarClockIcon className="size-6 text-primary" />
                  Horarios Disponibles (10:00 - 22:00)
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                  {hours.map((hour) => (
                    <button key={hour.hour} className={cn("w-full h-12 rounded-lg border-muted border-2 text-foreground   transition-all text-center", hour.available ? "bg-background text-foreground hover:bg-primary/10" : "bg-muted text-muted-foreground ")}>
                      {hour.hour}
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <InfoIcon className="size-10 text-yellow-600" />
                    <p className="text-sm text-yellow-800">Se requiere puntualidad para la cita. Si no se presenta a la cita, la reserva será cancelada y no se podrá reprogramar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking