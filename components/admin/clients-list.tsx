"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { ScissorsIcon, MessageCircleIcon, EditIcon, UserPlusIcon, TrashIcon, CalendarClockIcon, Loader2Icon } from 'lucide-react'
import { createClient, updateClient, deleteClient } from '@/actions/clients'
import { getServices } from '@/actions/services'
import DayPicker from '../day-picker'
import dayjs, { Dayjs } from 'dayjs'
import { getTeam } from '@/actions/team'
import { getBusinessHours } from '@/actions/business'
import { getAvailableTimeSlots, createAppointment } from '@/actions/appointments'
import { toast } from 'sonner'
import { AdminRole, AppointmentStatus } from '@/lib/generated/prisma/enums'
import { cn } from '@/lib/utils'

export type UserType = "VIP" | "REGULAR" | "NEW"

// Type for client data from database
export type ClientFromDB = {
  id: string
  name: string | null
  email: string
  phone: string | null
  preferredServiceId: string | null
  userType: UserType
  notes: string | null
  preferredService?: {
    id: string
    name: string
  } | null
  appointments?: Array<{
    id: string
    startAt: Date
    status: string
  }>
  _count?: {
    appointments: number
  }
}

// Type for the Client component (transformed data)
export type Client = {
  id: string
  name: string | null
  email: string
  phone: string | null
  address?: string
  lastVisit?: string
  totalVisits?: number
  preferredService?: string
  preferredServiceId?: string | null
  userType: UserType
  notes?: string | null
  isVip: boolean
}

// Helper function to transform database client to component client
const transformClient = (clientFromDB: ClientFromDB): Client => {
  // Get the most recent appointment date
  const lastAppointment = clientFromDB.appointments?.[0]
  const lastVisit = lastAppointment
    ? new Date(lastAppointment.startAt).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : undefined

  // Get total visits count from _count
  const totalVisits = clientFromDB._count?.appointments ?? 0

  return {
    id: clientFromDB.id,
    name: clientFromDB.name,
    email: clientFromDB.email,
    phone: clientFromDB.phone,
    preferredService: clientFromDB.preferredService?.name,
    preferredServiceId: clientFromDB.preferredServiceId,
    userType: clientFromDB.userType,
    notes: clientFromDB.notes,
    lastVisit,
    totalVisits,
    isVip: clientFromDB.userType === "VIP",
  }
}

// Tipo para los servicios disponibles
type Service = {
  id: string
  name: string
}

// Función para obtener el texto del tipo de usuario
const getUserTypeLabel = (userType: UserType): string => {
  switch (userType) {
    case "VIP":
      return "VIP"
    case "REGULAR":
      return "Regular"
    case "NEW":
      return "Nuevo Cliente"
    default:
      return userType
  }
}
const ClientCard = ({
  client,
  onEdit,
  onDelete,
  onBookAppointment
}: {
  client: Client
  onEdit: (client: Client) => void
  onDelete: (client: Client) => void
  onBookAppointment: (client: Client) => void
}) => {
  return (
    <Card className="border border-muted hover:shadow-lg transition-shadow group cursor-pointer relative overflow-hidden">
      <CardHeader>
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(client)
            }}
          >
            <EditIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(client)
            }}
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
        <div className="flex items-start gap-4">

          <div>
            <h3 className="text-lg font-bold text-foreground">{client.name || client.email}</h3>
            <p className="text-muted-foreground text-sm mb-2">{client.phone || client.email}</p>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${client.userType === "VIP"
              ? "bg-yellow-100 text-yellow-800"
              : client.userType === "NEW"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
              }`}>
              {getUserTypeLabel(client.userType)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {client.lastVisit && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Última Visita</span>
            <span className="font-bold text-foreground">{client.lastVisit}</span>
          </div>
        )}
        {client.totalVisits !== undefined && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Total Visitas</span>
            <span className="font-bold text-foreground">{client.totalVisits}</span>
          </div>
        )}
        {client.preferredService && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Preferido</span>
            <span className="font-bold text-foreground flex items-center gap-1">
              <ScissorsIcon className="size-4" /> {client.preferredService}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation()
            onBookAppointment(client)
          }}
        >
          Reservar Cita
        </Button>
        {/* <Button variant={"outline"}>
          <MessageCircleIcon className="size-4 text-muted-foreground" />
        </Button> */}
      </CardFooter>
    </Card>
  )
}

// Props for ClientsList component
interface ClientsListProps {
  // Array of clients from database
  clients: ClientFromDB[]
  // Loading state
  isLoading?: boolean
}

function ClientsList({ clients: clientsFromDB, isLoading = false }: ClientsListProps) {
  // Router para refrescar la página después de mutaciones
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Transform database clients to component clients
  const clients = React.useMemo(
    () => clientsFromDB.map(transformClient),
    [clientsFromDB]
  )

  // Estado para el Sheet y el cliente a editar
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingClient, setEditingClient] = React.useState<Client | null>(null)

  // Estado para el diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [clientToDelete, setClientToDelete] = React.useState<Client | null>(null)

  // Estado para errores
  const [error, setError] = React.useState<string | null>(null)

  // Estado para servicios disponibles
  const [availableServices, setAvailableServices] = React.useState<Service[]>([])
  const [isLoadingServices, setIsLoadingServices] = React.useState(true)

  // Estados para el Sheet de reserva de turno
  const [isBookingSheetOpen, setIsBookingSheetOpen] = React.useState(false)
  const [clientForBooking, setClientForBooking] = React.useState<Client | null>(null)

  // Estados del formulario de reserva
  const [bookingFormData, setBookingFormData] = React.useState<{
    serviceId: string
    selectedDate: Dayjs
    selectedHour: string
    barberId: string
  }>({
    serviceId: "",
    selectedDate: dayjs(),
    selectedHour: "",
    barberId: "",
  })

  // Estados para datos de reserva
  const [bookingServices, setBookingServices] = React.useState<Array<{
    id: string
    name: string
    description: string | null
    durationMinutes: number
    basePrice: number | null
  }>>([])
  const [timeSlots, setTimeSlots] = React.useState<Array<{ time: string; available: boolean }>>([])
  const [barbers, setBarbers] = React.useState<Array<{ id: string; email: string; name: string | null }>>([])
  const [businessHours, setBusinessHours] = React.useState<Array<{ weekday: number; startTime: string; endTime: string; isClosed: boolean }>>([])
  const [isLoadingSlots, setIsLoadingSlots] = React.useState(false)
  const [isSubmittingBooking, setIsSubmittingBooking] = React.useState(false)

  // Cargar servicios cuando el componente se monte
  React.useEffect(() => {
    const loadServices = async () => {
      setIsLoadingServices(true)
      const result = await getServices()
      if (result.success && result.services) {
        setAvailableServices(result.services)
      }
      setIsLoadingServices(false)
    }
    loadServices()
  }, [])

  // Función para abrir el Sheet de reserva
  const handleBookAppointment = (client: Client) => {
    setClientForBooking(client)
    setBookingFormData({
      serviceId: client.preferredServiceId || "",
      selectedDate: dayjs(),
      selectedHour: "",
      barberId: "",
    })
    setIsBookingSheetOpen(true)
  }

  // Cargar datos para el formulario de reserva cuando se abre el Sheet
  React.useEffect(() => {
    if (!isBookingSheetOpen) return

    async function loadBookingData() {
      // Cargar servicios activos
      const servicesResult = await getServices(true)
      if (servicesResult.success) {
        setBookingServices(servicesResult.services)
      }

      // Cargar barberos activos
      const teamResult = await getTeam()
      if (teamResult.success) {
        const activeBarbers = teamResult.team.filter(barber => barber.active && barber.role === AdminRole.BARBER)
        setBarbers(activeBarbers)
        // Seleccionar el primer barbero por defecto si hay alguno disponible
        if (activeBarbers.length > 0) {
          setBookingFormData(prev => {
            // Solo actualizar si no hay barbero seleccionado
            if (!prev.barberId) {
              return { ...prev, barberId: activeBarbers[0].id }
            }
            return prev
          })
        }
      }

      // Cargar business hours
      const hoursResult = await getBusinessHours()
      if (hoursResult.success && hoursResult.businessHours) {
        setBusinessHours(hoursResult.businessHours)
      }
    }

    loadBookingData()
  }, [isBookingSheetOpen])

  // Cargar slots disponibles cuando cambia la fecha
  React.useEffect(() => {
    if (!isBookingSheetOpen || !bookingFormData.selectedDate) return

    async function loadTimeSlots() {
      setIsLoadingSlots(true)
      const slotsResult = await getAvailableTimeSlots(bookingFormData.selectedDate.toDate())

      if (slotsResult.success) {
        setTimeSlots(slotsResult.slots)
        // Limpiar selección de hora si el slot ya no está disponible
        if (bookingFormData.selectedHour && !slotsResult.slots.find(slot => slot.time === bookingFormData.selectedHour && slot.available)) {
          setBookingFormData(prev => ({ ...prev, selectedHour: "" }))
        }
      } else {
        toast.error(slotsResult.error || "Error al cargar los horarios disponibles")
        setTimeSlots([])
      }

      setIsLoadingSlots(false)
    }

    loadTimeSlots()
  }, [bookingFormData.selectedDate, isBookingSheetOpen])

  // Manejar cambio de fecha
  const handleDateChange = (date: Dayjs) => {
    setBookingFormData(prev => ({ ...prev, selectedDate: date, selectedHour: "" }))
  }

  // Función para manejar el submit del formulario de reserva
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientForBooking) return

    // Validaciones
    if (!bookingFormData.serviceId) {
      toast.error("Por favor selecciona un servicio")
      return
    }

    if (!bookingFormData.selectedHour) {
      toast.error("Por favor selecciona un horario")
      return
    }

    if (!bookingFormData.barberId) {
      toast.error("Por favor selecciona un barbero")
      return
    }

    // Crear la fecha y hora completa
    const [hour, minute] = bookingFormData.selectedHour.split(':').map(Number)
    const appointmentDateTime = bookingFormData.selectedDate.hour(hour).minute(minute).second(0).millisecond(0)

    setIsSubmittingBooking(true)

    try {
      const result = await createAppointment({
        serviceId: bookingFormData.serviceId,
        customerEmail: clientForBooking.email,
        startAt: appointmentDateTime.toDate(),
        barberId: bookingFormData.barberId,
        status: AppointmentStatus.CONFIRMED,
      })

      if (result.success) {
        toast.success("¡Turno reservado exitosamente!")
        // Cerrar el Sheet y refrescar la página
        setIsBookingSheetOpen(false)
        setClientForBooking(null)
        router.refresh()
      } else {
        toast.error(result.error || "Error al crear el turno")
      }
    } catch (error) {
      toast.error("Error inesperado al crear el turno")
    } finally {
      setIsSubmittingBooking(false)
    }
  }

  // Obtener los días de la semana que están cerrados
  const getDisabledDaysOfWeek = () => {
    return businessHours
      .filter(h => h.isClosed)
      .map(h => h.weekday)
  }

  // Estado del formulario
  const [formData, setFormData] = React.useState<{
    name: string
    email: string
    phone: string
    preferredServiceId: string
    userType: UserType
    notes: string
  }>({
    name: "",
    email: "",
    phone: "",
    preferredServiceId: "",
    userType: "REGULAR",
    notes: "",
  })

  // Función para abrir el Sheet en modo crear
  const handleCreate = () => {
    setEditingClient(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredServiceId: "",
      userType: "REGULAR",
      notes: "",
    })
    setIsSheetOpen(true)
  }

  // Función para abrir el Sheet en modo editar
  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name || "",
      email: client.email,
      phone: client.phone || "",
      preferredServiceId: client.preferredServiceId || "",
      userType: client.userType,
      notes: client.notes || "",
    })
    setIsSheetOpen(true)
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        const clientData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          userType: formData.userType,
          notes: formData.notes,
          preferredServiceId: formData.preferredServiceId || null,
        }

        let result
        if (editingClient) {
          // Update existing client
          result = await updateClient({
            id: editingClient.id,
            ...clientData,
          })
        } else {
          // Create new client
          result = await createClient(clientData)
        }

        if (result.success) {
          // Close the sheet and refresh the page
          setIsSheetOpen(false)
          router.refresh()
        } else {
          // Show error message
          setError(result.error || "Error al guardar el cliente")
        }
      } catch (err) {
        setError("Error inesperado al guardar el cliente")
      }
    })
  }

  // Función para manejar la eliminación de cliente
  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client)
    setDeleteDialogOpen(true)
  }

  // Función para confirmar la eliminación
  const handleConfirmDelete = async () => {
    if (!clientToDelete) return

    setError(null)
    startTransition(async () => {
      try {
        const result = await deleteClient(clientToDelete.id)

        if (result.success) {
          // Close dialog and refresh the page
          setDeleteDialogOpen(false)
          setClientToDelete(null)
          router.refresh()
        } else {
          // Show error message
          setError(result.error || "Error al eliminar el cliente")
          setDeleteDialogOpen(false)
        }
      } catch (err) {
        setError("Error inesperado al eliminar el cliente")
        setDeleteDialogOpen(false)
      }
    })
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Clientes</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Gestiona tu base de datos de clientes
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={handleCreate}
        >
          <UserPlusIcon className="size-4" />
          Agregar Cliente
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Cargando clientes...</p>
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron clientes</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>
        </>
      )}

      {/* Sheet para crear/editar cliente */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editingClient ? "Editar Cliente" : "Nuevo Cliente"}
            </SheetTitle>
            <SheetDescription>
              {editingClient
                ? "Modifica la información del cliente."
                : "Completa los datos para agregar un nuevo cliente."}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4 px-4">
            {/* Nombre */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Juan Pérez"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ej: juan.perez@example.com"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ej: +54 221 1234567"
              />
            </div>

            {/* Servicio Preferido */}
            <div className="grid gap-2">
              <Label htmlFor="preferredService">Servicio Preferido</Label>
              <Select
                value={formData.preferredServiceId || undefined}
                onValueChange={(value) => setFormData({ ...formData, preferredServiceId: value === "none" ? "" : value })}
                disabled={isLoadingServices}
              >
                <SelectTrigger id="preferredService">
                  <SelectValue placeholder={isLoadingServices ? "Cargando servicios..." : "Selecciona un servicio"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguno</SelectItem>
                  {availableServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Cliente */}
            <div className="grid gap-2">
              <Label htmlFor="userType">Tipo de Cliente *</Label>
              <Select
                value={formData.userType}
                onValueChange={(value: UserType) => setFormData({ ...formData, userType: value })}
              >
                <SelectTrigger id="userType">
                  <SelectValue>
                    {getUserTypeLabel(formData.userType)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REGULAR">Regular</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="NEW">Nuevo Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notas */}
            <div className="grid gap-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Estilo de fade, prefiere tijera en la parte superior, alergias..."
                rows={4}
              />
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? "Guardando..."
                  : editingClient
                    ? "Guardar Cambios"
                    : "Crear Cliente"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Sheet para reservar turno */}
      <Sheet open={isBookingSheetOpen} onOpenChange={setIsBookingSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Reservar Turno</SheetTitle>
            <SheetDescription>
              Reserva un turno para {clientForBooking?.name || clientForBooking?.email}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6 py-4 px-4">
            {/* Servicio */}
            <div className="grid gap-2">
              <Label htmlFor="booking-service">Servicio *</Label>
              <Select
                value={bookingFormData.serviceId}
                onValueChange={(value) => setBookingFormData(prev => ({ ...prev, serviceId: value }))}
              >
                <SelectTrigger id="booking-service">
                  <SelectValue placeholder="Selecciona un servicio..." />
                </SelectTrigger>
                <SelectContent>
                  {bookingServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fecha */}
            <div className="grid gap-2">
              <Label htmlFor="booking-date">Fecha *</Label>
              <DayPicker
                minDate={dayjs()}
                maxDate={dayjs().add(1, 'month')}
                disabledDaysOfWeek={getDisabledDaysOfWeek()}
                day={bookingFormData.selectedDate}
                handleAction={handleDateChange}
              />
            </div>

            {/* Barbero */}
            <div className="grid gap-2">
              <Label htmlFor="booking-barber">Barbero *</Label>
              <Select
                value={bookingFormData.barberId}
                onValueChange={(value) => setBookingFormData(prev => ({ ...prev, barberId: value }))}
              >
                <SelectTrigger id="booking-barber">
                  <SelectValue placeholder="Selecciona un barbero..." />
                </SelectTrigger>
                <SelectContent>
                  {barbers.map((barber) => (
                    <SelectItem key={barber.id} value={barber.id}>
                      {barber.name || barber.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Horarios disponibles */}
            <div className="grid gap-2">
              <Label>Horarios Disponibles *</Label>
              {isLoadingSlots ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2Icon className="size-6 animate-spin text-primary" />
                </div>
              ) : timeSlots.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No hay horarios disponibles para este día.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto pr-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      type="button"
                      className={cn(
                        "w-full h-10 rounded-lg border-2 text-foreground transition-all",
                        slot.available
                          ? bookingFormData.selectedHour === slot.time
                            ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                            : "bg-background text-foreground border-muted hover:bg-primary/10"
                          : "bg-muted text-muted-foreground border-muted cursor-not-allowed"
                      )}
                      onClick={() => slot.available && setBookingFormData(prev => ({ ...prev, selectedHour: slot.time }))}
                      disabled={!slot.available}
                    >
                      <span className="text-sm font-medium">{slot.time}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Resumen del turno seleccionado */}
            {bookingFormData.selectedHour && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
                <CalendarClockIcon className="size-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">Turno Seleccionado</span>
                  <span className="text-sm font-medium text-foreground">
                    {bookingFormData.selectedDate.format('DD/MM/YYYY')} a las {bookingFormData.selectedHour}
                  </span>
                </div>
              </div>
            )}

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline" disabled={isSubmittingBooking}>
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit" disabled={isSubmittingBooking || !bookingFormData.serviceId || !bookingFormData.selectedHour || !bookingFormData.barberId}>
                {isSubmittingBooking ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin mr-2" />
                    Procesando...
                  </>
                ) : (
                  "Reservar Turno"
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Diálogo de confirmación para eliminar cliente */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el cliente{" "}
              <strong>{clientToDelete?.name || clientToDelete?.email}</strong>.
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
    </>
  )
}

export default ClientsList