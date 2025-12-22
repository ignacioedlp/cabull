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
import { useState } from "react"
import dayjs from "dayjs"

function AnalyticsActions() {
  const [selectedPeriod, setSelectedPeriod] = useState(dayjs().format("MM"))
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"))

  // Array de meses en español
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

  // Obtener el nombre del mes seleccionado
  const selectedMonthLabel = months.find(m => m.value === selectedPeriod)?.label || "Este Mes"

  return (
    <div className="flex items-center justify-end gap-2 w-full md:w-auto">
      {/* Select para el mes */}
      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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
      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Este Año">
            {selectedYear}
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