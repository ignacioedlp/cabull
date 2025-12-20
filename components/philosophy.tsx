import { ScissorsIcon, Smile, StarIcon } from "lucide-react";

function Philosophy() {
  return (
    <section className="py-12 md:py-20" id="nosotros">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-col gap-10 px-4">
              <div className="flex flex-col gap-4 text-center md:text-left">
                <h2 className="text-primary text-sm font-bold uppercase tracking-widest">Nuestra filosofía</h2>
                <h1 className=" text-3xl md:text-4xl font-black leading-tight tracking-tight max-w-[720px]">
                  Más que un simple corte de pelo.
                </h1>
                <p className="text-muted-foreground  text-lg leading-relaxed max-w-[720px]">
                  Ubicado en el corazón de La Plata, CABULL se dedica al arte del cuidado personal tradicional fusionado con el estilo moderno. Creemos que cada visita debe ser una experiencia de relajación y refinamiento.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-4 rounded-xl border border-muted bg-background-light dark:bg-background-dark p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-primary size-10 flex items-center justify-center bg-primary/10 rounded-full">
                    <ScissorsIcon />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className=" text-lg font-bold">Barberos expertos</h3>
                    <p className="text-muted-foreground  text-sm leading-relaxed">Profesionales cualificados con años de experiencia dedicados a perfeccionar tu look con precisión.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-muted bg-background-light dark:bg-background-dark p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-primary size-10 flex items-center justify-center bg-primary/10 rounded-full">
                    <StarIcon />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className=" text-lg font-bold">Productos de primera</h3>
                    <p className="text-muted-foreground  text-sm leading-relaxed">Utilizamos solo productos de peluquería de primera calidad para garantizar la mejor salud para tu cabello y tu piel.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-muted bg-background-light dark:bg-background-dark p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-primary size-10 flex items-center justify-center bg-primary/10 rounded-full">
                    <Smile />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className=" text-lg font-bold">Ambiente relajante</h3>
                    <p className="text-muted-foreground  text-sm leading-relaxed">Un espacio moderno y sofisticado diseñado para tu comodidad. Siéntate, relájate y déjanos cuidar de ti.</p>
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

export default Philosophy