import { ScissorsIcon, Smile, StarIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

const philosophy = [
  {
    title: "Barberos expertos",
    description: "Profesionales cualificados con años de experiencia dedicados a perfeccionar tu look con precisión.",
    icon: <ScissorsIcon />
  },
  {
    title: "Productos de primera",
    description: "Utilizamos solo productos de peluquería de primera calidad para garantizar la mejor salud para tu cabello y tu piel.",
    icon: <StarIcon />
  },
  {
    title: "Ambiente relajante",
    description: "Un espacio moderno y sofisticado diseñado para tu comodidad. Siéntate, relájate y déjanos cuidar de ti.",
    icon: <Smile />
  }
]

const PhilosophyCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
  return (
    <Card>
      <CardHeader>
        <div className="text-primary size-10 flex items-center justify-center bg-primary/10 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h3 className=" text-lg font-bold">{title}</h3>
          <p className="text-muted-foreground  text-sm leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

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
                {philosophy.map((item) => (
                  <PhilosophyCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Philosophy