"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowLeftIcon, UserIcon } from "lucide-react"

interface ClientFormProps {
  title: string
  subtitle: string
  buttonText: string
  buttonIcon: React.ReactNode
}

function ClientForm({ title, subtitle, buttonText, buttonIcon }: ClientFormProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-2">
              <div className="flex items-center justify-start">
                {/* go back button */}
                <Link href="/clients">
                  <Button variant="ghost" className="flex items-center justify-start gap-2" >
                    <ArrowLeftIcon className="size-4" />
                    <span className="text-sm font-normal leading-normal text-foreground">Volver</span>
                  </Button>
                </Link>
              </div>
              <h1 className="tracking-light text-[32px] font-bold leading-tight">{title}</h1>
              <p className="text-sm font-normal leading-normal text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 px-4 py-3">
            <div className="flex w-full flex-wrap items-end gap-4">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-xs font-bold tracking-wider leading-normal pb-3 uppercase text-foreground">Nombre Completo</p>
                <div className="flex w-full flex-1 items-stretch rounded-lg group">
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-r-none text-foreground focus:outline-0 focus:ring-0 border border-muted bg-background focus:border-primary h-14 placeholder:text-muted-foreground p-[15px] border-r-0 pr-2 text-base font-normal leading-normal transition-colors" placeholder="e.g. Juan Perez" value="" />
                  <div className="text-muted-foreground flex border border-muted bg-background items-center justify-center pr-[15px] pl-3 rounded-r-lg border-l-0">
                    <UserIcon className="size-4" />
                  </div>
                </div>
              </label>
            </div>
            <div className="flex w-full flex-wrap items-end gap-6">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-xs font-bold tracking-wider leading-normal pb-3 uppercase text-foreground">Email</p>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-0 border border-muted bg-background focus:border-primary h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal transition-colors" placeholder="juan@example.com" value="" />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-xs font-bold tracking-wider leading-normal pb-3 uppercase text-foreground">Teléfono</p>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-0 border border-muted bg-background focus:border-primary h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal transition-colors" placeholder="+54 221 ..." value="" />
              </label>
            </div>
            <div className="flex w-full flex-wrap items-end gap-6">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-xs font-bold tracking-wider leading-normal pb-3 uppercase text-foreground">Servicio Preferido</p>
                <select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-0 border border-muted bg-background focus:border-primary h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal transition-colors">
                  <option disabled selected value="">Selecciona un servicio</option>
                  <option value="haircut">Haircut</option>
                  <option value="beard">Afeitar</option>
                  <option value="combo">Corte y Afeitar</option>
                  <option value="shave">Lavado con Toalla Caliente</option>
                  <option value="color">Coloración</option>
                </select>
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-xs font-bold tracking-wider leading-normal pb-3 uppercase text-foreground">Tipo de Cliente</p>
                <select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-0 border border-muted bg-background focus:border-primary h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal transition-colors">
                  <option selected value="regular">Regular</option>
                  <option value="vip">VIP</option>
                  <option value="new">Nuevo Cliente</option>
                </select>
              </label>
            </div>
            <div className="flex w-full flex-wrap items-end gap-4">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-xs font-bold tracking-wider leading-normal pb-3 uppercase text-foreground">Notas (Opcional)</p>
                <textarea className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-0 border border-muted bg-background focus:border-primary min-h-[140px] placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal transition-colors" placeholder="Estilo de fade, prefiere tijera en la parte superior, alergias..."></textarea>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-4 px-4 py-8 mt-4 border-t border-muted bg-background">
            <Button variant="outline">
              CANCELAR
            </Button>
            <Button>
              {buttonText}
              {buttonIcon}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientForm