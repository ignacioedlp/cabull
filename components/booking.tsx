"use client"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { CalendarClockIcon, InfoIcon, ArrowRightIcon, Loader2Icon } from "lucide-react"
import DayPicker from "./day-picker"
import dayjs, { Dayjs } from "dayjs"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { getServices } from "@/actions/services"
import { getBusinessHours } from "@/actions/business"
import { getTeam } from "@/actions/team"
import { getAvailableTimeSlots, createAppointment } from "@/actions/appointments"
import { toast } from "sonner"
import { AdminRole } from "@/lib/generated/prisma/enums"

// Función auxiliar para formatear precio en ARS
function formatPriceARS(price: number | null): string {
  if (!price) return "Consultar precio"
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

function Booking() {
  // Estados del formulario
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const [selectedHour, setSelectedHour] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estados para datos cargados
  const [services, setServices] = useState<Array<{
    id: string
    name: string
    description: string | null
    durationMinutes: number
    basePrice: number | null
  }>>([])
  const [timeSlots, setTimeSlots] = useState<Array<{ time: string; available: boolean }>>([])
  const [barbers, setBarbers] = useState<Array<{ id: string; email: string; name: string | null }>>([])
  const [businessHours, setBusinessHours] = useState<Array<{ weekday: number; startTime: string; endTime: string; isClosed: boolean }>>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  // Cargar datos iniciales
  useEffect(() => {
    async function loadInitialData() {
      // Cargar servicios
      const servicesResult = await getServices(true)
      if (servicesResult.success) {
        setServices(servicesResult.services)
      }

      // Cargar barberos activos
      const teamResult = await getTeam()
      if (teamResult.success) {
        // Filtrar solo barberos activos
        const activeBarbers = teamResult.team.filter(barber => barber.active && barber.role === AdminRole.BARBER)
        setBarbers(activeBarbers)
      }

      // Cargar business hours
      const hoursResult = await getBusinessHours()
      if (hoursResult.success && hoursResult.businessHours) {
        setBusinessHours(hoursResult.businessHours)
      }
    }

    loadInitialData()
  }, [])

  // Cargar slots disponibles cuando cambia la fecha
  useEffect(() => {
    async function loadTimeSlots() {
      if (!selectedDate) return

      setIsLoadingSlots(true)
      const slotsResult = await getAvailableTimeSlots(selectedDate.toDate())

      if (slotsResult.success) {
        setTimeSlots(slotsResult.slots)
        // Limpiar selección de hora si el slot ya no está disponible
        if (selectedHour && !slotsResult.slots.find(slot => slot.time === selectedHour && slot.available)) {
          setSelectedHour('')
        }
      } else {
        toast.error(slotsResult.error || "Error al cargar los horarios disponibles")
        setTimeSlots([])
      }

      setIsLoadingSlots(false)
    }

    loadTimeSlots()
  }, [selectedDate, selectedHour])

  // Manejar cambio de fecha
  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date)
    setSelectedHour('') // Limpiar selección de hora al cambiar de fecha
  }

  // Manejar submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validaciones
    if (!selectedService) {
      toast.error("Por favor selecciona un servicio")
      return
    }

    if (!selectedHour) {
      toast.error("Por favor selecciona un horario")
      return
    }

    if (!email || !email.includes('@')) {
      toast.error("Por favor ingresa un email válido")
      return
    }

    // Verificar que haya al menos un barbero disponible
    if (barbers.length === 0) {
      toast.error("No hay barberos disponibles. Por favor contacta al negocio.")
      return
    }

    // Seleccionar el primer barbero disponible (podrías implementar lógica más sofisticada)
    const barberId = barbers[0].id

    // Crear la fecha y hora completa
    const [hour, minute] = selectedHour.split(':').map(Number)
    const appointmentDateTime = selectedDate.hour(hour).minute(minute).second(0).millisecond(0)

    setIsSubmitting(true)

    try {
      const result = await createAppointment({
        serviceId: selectedService,
        customerEmail: email,
        startAt: appointmentDateTime.toDate(),
        barberId: barberId,
      })

      if (result.success) {
        toast.success("¡Turno reservado exitosamente! Revisa tu email para confirmar.")
        // Limpiar formulario
        setSelectedService('')
        setSelectedHour('')
        setEmail('')
        // Recargar slots para actualizar disponibilidad
        const slotsResult = await getAvailableTimeSlots(selectedDate.toDate())
        if (slotsResult.success) {
          setTimeSlots(slotsResult.slots)
        }
      } else {
        toast.error(result.error || "Error al crear el turno")
      }
    } catch {
      toast.error("Error inesperado al crear el turno")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Obtener los días de la semana que están cerrados
  const getDisabledDaysOfWeek = () => {
    return businessHours
      .filter(h => h.isClosed)
      .map(h => h.weekday)
  }

  // Obtener el rango de horarios para mostrar en el título
  const getTimeRange = () => {
    if (businessHours.length === 0) return "10:00 - 22:00"
    const dayOfWeek = selectedDate.day()
    const hours = businessHours.find(h => h.weekday === dayOfWeek)
    if (!hours || hours.isClosed) return "Cerrado"
    return `${hours.startTime} - ${hours.endTime}`
  }

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
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="service">Selecciona un Servicio</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="w-full " id="service" name="service">
                        <SelectValue placeholder="Seleccionar un servicio..." />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} {service.basePrice && `(${formatPriceARS(service.basePrice)})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Selecciona una Fecha</Label>
                    <DayPicker
                      minDate={dayjs()}
                      maxDate={dayjs().add(1, 'month')}
                      disabledDaysOfWeek={getDisabledDaysOfWeek()}
                      day={selectedDate}
                      handleAction={handleDateChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
                    <CalendarClockIcon className="size-6 text-primary" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">Horario Seleccionado</span>
                      <span className="text-sm font-medium text-foreground">
                        {selectedHour
                          ? `${selectedDate.format('DD/MM/YYYY')} a las ${selectedHour}`
                          : "Selecciona un horario abajo"}
                      </span>
                    </div>
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2Icon className="size-4 animate-spin" />
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirmar Reserva</span>
                        <ArrowRightIcon className="size-6 text-primary-foreground" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CalendarClockIcon className="size-6 text-primary" />
                  Horarios Disponibles ({getTimeRange()})
                </h3>
                {isLoadingSlots ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2Icon className="size-8 animate-spin text-primary" />
                  </div>
                ) : timeSlots.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No hay horarios disponibles para este día.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        type="button"
                        className={cn(
                          "w-full h-12 rounded-lg border-2 text-foreground transition-all text-center",
                          slot.available
                            ? selectedHour === slot.time
                              ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                              : "bg-background text-foreground border-muted hover:bg-primary/10"
                            : "bg-muted text-muted-foreground border-muted cursor-not-allowed"
                        )}
                        onClick={() => slot.available && setSelectedHour(slot.time)}
                        disabled={!slot.available}
                      >
                        <span className="text-lg font-medium">{slot.time}</span>
                      </Button>
                    ))}
                  </div>
                )}
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