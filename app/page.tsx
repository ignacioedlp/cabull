import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Navbar con configuración personalizada */}
      <Navbar/>
      
      {/* Sección Hero con imagen de fondo y texto de bienvenida */}
      <Hero />
    </div>
  );
}