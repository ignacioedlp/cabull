"use client"

import React, { useState } from "react"

// Array de imágenes - esto elimina la repetición de código
// Cada objeto contiene la URL de la imagen y su descripción alternativa
const galleryImages = [
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2",
    alt: "Close up of a clean fade haircut"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBbhSNVKtvpsPbwQW5vqkHB5aMMGWJOnjCtA2PYnklBK41T29UJrxAro9T40DN1okUYYM89QcvKAkiORQ7zap2pvRdUSZopVl1hHKJjRLn0xwtKBSkJfjbfunPr55mQtNuUWX4JtIfXmahfRRI2-oE849tR4ruhGxQ233WisR9qApEXjIuo_u9h05hjik-2sDmFzI9mQqVJwsaIQBlPsAHcsMDzKmODQ0mTJzCa1Ie2APGIfvYeoizyEIa60joKiXgbhYnKElIRCsu",
    alt: "Barber trimming a beard with precision"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4EEGD_r1UrWViBehk7DeM4hNuhubz9oBCKGLWrIQmE01ckD4GuUFzW-3EM3tCI6GPXDliaiJqWSOFMpAkwPPu001mgo2OZetCenSpk7QcLGfMvCE6xoHtqm1rAUyGXB_JoT02-xRugr0cCvFQ7x1ZpXGcNtssqX3rnriLFMiH_9q8U_5rT73C2QDDRXTT1qAnePE4sJkyl75OXbCwP_p1w-waK6dA-euCH6BQLVEwdkxPNP10KG2ZS37Ii2toz7uGHI2sIWrPsQmz",
    alt: "Modern textured haircut on a man"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQbqIi3UUaa8hQPTU-q0G23skW_33KOqVSekUYqq1lidnFgS1XIHhh7aElmDQhRjYLE40HD3_MSwYK-ah3q3x3EXb488vjcf6oS1ZIk3uDl5ulanFGv4BNtDKbk5in1W0YOs5s5o0IVwoQRp1EqnMG89vlBTK4c6vDvFpB5sTzvJgY95skAcgsx5gPKZdCIIUFJNIhrqZsqbtHVXSgFhU4Bb2QeuF6yjZou_SGrMnfGbZUc7AGiCct4wkXA5NG-HOAcIsMUvWNcPwF",
    alt: "Barber tools scissors and comb"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaSQrQBw0umo7NJJOSDSTLHwjvIIHgldkWg1mCulXIzqg3jV3kRoKDQR3raPWiJK1s4HYJo7FJLYUvMjXlzT-r4JeLMqRQfJXI_yB46ksTYEynJlriP0vW6VzEzn_XNHApHs6Fi4SZipY1-NphYmvZYsYH0Ut0zdhRFv-9Gz5zQ0nja3CAA5GCw9Qqr4zUnrV29FemgO8jNkRxAKz4FPHHeMI2GiuRsTmm1Y-InBQg9hm_uRQBnld6iDp1V2lXG3YbgGNVe2tcnro2",
    alt: "Man getting a haircut in a barbershop"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjFQYDDK8hyWqeZjrL72gRKHSF8E_MmNH77UryHsdXCOE1VV2suo46-l4T5E393n2tFXIo5eIv73I-vj4KbqaVLqgZuMgYv9VyC19FD2-b1DyKp5XyU9jTcY8yOXqf5jo9WYaI-6rSYZZsuAJySMJX10Fxbvi9AFxTdbFVRG6ZngDxjTXi73vF-453WzRtyunR-Pdyd7Ay7LYarKfMVaHkSNrW9vgEBCv0KR7RW8RL-VUp-hR-vMuOOvDI4wL7CHB2Q4nG1HqKknht",
    alt: "Stylish slicked back hairstyle"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSP_RQ248NGPZQXNM-dDn9ADkQvL_boF8a72RUczG8ePEM95eehclWvCKyFBJuScu-y9j6Rfnuqo52MHlrTx5z39ILFCFiKTk2iNwE3c6uYmMnD_Z6AjYeGFUb9qRALY5hTxzqOo4n1zo_GDJDgfiL8XCM_0X0QysuBaNe70djDVPVUq5YZ8XnMl-ODMrD6EamUBghIrOO8ogECgESys__pz_Xgew2o8T7DGsHu9OrLf1ZQx6ZagxExnFh-LkANgUSPOJwQYKRZONQ",
    alt: "Barber shop interior view"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtEj5RQDl9_M9s-2s0UuTv30tcVoP3RWFFeR53zctpl08o4wNqc-LlIOOUAokId-sZLIhcnXpBEVjGbtiFz3a6a4PWqb_szWfIMKFYms-imHymIuBhNknYslLkbiY4kwyVZdEkeXAW2uLsX8NytGKQBe9WRJtTkIaRDDEf8hUS2bceGwTabptbFltEuUhP4-b8FUnz4vUC7oJp5FKsrYipvLazTi2b2u_Q1TXHor37W1vv7r98Ef5IuH6iE8DuESslEw4IduilDQGO",
    alt: "Client looking in mirror after haircut"
  }
]

function Gallery() {
  // Estado para controlar qué imagen está seleccionada (null = ninguna, número = índice de la imagen)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Función para abrir el modal con la imagen seleccionada
  const handleImageClick = (index: number) => {
    setSelectedImage(index)
  }

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  // Función para cerrar el modal cuando se hace click en el fondo oscuro
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Solo cerrar si se hace click directamente en el backdrop, no en la imagen
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  return (
    <>
      <section className="bg-background py-12 md:py-20 border-t border-muted" id="galeria">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="px-4 mb-8">
                <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Nuestros Trabajos</h2>
                <h1 className="text-3xl font-black leading-tight">Cortes Frescos &amp; Estilos</h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
                {/* Usamos map() para renderizar cada imagen del array */}
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => handleImageClick(index)}
                  >
                    <div
                      className="w-full aspect-square bg-center bg-no-repeat bg-cover transform transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url("${image.url}")` }}
                      role="img"
                      aria-label={image.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal para mostrar la imagen en grande */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in-0"
          onClick={handleBackdropClick}
        >
          {/* Botón para cerrar el modal */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
            aria-label="Cerrar imagen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Imagen ampliada */}
          <div className="max-w-[90vw] max-h-[90vh] p-4">
            <img
              src={galleryImages[selectedImage].url}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery