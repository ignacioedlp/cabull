"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'
import * as React from 'react'

interface ClientsSearchProps {
  initialName: string
}

function ClientsSearch({ initialName }: ClientsSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = React.useState(initialName)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Update local state when initialName changes (e.g., from URL)
  React.useEffect(() => {
    setSearchValue(initialName)
  }, [initialName])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Debounce: wait 300ms after user stops typing
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (value) {
        params.set('name', value)
      } else {
        params.delete('name')
      }
      
      // Reset to page 1 when searching
      params.set('page', '1')
      
      router.push(`?${params.toString()}`)
    }, 300)
  }

  return (
    <div className="relative flex-1 md:w-64">
      <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="w-full pl-10 pr-4 h-10 rounded-lg border border-muted border-b-2 bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        placeholder="Buscar clientes..."
        type="text"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  )
}

export default ClientsSearch

