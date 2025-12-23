import { MapPinIcon, PhoneIcon, MailIcon, ScissorsIcon, Instagram, InstagramIcon } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import Image from 'next/image'

function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-muted pt-16 pb-8" id="contact">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-4 mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <Image src="/logo.svg" alt="logo" width={100} height={100} className="dark:invert" />
                </div>
                <p className="text-sm text-muted-foreground">Refinando el estilo en La Plata desde 2018. Cuidado personal tradicional para el hombre moderno.</p>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-primary font-bold text-sm uppercase tracking-wider">Explorar</h3>
                <div className="flex flex-col gap-2">
                  <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/#nosotros">Sobre Nosotros</Link>
                  <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/#servicios">Servicios</Link>
                  <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/#reservas">Reservar en Línea</Link>
                  <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/#galeria">Galería</Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-primary font-bold text-sm uppercase tracking-wider">Contacto</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPinIcon className="size-3 text-primary shrink-0" />
                    <span>Calle 8 N° 1183<br />La Plata, Buenos Aires, Argentina</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PhoneIcon className="size-3 text-primary shrink-0" />
                    <span>+54 9 221 563-1118</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <InstagramIcon className="size-3 text-primary shrink-0" />
                    <span>cabullbarberlaplata</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-primary font-bold text-sm uppercase tracking-wider">Horarios</h3>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="font-medium text-primary">9am - 7pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado y Feriado</span>
                    <span className="font-medium text-primary">11am - 7pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span className="text-primary font-bold">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-muted pt-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground text-center md:text-left">© 2023 CABULL Barbershop. Todos los derechos reservados.</p>
              <div className="flex gap-4 items-center">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer