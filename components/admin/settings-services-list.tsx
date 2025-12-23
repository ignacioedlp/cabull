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
import { ArrowUpDown, ChevronDown, PlusIcon, EditIcon, Trash2Icon, CheckIcon, XIcon } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createService, updateService, deleteService } from "@/actions/services"

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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Service } from "@/lib/generated/prisma/client"
import { formatPriceARS } from "@/lib/utils"

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
      const formatted = formatPriceARS(price)
      return <div className="font-medium text-text-main">{formatted}</div>
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => {
      return <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-8 px-2 lg:px-3">
        Activo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    },
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean
      return <div className="font-medium text-text-main">{active ? <CheckIcon className="h-4 w-4" /> : <XIcon className="h-4 w-4" />}</div>
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

function SettingsServicesList({ services }: { services: Service[] | undefined }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Estado para el Sheet y el servicio a editar
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingService, setEditingService] = React.useState<Service | null>(null)

  // Estado para el diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [serviceToDelete, setServiceToDelete] = React.useState<Service | null>(null)

  // Estado del formulario
  const [formData, setFormData] = React.useState<{
    name: string
    description: string
    durationMinutes: number
    basePrice: string
    active: boolean
    features: string[]
  }>({
    name: "",
    description: "",
    durationMinutes: 30,
    basePrice: "",
    active: true,
    features: [],
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
      features: [],
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
      features: service.features || [],
    })
    setIsSheetOpen(true)
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      try {
        // Preparar los datos del servicio
        const serviceData = {
          name: formData.name,
          description: formData.description || null,
          durationMinutes: formData.durationMinutes,
          basePrice: formData.basePrice ? parseInt(formData.basePrice, 10) : null,
          active: formData.active,
          features: formData.features,
        }

        let result
        if (editingService) {
          // Actualizar servicio existente
          result = await updateService({
            id: editingService.id,
            ...serviceData,
          })
        } else {
          // Crear nuevo servicio
          result = await createService(serviceData)
        }

        if (result.success) {
          // Mostrar mensaje de éxito y cerrar el Sheet
          toast.success(
            editingService
              ? "Servicio actualizado correctamente."
              : "Servicio creado correctamente."
          )
          setIsSheetOpen(false)
          router.refresh()
        } else {
          // Mostrar mensaje de error
          toast.error(result.error || "Ocurrió un error al guardar el servicio.")
        }
      } catch (error) {
        // Error inesperado
        toast.error("Error inesperado al guardar el servicio.")
      }
    })
  }

  // Función para abrir el diálogo de confirmación de eliminación
  const handleDelete = (service: Service) => {
    setServiceToDelete(service)
    setDeleteDialogOpen(true)
  }

  // Función para confirmar la eliminación
  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return

    startTransition(async () => {
      try {
        const result = await deleteService(serviceToDelete.id)

        if (result.success) {
          // Cerrar diálogo y refrescar la página
          toast.success("Servicio eliminado correctamente.")
          setDeleteDialogOpen(false)
          setServiceToDelete(null)
          router.refresh()
        } else {
          // Mostrar mensaje de error
          toast.error(result.error || "Ocurrió un error al eliminar el servicio.")
          setDeleteDialogOpen(false)
        }
      } catch (error) {
        // Error inesperado
        toast.error("Error inesperado al eliminar el servicio.")
        setDeleteDialogOpen(false)
      }
    })
  }

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: services || [],
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

            {/* Features */}
            <div className="grid gap-2">
              <Label htmlFor="features">Características</Label>
              <Input
                id="features"
                value={formData.features.join(',')}
                onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',') })}
                placeholder="Ej: Corte Clásico, Barba, Cepillado, etc."
              />
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
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? editingService
                    ? "Guardando..."
                    : "Creando..."
                  : editingService
                    ? "Guardar Cambios"
                    : "Crear Servicio"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Diálogo de confirmación para eliminar servicio */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar servicio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el servicio{" "}
              <strong>{serviceToDelete?.name}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export default SettingsServicesList