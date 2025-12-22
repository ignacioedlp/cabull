"use client"

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card'
import { Progress } from "@/components/ui/progress"

function BookingsProgress() {
  const [progress, setProgress] = useState(13)
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card>
      <CardHeader className="flex gap-6 justify-between items-center">
        <h3 className="text-foreground text-base font-bold">Progreso Diario</h3>
        <span className="text-foreground text-sm font-bold bg-muted px-2 py-1 rounded">25%</span>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
      </CardContent>

      <CardFooter className="text-muted-foreground text-sm font-medium">2 de 8 citas completadas</CardFooter>
    </Card>
  )
}

export default BookingsProgress