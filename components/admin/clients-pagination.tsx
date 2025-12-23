"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

// Props for ClientsPagination component
interface ClientsPaginationProps {
  // Current page number (1-based)
  currentPage: number
  // Total number of pages
  totalPages: number
}

function ClientsPagination({
  currentPage,
  totalPages,
}: ClientsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null
  }

  // Helper function to update page in URL
  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5 // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page
      pages.push(1)

      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the start
      if (currentPage <= 3) {
        end = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3
      }

      // Add ellipsis before middle pages if needed
      if (start > 2) {
        pages.push("...")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis after middle pages if needed
      if (end < totalPages - 1) {
        pages.push("...")
      }

      // Show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      updatePage(currentPage - 1)
    }
  }

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      updatePage(currentPage + 1)
    }
  }

  // Handle page number click
  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      updatePage(page)
    }
  }

  return (
    <div className="flex justify-center mt-12 mb-8">
      <nav className="flex items-center gap-2">
        <Button
          variant="outline"
          className="flex items-center justify-center size-10 rounded-lg border border-muted border-b-2 text-muted-foreground hover:bg-muted disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="text-muted-foreground px-2">
                ...
              </span>
            )
          }
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              className="size-10"
              onClick={() => handlePageClick(page)}
            >
              {page}
            </Button>
          )
        })}
        <Button
          variant="outline"
          className="size-10"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </nav>
    </div>
  )
}

export default ClientsPagination