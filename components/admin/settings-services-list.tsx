"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, PlusIcon, ScissorsIcon, UserIcon, DiamondIcon, EditIcon, Trash2Icon } from "lucide-react"

import { Card, CardHeader, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

// Tipo de datos para los servicios
export type Service = {
  id: string
  name: string
  description: string | null
  durationMinutes: number
  basePrice: number | null
  active: boolean
  icon: "scissors" | "user" | "diamond"
}

// Datos de ejemplo (luego se pueden conectar a datos reales desde Prisma)
const data: Service[] = [
  {
    id: "1",
    name: "Corte Clásico",
    description: "Corte de tijera estándar y estilo",
    durationMinutes: 30,
    basePrice: 2500,
    active: true,
    icon: "scissors",
  },
  {
    id: "2",
    name: "Afeitar",
    description: "Afeitar y toalla caliente",
    durationMinutes: 20,
    basePrice: 1500,
    active: true,
    icon: "user",
  },
  {
    id: "3",
    name: "Servicio Completo",
    description: "Corte, afeitar y lavado",
    durationMinutes: 60,
    basePrice: 4500,
    active: true,
    icon: "diamond",
  },
]

// Función para obtener el icono según el tipo
const getIcon = (iconType: Service["icon"]) => {
  switch (iconType) {
    case "scissors":
      return <ScissorsIcon className="size-4" />
    case "user":
      return <UserIcon className="size-4" />
    case "diamond":
      return <DiamondIcon className="size-4" />
    default:
      return <ScissorsIcon className="size-4" />
  }
}

// Definición de columnas del DataTable
export const columns: ColumnDef<Service>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Nombre del Servicio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const service = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg border border-border-light flex items-center justify-center text-text-main shadow-sm">
            {getIcon(service.icon)}
          </div>
          <div>
            <p className="text-text-main font-bold">{service.name}</p>
            {service.description && (
              <p className="text-xs text-text-secondary">{service.description}</p>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "durationMinutes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Duración
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const duration = row.getValue("durationMinutes") as number
      return <div className="font-medium text-text-main">{duration} min</div>
    },
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue("basePrice") as number | null
      if (!price) {
        return <div className="text-text-secondary">-</div>
      }
      // Formatear el precio como moneda argentina
      const formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0,
      }).format(price)
      return <div className="font-medium text-text-main">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const service = row.original
      // Acceder a la función de edición desde el meta de la tabla
      const meta = table.options.meta as {
        onEdit?: (service: Service) => void
        onDelete?: (service: Service) => void
      }

      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-text-secondary hover:text-text-main"
            onClick={() => meta?.onEdit?.(service)}
          >
            <span className="sr-only">Editar servicio</span>
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            onClick={() => meta?.onDelete?.(service)}
          >
            <span className="sr-only">Eliminar servicio</span>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

function SettingsServicesList() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Estado para el Sheet y el servicio a editar
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingService, setEditingService] = React.useState<Service | null>(null)

  // Estado del formulario
  const [formData, setFormData] = React.useState<{
    name: string
    description: string
    durationMinutes: number
    basePrice: string
    active: boolean
    icon: Service["icon"]
  }>({
    name: "",
    description: "",
    durationMinutes: 30,
    basePrice: "",
    active: true,
    icon: "scissors",
  })

  // Función para abrir el Sheet en modo crear
  const handleCreate = () => {
    setEditingService(null)
    setFormData({
      name: "",
      description: "",
      durationMinutes: 30,
      basePrice: "",
      active: true,
      icon: "scissors",
    })
    setIsSheetOpen(true)
  }

  // Función para abrir el Sheet en modo editar
  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || "",
      durationMinutes: service.durationMinutes,
      basePrice: service.basePrice?.toString() || "",
      active: service.active,
      icon: service.icon,
    })
    setIsSheetOpen(true)
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el servicio
    // Por ahora solo cerramos el Sheet
    console.log("Guardando servicio:", {
      ...formData,
      basePrice: formData.basePrice ? parseInt(formData.basePrice) : null,
    })
    setIsSheetOpen(false)
    // TODO: Aquí deberías hacer la llamada a la API para crear/actualizar el servicio
  }

  // Función para manejar la eliminación
  const handleDelete = (service: Service) => {
    // Aquí iría la lógica para eliminar el servicio
    console.log("Eliminando servicio:", service.id)
    // TODO: Aquí deberías hacer la llamada a la API para eliminar el servicio
  }

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      onEdit: handleEdit,
      onDelete: handleDelete,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-text-main text-lg font-bold">Menú de Servicios</h3>
          <p className="text-text-secondary text-sm mt-1">Configura los precios y la duración de tus cortes.</p>
        </div>
        <Button
          className="flex items-center gap-2"
          variant="outline"
          onClick={handleCreate}
        >
          <PlusIcon className="size-4" />
          Agregar Servicio
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          {/* Barra de herramientas: filtro y visibilidad de columnas */}
          <div className="flex items-center py-4 gap-4">
            <Input
              placeholder="Filtrar servicios..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columnas <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id === "name" && "Nombre"}
                        {column.id === "durationMinutes" && "Duración"}
                        {column.id === "basePrice" && "Precio"}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tabla */}
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No hay resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Sheet para crear/editar servicio */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editingService ? "Editar Servicio" : "Nuevo Servicio"}
            </SheetTitle>
            <SheetDescription>
              {editingService
                ? "Modifica la información del servicio."
                : "Completa los datos para agregar un nuevo servicio."}
            </SheetDescription>
          </SheetHeader>


          <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4 px-4">
            {/* Nombre del servicio */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del Servicio *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Corte Clásico"
                required
              />
            </div>

            {/* Descripción */}
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el servicio..."
                rows={3}
              />
            </div>

            {/* Duración */}
            <div className="grid gap-2">
              <Label htmlFor="duration">Duración (minutos) *</Label>
              <Input
                id="duration"
                type="number"
                min="5"
                step="5"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 30 })}
                required
              />
            </div>

            {/* Precio */}
            <div className="grid gap-2">
              <Label htmlFor="price">Precio Base (ARS)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                placeholder="Ej: 2500"
              />
            </div>

            {/* Icono */}
            <div className="grid gap-2">
              <Label htmlFor="icon">Icono</Label>
              <Select
                value={formData.icon}
                onValueChange={(value: Service["icon"]) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger id="icon" className="flex items-center gap-2">
                  {getIcon(formData.icon)}
                  <SelectValue>
                    {formData.icon === "scissors" && "Tijeras"}
                    {formData.icon === "user" && "Usuario"}
                    {formData.icon === "diamond" && "Diamante"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scissors">
                    <div className="flex items-center gap-2">
                      <ScissorsIcon className="size-4" />
                      <span>Tijeras</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="user">
                    <div className="flex items-center gap-2">
                      <UserIcon className="size-4" />
                      <span>Usuario</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="diamond">
                    <div className="flex items-center gap-2">
                      <DiamondIcon className="size-4" />
                      <span>Diamante</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Estado activo */}
            <div className="flex items-center justify-between">
              <div className="grid gap-1.5">
                <Label htmlFor="active">Servicio Activo</Label>
                <p className="text-xs text-muted-foreground">
                  Los servicios inactivos no aparecerán en el menú de reservas.
                </p>
              </div>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit">
                {editingService ? "Guardar Cambios" : "Crear Servicio"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </Card>
  )
}

export default SettingsServicesList