import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { CalendarIcon, CheckCircleIcon, ClockIcon, MapIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-serif">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-12 md:px-20 lg:px-40">
        <div className="w-full max-w-[720px]  rounded-xl shadow-sm border border-muted p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full  text-green-600">
              <CheckCircleIcon className="size-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-foreground mb-3">
              Tu reserva está confirmada!
            </h1>
            <p className="text-muted-foreground text-base md:text-lg font-normal leading-normal max-w-md">
              Tu reserva en CABULL está confirmada.
            </p>
          </div>
          <div className=" rounded-xl p-6 md:p-8 mb-8 border border-muted">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 pb-6 border-b border-muted">
                <div className="h-14 w-14 flex flex-col items-center justify-center rounded-lg bg-background border border-muted shadow-sm">
                  <span className="text-xs font-bold text-muted-foreground uppercase">{new Date().toLocaleString('es-ES', { month: 'short' })}</span>
                  <span className="text-xl font-black text-foreground">12</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-foreground">{new Date().toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ClockIcon className="size-4" />
                    <span className="text-base font-medium">{new Date().toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {new Date().toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14 border-2 border-background shadow-sm" data-alt="Portrait of a professional barber with a beard" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ey5KJiveZju5LTOVv_mqno3TfeNPzUkYzDjxXRJ6q0y78FVqjGqgfNc6_v1X80MSEknP4DQloVQJJd4ZkaugBtdxPHz40z9MP42DzWtl5cpG2ks_jS97_u1utgvfNW6gx6ZTm7bcEv4Ic8JF_PnRW9DO1Md78r7cYVcW4ze2EvxGeBeO2g-zzqL4osS-bHlBO_ieX-FtFMtzL4N2S4FA1e7vv_z_UyZRqo5f5l4N6EHZhxLNbjUqsIMT_eMAXvg7S6TvAXWKQKcK")' }}>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-foreground text-base font-bold leading-normal">Peluquero: Matias</p>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">Peluquero Senior</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:justify-end">
                  <div className="p-2 rounded-full bg-background shadow-sm text-foreground">
                    <MapPinIcon className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-foreground text-sm font-bold">CABULL La Plata</p>
                    <p className="text-muted-foreground text-xs">Calle 50 #123, La Plata</p>
                    <a className="text-xs font-bold text-primary underline mt-1" href="#">Ver en Google Maps</a>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-muted">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground text-sm">Servicio</span>
                  <span className="text-foreground font-medium text-sm text-right">Corte Clásico &amp; Afeitar</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Precio Total</span>
                  <span className="text-foreground font-bold text-lg text-right">$10.000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <CalendarIcon className="size-4" />
              Agendar en Google Calendar
            </Button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">¿Necesitas hacer cambios? <a className="text-foreground font-bold underline" href="#">Cancelar o Reprogramar</a></p>
          </div>
        </div>
        <div className="w-full max-w-[720px] mt-8 opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-full h-32 rounded-lg bg-muted overflow-hidden relative">
            <div className="absolute inset-0 bg-cover bg-center grayscale contrast-75" data-alt="Map view of La Plata showing streets and location marker" data-location="La Plata, Argentina" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAni6cUF9Skv3GdSFNQmis6SJKC272bkZ89nDIDAzRr9hVgldxXDOQjuY5eOFn1IlnwcF0aHdBSH2mc5gJeNRdT5DjkCF4ApzxF0EmCGOPt8tL1aifErGuox6CnCAboJQndahDX4-Vcqirh_uehx1aDN9C2RZtN3AYIVhNKh-WqQ6JK9j6CaT6_DQovkh4v5RO8yPzJps-fkWwPEmgVdB5EJ3x8CnnOhyO3VgyXG1w5qPD43k-MzVKH2-ugHIitTIcZXarxf6ltZggZ")' }}>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <Button variant="outline">
                <MapIcon className="size-4" />
                Ver en el mapa
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div >
  )
}