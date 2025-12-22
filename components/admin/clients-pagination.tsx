"use client"

import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

function ClientsPagination() {
  return (
    <div className="flex justify-center mt-12 mb-8">
      <nav className="flex items-center gap-2">
        <Button variant={"outline"} className="flex items-center justify-center size-10 rounded-lg border border-muted border-b-2 text-muted-foreground hover:bg-muted disabled:opacity-50">
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button variant={"default"} className="size-10">1</Button>
        <Button variant={"outline"} className='size-10'>2</Button>
        <Button variant={"outline"} className='size-10'>3</Button>
        <span className="text-muted-foreground px-2">...</span>
        <Button variant={"outline"} className='size-10'>
          <ChevronRightIcon className="size-4" />
        </Button>
      </nav>
    </div>
  )
}

export default ClientsPagination