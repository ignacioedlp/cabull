'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

function AnalyticsActions({ month, year }: { month: string, year: string }) {
  const router = useRouter()

  // Array de meses en español
  // Los valores deben ser "01"-"12" porque getAnalytics espera formato MM estándar
  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ]

  // Generar array de años (desde 5 años atrás hasta el año actual)
  const currentYear = dayjs().year()
  const years = Array.from({ length: 6 }, (_, i) => {
    const year = currentYear - i
    return { value: year.toString(), label: year.toString() }
  })

  // Función para actualizar los parámetros de búsqueda en la URL
  const updateSearchParams = (newMonth?: string, newYear?: string) => {
    const params = new URLSearchParams()

    // Siempre incluir ambos parámetros explícitamente
    // Si se proporciona un nuevo valor, usarlo; sino mantener el actual de las props
    params.set('month', newMonth || month)
    params.set('year', newYear || year)

    // Redirigir con los nuevos parámetros
    router.push(`/analytics?${params.toString()}`)
  }

  // Handler para cuando cambia el mes
  // Mantiene el año actual de las props
  const handleMonthChange = (value: string) => {
    updateSearchParams(value, undefined)
  }

  // Handler para cuando cambia el año
  // Mantiene el mes actual de las props
  const handleYearChange = (value: string) => {
    updateSearchParams(undefined, value)
  }

  // Obtener el nombre del mes seleccionado
  const selectedMonthLabel = months.find(m => m.value === month)?.label || "Este Mes"

  return (
    <div className="flex items-center justify-end gap-2 w-full md:w-auto">
      {/* Select para el mes */}
      <Select value={month} onValueChange={handleMonthChange}>
        <SelectTrigger className="w-30">
          <SelectValue placeholder="Este Mes">
            {selectedMonthLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Meses</SelectLabel>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Select para el año */}
      <Select value={year} onValueChange={handleYearChange}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Este Año">
            {year}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Años</SelectLabel>
            {years.map((year) => (
              <SelectItem key={year.value} value={year.value}>
                {year.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button variant="default" >
        <DownloadIcon className="size-4" />
        <span>Exportar Reporte</span>
      </Button>
    </div>
  )
}

export default AnalyticsActions