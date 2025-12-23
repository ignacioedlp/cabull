import { ClockIcon, MapPinIcon, PhoneIcon } from 'lucide-react'

function Location() {
  return (
    <>
      <section className="bg-background py-12 md:py-20 border-t border-muted" id="localizacion">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="px-4 mb-10 text-center">
                <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Ubicación</h2>
                <h1 className="text-3xl md:text-4xl font-black leading-tight">Encuéntranos en La Plata</h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
                <div className="flex flex-col justify-center gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">El Barbershop</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Ubicado en el corazón de la ciudad, nuestro espacio está diseñado para ser tu santuario. Acceso fácil y estacionamiento disponible cerca.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 items-start">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPinIcon className="size-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Dirección</h4>
                        <p className="text-muted-foreground mt-1">Calle 8 N° 1183<br />La Plata, Buenos Aires, Argentina</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ClockIcon className="size-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Horarios de Atención</h4>
                        <p className="text-muted-foreground mt-1">Lunes - Viernes: 9:00 - 19:00<br />Sábado y Feriado: 11:00 - 19:00</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      {/* Contacto */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <PhoneIcon className="size-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Contacto</h4>
                        <p className="text-muted-foreground mt-1">+54 9 221 563-1118</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[400px] w-full overflow-hidden rounded-xl bg-background shadow-lg border border-muted">
                  <iframe className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Calle+8+1183,+La+Plata,+Buenos+Aires,+Argentina&output=embed" style={{ border: 0 }} width="100%" >
                    <span className="sr-only">Mapa de Google Maps</span>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default Location