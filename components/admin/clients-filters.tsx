"use client"

import { Button } from "../ui/button"

function ClientsFilters() {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button variant="default">Todos</Button>
      <Button variant="outline">Miembros VIP</Button>
      <Button variant="outline">Visitantes Recientes</Button>
      <Button variant="outline">Inactivos</Button>
    </div>
  )
}

export default ClientsFilters