"use client"

import { Card, CardHeader, CardContent, CardTitle } from '../ui/card'
import { StarIcon } from 'lucide-react'

function Reviews() {
  return (
    <Card className="border border-muted">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Reseñas Recientes</CardTitle>
        <div className="flex text-yellow-500">
          <StarIcon className="size-4" fill="currentColor" />
          <span className="text-foreground text-sm font-bold ml-1">4.9</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="border-b border-muted pb-4 last:border-0 last:pb-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-center bg-no-repeat bg-cover rounded-full size-8" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBG808jN51QCyR19l-uEijp34sDf_Jc-eRC0_qwXGLAJ3GY9VfUw-ePC1zMvqwrj6qyn6d4PHVOy4Q7Y4RMDQOhVqYU-eCKqvUlHNQcEOXOO_O2sKhKkNJt7m1ELoNDt5TeY0CTHf_hSdn0A6VwkLX0NxEhkoJCo_bYiD56TMbvMzSK8XdQGC_wYH_2oKQppvSvDAWFdR8xTK2tbE1rL274w6YSP42Es_i_--X19HeywzSxghSof7m_48pCJY3F-Eicepbp_-Qi_SXM")' }}></div>
              <span className="font-bold text-sm text-foreground">Lucas Rodriguez</span>
            </div>
            <span className="text-muted-foreground text-xs">2 días atrás</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">&quot;Excelente servicio como siempre. Martin realmente sabe cómo manejar un fade. El ambiente es de primera.&quot;</p>
          <div className="flex gap-1 mt-2 text-yellow-500">
            <StarIcon className="size-4" fill="currentColor" />
            <StarIcon className="size-4" fill="currentColor" />
            <StarIcon className="size-4" fill="currentColor" />
            <StarIcon className="size-4" fill="currentColor" />
            <StarIcon className="size-4" fill="currentColor" />
          </div>
        </div>
        <div className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-[#e0e0e0] dark:bg-[#333] text-[#757575] dark:text-gray-400 font-bold text-xs rounded-full size-8 flex items-center justify-center">JP</div>
              <span className="font-bold text-sm text-[#141414] dark:text-white">Juan Pérez</span>
            </div>
            <span className="text-[#757575] dark:text-gray-500 text-xs">5 días atrás</span>
          </div>
          <p className="text-[#757575] dark:text-gray-400 text-sm leading-relaxed">&quot;Rápido y eficiente. Me encantó el sistema de reservas en línea.&quot;</p>
          <div className="flex gap-1 mt-2 text-yellow-500">
            <StarIcon className="size-4" fill="currentColor" />
            <StarIcon className="size-4" fill="currentColor" />
            <StarIcon className="size-4" fill="currentColor" />
            <StarIcon className="size-4" fill="currentColor" />
            <StarIcon className="size-4 text-muted-foreground " />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Reviews