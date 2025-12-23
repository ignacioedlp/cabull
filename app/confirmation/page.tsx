import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { CalendarIcon, CheckCircleIcon, ClockIcon, MapIcon, MapPinIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { confirmAppointment } from "@/actions/appointments";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Función auxiliar para formatear precio en ARS
function formatPriceARS(price: number | null): string {
  if (!price) return "Consultar precio"
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

dayjs.extend(timezone)
dayjs.extend(utc)
// Metadatos
export const metadata: Metadata = {
  title: "CABULL | Confirmación de Reserva",
  description: "CABULL | Confirmación de Reserva",
  keywords: ["confirmación", "reserva", "barbershop", "La Plata", "Buenos Aires", "Argentina"],
  openGraph: {
    title: "CABULL | Confirmación de Reserva",
    description: "CABULL | Confirmación de Reserva",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2"],
  },
}

interface ConfirmationPageProps {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function Page({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams
  const token = params.token

  // Si no hay token, mostrar error
  if (!token) {
    return (
      <div className="relative flex min-h-screen w-full flex-col font-serif">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-12 md:px-20 lg:px-40">
          <div className="w-full max-w-[720px] rounded-xl shadow-sm border border-muted p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                <XCircleIcon className="size-10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-foreground mb-3">
                Token no válido
              </h1>
              <p className="text-muted-foreground text-base md:text-lg font-normal leading-normal max-w-md">
                No se proporcionó un token de confirmación válido. Por favor, verifica el enlace que recibiste por email.
              </p>
              <Button className="mt-6" asChild>
                <a href="/">Volver al inicio</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Intentar confirmar el appointment
  const result = await confirmAppointment(token)

  // Si hay un error, mostrar pantalla de error
  if (!result.success || !result.appointment) {
    return (
      <div className="relative flex min-h-screen w-full flex-col font-serif">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-12 md:px-20 lg:px-40">
          <div className="w-full max-w-[720px] rounded-xl shadow-sm border border-muted p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                <XCircleIcon className="size-10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-foreground mb-3">
                Error al confirmar la reserva
              </h1>
              <p className="text-muted-foreground text-base md:text-lg font-normal leading-normal max-w-md">
                {result.error || "Ocurrió un error al confirmar tu reserva. Por favor, contacta al negocio."}
              </p>
              <Button className="mt-6" asChild>
                <a href="/">Volver al inicio</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Si todo salió bien, mostrar pantalla de éxito con la información
  const appointment = result.appointment
  const appointmentDate = dayjs(appointment.startAt).tz('America/Argentina/Buenos_Aires')
  const endTime = appointmentDate.add(appointment.service.durationMinutes, 'minute').tz('America/Argentina/Buenos_Aires')
  return (
    <div className="relative flex min-h-screen w-full flex-col font-serif">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-12 md:px-20 lg:px-40">
        <div className="w-full max-w-[720px] rounded-xl shadow-sm border border-muted p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircleIcon className="size-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-foreground mb-3">
              ¡Tu reserva está confirmada!
            </h1>
            <p className="text-muted-foreground text-base md:text-lg font-normal leading-normal max-w-md">
              Tu reserva en CABULL está confirmada. Te esperamos en la fecha y hora acordada.
            </p>
          </div>
          <div className="rounded-xl p-6 md:p-8 mb-8 border border-muted">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 pb-6 border-b border-muted">
                <div className="h-14 w-14 flex flex-col items-center justify-center rounded-lg bg-background border border-muted shadow-sm">
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    {appointmentDate.locale('es').format('MMM')}
                  </span>
                  <span className="text-xl font-black text-foreground">
                    {appointmentDate.format('DD')}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-foreground">
                    {appointmentDate.locale('es').format('dddd, DD [de] MMMM')}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ClockIcon className="size-4" />
                    <span className="text-base font-medium">
                      {appointmentDate.format('HH:mm')} - {endTime.format('HH:mm')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14 border-2 border-background shadow-sm bg-muted flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">
                      {appointment.barber.name?.charAt(0).toUpperCase() || appointment.barber.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-foreground text-base font-bold leading-normal">
                      Peluquero: {appointment.barber.name || appointment.barber.email}
                    </p>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                      {appointment.barber.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:justify-end">
                  <div className="p-2 rounded-full bg-background shadow-sm text-foreground">
                    <MapPinIcon className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-foreground text-sm font-bold">CABULL La Plata</p>
                    <p className="text-muted-foreground text-xs">Calle 8 #1183, La Plata</p>
                    <a
                      className="text-xs font-bold text-primary underline mt-1"
                      href="https://maps.google.com/?q=Calle+8+1183+La+Plata"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-muted">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground text-sm">Servicio</span>
                  <span className="text-foreground font-medium text-sm text-right">
                    {appointment.service.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Precio Total</span>
                  <span className="text-foreground font-bold text-lg text-right">
                    {formatPriceARS(appointment.service.basePrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reserva+CABULL+-+${encodeURIComponent(appointment.service.name)}&dates=${appointmentDate.format('YYYYMMDDTHHmmss')}/${endTime.format('YYYYMMDDTHHmmss')}&details=${encodeURIComponent(`Servicio: ${appointment.service.name}\nBarbero: ${appointment.barber.name || appointment.barber.email}\nEmail: ${appointment.customerEmail}`)}&location=CABULL+La+Plata`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarIcon className="size-4" />
                Agendar en Google Calendar
              </a>
            </Button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Necesitas hacer cambios? <a className="text-foreground font-bold underline" href="mailto:contacto@cabull.com">Contacta al negocio</a>
            </p>
          </div>
        </div>
        <div className="w-full max-w-[720px] mt-8 opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-full h-32 rounded-lg bg-muted overflow-hidden relative">
            <iframe className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Calle+8+1183,+La+Plata,+Buenos+Aires,+Argentina&output=embed" style={{ border: 0 }} width="100%" >
              <span className="sr-only">Mapa de Google Maps</span>
            </iframe>
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <Button variant="outline" asChild>
                <a
                  href="https://maps.google.com/?q=Calle+8+1183+La+Plata"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapIcon className="size-4" />
                  Ver en el mapa
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}