/**
 * Componente Hero - Sección principal de bienvenida
 * 
 * Este componente muestra una sección hero con una imagen de fondo
 * de peluquería y un texto de bienvenida superpuesto.
 * 
 * Características:
 * - Imagen de fondo con overlay oscuro para mejorar la legibilidad del texto
 * - Texto centrado y destacado
 * - Diseño responsive que se adapta a diferentes tamaños de pantalla
 */

import Link from "next/link";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      // Estilos inline para la imagen de fondo
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920&q=80')",
        backgroundSize: "cover", // La imagen cubre todo el contenedor
        backgroundPosition: "center", // La imagen está centrada
        backgroundRepeat: "no-repeat", // No se repite la imagen
      }}
    >
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      {/* Este div crea una capa semitransparente sobre la imagen */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Contenedor del texto */}
      {/* z-20 asegura que el texto esté por encima del overlay */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center justify-center gap-4">
        {/* Texto principal de bienvenida */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
        Refinando el estilo en La Plata
        </h1>
        
        {/* Texto secundario opcional (puedes eliminarlo si no lo necesitas) */}
        <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
        Experimente el arte del cuidado personal en CABULL. Cortes elegantes, servicio sofisticado y un espacio diseñado para el caballero moderno.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button>
            <Link href="/#servicios">
              Reservar un turno
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/#servicios">
              Ver servicios
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

