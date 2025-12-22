import { QuoteIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'

// Define the type for testimonial data
// This interface describes the structure of each testimonial object
interface Testimonial {
  quote: string
  authorName: string
  authorRole: string
  authorImage: string
  authorImageAlt: string
}

// Testimonial data array - all testimonial information in one place
// This makes it easy to add, remove, or modify testimonials
const testimonialsData: Testimonial[] = [
  {
    quote: "La mejor barbería de La Plata sin duda. La atención al detalle es inigualable y el ambiente es súper relajado.",
    authorName: "Mateo R.",
    authorRole: "Cliente Regular",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHMtM9q_0i5TA8_--bSj46XOqsUXI0d_GK8fUKJvMtp0h0_mzdtGlG1eIjXXtOetL1jOAnRUVvbVJYh7CGHaxHirre-UYASU0nGTdDuBfpS-9_GY2CQp7g7X9w6k1M19QVvgKtSfinetzltx6XTvI5f9eKeY6aVk2DmQGp6OpSEMAUNH08AiEhP4RJ_n_DIZa7BaHHMsli9POkKNtRcvmtlR05cFwWYW8fwMRIxoWyLurf74kWowzmPMcqCEhdJet1mkXvjIT-b_N6",
    authorImageAlt: "Foto de perfil de Mateo"
  },
  {
    quote: "Reservé 'La Experiencia Completa' antes de mi boda. Servicio increíble. El afeitado con toalla caliente es algo que hay que probar.",
    authorName: "Lucas M.",
    authorRole: "Cliente Verificado",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw44rfM43pNT5xHQYbXqOTA407I57QfFcatmDSyY0U0RhwqtzHQm-lNbNMpl6z_gcoZR3PVUlgkUPkZM_XKH8DxE3DqivFgQOXlE6tj23lrbUnSmb5bEKRlQ2tlXM0eHSqKbVxatF5aALRnPZMvoWGc7ESYDghjVRMtVN3c8cwtaGU-Wbybe9aTE2dxHqxTdQcRvs637PH69F90jHjzwUffZje2KquSb1aicRmNUknMvU6iSr4T2Z3YGPrasoegSpZrRP_yOZTViP9",
    authorImageAlt: "Foto de perfil de Lucas"
  },
  {
    quote: "Buen ambiente, buena música y cortes aún mejores. CABULL es el único lugar en el que confío para mi barba.",
    authorName: "Santiago V.",
    authorRole: "Guía Local",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4sJ55aJvCeFtAq1l0epHytw2eE9duXn7hnxS7K7svJYu03DS_andNzz-jq1o4PCqNd6qBf0PH20MmLzGjlW-97micdWxe5Tili5uFuH3VRPElvN0rd3YBSyU5b_UoNtFo72n8cmwX1zW6FkhccPu6eXV1Yhb8RiPbeLAd0oRnDz6RdgtBSYgICZPV9y7V3QAVz9aQ4WqZdWLnqtZ50KMVdlbjvziFWY6k3Arvsq67Zc1j45_WYDl9Git6mNz_3dupYqHQbMiB9HRB",
    authorImageAlt: "Foto de perfil de Santiago"
  }
]

// Reusable TestimonialCard component
// This component receives a testimonial object as a prop and renders it
interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader>
        <QuoteIcon className="size-6" />
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic">
          &quot;{testimonial.quote}&quot;
        </p>
      </CardContent>
    </Card>
  )
}

function Testimonials() {
  return (
    <section className="bg-background-light dark:bg-background-dark py-12 md:py-20 border-t border-muted">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Section header */}
            <div className="px-4 mb-10 text-center">
              <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Reseñas</h2>
              <h1 className="text-3xl font-black leading-tight">Lo que dicen los Locales</h1>
            </div>

            {/* Testimonials grid - maps through the data array to render each card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              {testimonialsData.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials