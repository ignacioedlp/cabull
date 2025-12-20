/**
 * Componente Hero - Sección principal de bienvenida
 * 
 * Este componente muestra una sección hero con una imagen de fondo
 * de peluquería y un texto de bienvenida superpuesto.
 * 
 * Características:
 * - Imagen de fondo con overlay oscuro para mejorar la legibilidad del texto
 * - Contenedor con bordes redondeados que enmarca el contenido
 * - Texto centrado y destacado en color blanco
 * - Dos botones de acción con estilos personalizados
 * - Diseño responsive que se adapta a diferentes tamaños de pantalla
 */

import Link from "next/link";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-background-light dark:bg-background-dark pt-10 pb-10">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-8 relative overflow-hidden shadow-2xl" data-alt="Barber working on a client's hair in a dark, moody barbershop setting" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJMGL1Ai9ayVFpwnoUj23AEwQBQgeFpklmK9IJrYPKYpJZfeS4RFpuxmRLFSsk9PLlMm9pOD2kFqaqdMMRaQyXMRMNG_-8aXIt6wqhfw2zKFpeocMurqH5pEYZcIK6o2mMmyCLYCeG_MAjq7hiWd1aP7W16ORpE0uk_OsE_tEyBez54BplGog2bnYJfYRRq_Glfvc8VqLsq-dZVSc5_17pMVMZibxhW8m1ENlidHtv8-moUGDcJLINwYHe_bNfthwsGL2EKki5eYtN")' }}>
                  <div className="flex flex-col gap-4 text-center max-w-[700px] z-10">
                    <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tighter drop-shadow-lg">
                      Refinando el estilo en La Plata
                    </h1>
                    <h2 className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-[500px] mx-auto">
                      Experiencia el arte de la barbería en CABULL. Cortes elegantes, servicio sofisticado y un espacio diseñado para el moderno caballero.
                    </h2>
                  </div>
                  <div className="flex gap-4 z-10 pt-4">
                    <Link href="/#reservar">
                      <Button>Reservar un turno</Button>
                    </Link>
                    <Link href="/#servicios">
                      <Button variant="secondary">Ver Servicios</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

