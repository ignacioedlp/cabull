"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "../ui/button"

// Type for the activity filter
export type ActivityFilter = "recent" | "inactive" | null

// Props for the ClientsFilters component
interface ClientsFiltersProps {
  // Current active filter from URL
  currentActivityFilter?: ActivityFilter
  // Current userType filter from URL
  currentUserTypeFilter?: string | null
}

function ClientsFilters({
  currentActivityFilter,
  currentUserTypeFilter,
}: ClientsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Helper function to update URL params
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 when filters change
    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  // Handle "Todos" button - clears all filters
  const handleAllClick = () => {
    updateParams({
      activityFilter: null,
      userType: null,
    })
  }

  // Handle "Miembros VIP" button
  const handleVipClick = () => {
    const newUserType = currentUserTypeFilter === "VIP" ? null : "VIP"
    updateParams({
      userType: newUserType,
    })
  }

  // Handle "Visitantes Recientes" button
  const handleRecentClick = () => {
    const newActivityFilter = currentActivityFilter === "recent" ? null : "recent"
    updateParams({
      activityFilter: newActivityFilter,
    })
  }

  // Handle "Inactivos" button
  const handleInactiveClick = () => {
    const newActivityFilter = currentActivityFilter === "inactive" ? null : "inactive"
    updateParams({
      activityFilter: newActivityFilter,
    })
  }

  // Check if "Todos" is active (no filters applied)
  const isAllActive = !currentActivityFilter && !currentUserTypeFilter

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={isAllActive ? "default" : "outline"}
        onClick={handleAllClick}
      >
        Todos
      </Button>
      <Button
        variant={currentUserTypeFilter === "VIP" ? "default" : "outline"}
        onClick={handleVipClick}
      >
        Miembros VIP
      </Button>
      <Button
        variant={currentActivityFilter === "recent" ? "default" : "outline"}
        onClick={handleRecentClick}
      >
        Visitantes Recientes
      </Button>
      <Button
        variant={currentActivityFilter === "inactive" ? "default" : "outline"}
        onClick={handleInactiveClick}
      >
        Inactivos
      </Button>
    </div>
  )
}

export default ClientsFilters