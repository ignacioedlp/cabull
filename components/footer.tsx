import { MapPinIcon, PhoneIcon, MailIcon, ScissorsIcon } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-muted pt-16 pb-8" id="contact">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-4 mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <ScissorsIcon className="size-6 text-primary" />
                  <h2 className="text-lg font-black tracking-tight">CABULL</h2>
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
                    <span>Calle 12 N° 1234<br />La Plata, Buenos Aires, Argentina</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PhoneIcon className="size-3 text-primary shrink-0" />
                    <span>+54 9 221 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MailIcon className="size-3 text-primary shrink-0" />
                    <span>info@cabull.com</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-primary font-bold text-sm uppercase tracking-wider">Horarios</h3>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="font-medium text-primary">10am - 8pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span className="font-medium text-primary">9am - 6pm</span>
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
                <a aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors" href="#">
                  <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
                <a aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors" href="#">
                  <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                </a>
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