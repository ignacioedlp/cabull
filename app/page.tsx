import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import Philosophy from "@/components/philosophy";
import Services from "@/components/services";
import Booking from "@/components/booking";
import Gallery from "@/components/gallery";
import Testimonials from "@/components/testimonials";
import Location from "@/components/location";
import Footer from "@/components/footer";
import { Metadata } from "next";

// Metadatos
export const metadata: Metadata = {
  title: "CABULL | Barbershop",
  description: "CABULL es un barbershop ubicado en La Plata, Buenos Aires, Argentina. Ofrecemos servicios de barbería y peluquería.",
  keywords: ["barbershop", "La Plata", "Buenos Aires", "Argentina"],
  openGraph: {
    title: "CABULL | Barbershop",
    description: "CABULL es un barbershop ubicado en La Plata, Buenos Aires, Argentina. Ofrecemos servicios de barbería y peluquería.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2"],
  },
}

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-serif">
      <Navbar />
      <Hero />
      <Philosophy />
      <Services />
      <Booking />
      <Gallery />
      <Testimonials />
      <Location />
      <Footer />
    </div >
  )
}