"use client"

import { Button } from '../ui/button'
import { CheckIcon, ScissorsIcon, ScanFace, CoffeeIcon, CheckCircleIcon, BrushIcon, Trash2Icon, ClockIcon } from 'lucide-react'

function BookingsTimeline() {
  return (
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
                Corte Clásico • 45m
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
              <h4 className="text-foreground text-lg font-bold">Almuerzo</h4>
              <p className="text-muted-foreground text-sm">1 hora</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-6 pb-8">
          <div className="flex flex-col items-center pt-1 z-10">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-14 border-4 border-primary shadow-md" data-alt="Client Martin Gomez photo" style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFUAKxdCimcLnyAmqoSV6P_BLMr650699zzCovKDAw_eO8h-ClZqnQS4mf4yYJS-QC5-2dSvwYvLzLxZZ786C-R0oLyOoZlv-ly_zpWO5uzMf-33NA35ODTNlHjedAElexDaWj8k5HjPivZeyfxlNgbsjTkf2_Rr9Njt0IvXkjnh-QfwV51MX9TlZqwjw2g8Okz8wxZQxxeCPR-2qlKoTzdu9V1swAhb3PdxJB4jJ1IMSOPiPSNNKsFS8zaYiJxy4-3DgjWhR4ZUan")'
            }}></div>
          </div>
          <div className="flex flex-col md:flex-row gap-4  p-5 rounded-xl border border-muted border-b-2 shadow-sm border-l-4 border-l-primary">
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
                Fade y Estilo • 45m
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
                Color y Resaltados • 2h
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
                Corte de Niños • 30m
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
  )
}

export default BookingsTimeline