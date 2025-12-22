"use client"

import * as React from "react"
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
import { ScissorsIcon, MessageCircleIcon, EditIcon, UserPlusIcon } from 'lucide-react'

export type UserType = "VIP" | "REGULAR" | "NEW"

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

const clients: Client[] = [
  {
    id: "1",
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: '123 Main St, Anytown, USA',
    lastVisit: '2023-10-20',
    totalVisits: 24,
    preferredService: 'Fade y Estilo',
    preferredServiceId: "1",
    userType: "VIP",
    notes: null,
    isVip: true,
  },
  {
    id: "2",
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '0987654321',
    address: '456 Main St, Anytown, USA',
    lastVisit: '2023-10-20',
    totalVisits: 24,
    preferredService: 'Fade y Estilo',
    preferredServiceId: "1",
    userType: "REGULAR",
    notes: null,
    isVip: false,
  }
]

// Servicios disponibles (esto debería venir de la base de datos)
const availableServices = [
  { id: "1", name: "Corte Clásico" },
  { id: "2", name: "Afeitar" },
  { id: "3", name: "Servicio Completo" },
]

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
  onEdit
}: {
  client: Client
  onEdit: (client: Client) => void
}) => {
  return (
    <Card className="border border-muted hover:shadow-lg transition-shadow group cursor-pointer relative overflow-hidden">
      <CardHeader>
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>
        <div className="flex items-start gap-4">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-16 shadow-md border-2 border-background"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFUAKxdCimcLnyAmqoSV6P_BLMr650699zzCovKDAw_eO8h-ClZqnQS4mf4yYJS-QC5-2dSvwYvLzLxZZ786C-R0oLyOoZlv-ly_zpWO5uzMf-33NA35ODTNlHjedAElexDaWj8k5HjPivZeyfxlNgbsjTkf2_Rr9Njt0IvXkjnh-QfwV51MX9TlZqwjw2g8Okz8wxZQxxeCPR-2qlKoTzdu9V1swAhb3PdxJB4jJ1IMSOPiPSNNKsFS8zaYiJxy4-3DgjWhR4ZUan")'
            }}
          ></div>
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
        <Button className="flex-1">Reservar Cita</Button>
        <Button variant={"outline"}>
          <MessageCircleIcon className="size-4 text-muted-foreground" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function ClientsList() {
  // Estado para el Sheet y el cliente a editar
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingClient, setEditingClient] = React.useState<Client | null>(null)

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el cliente
    console.log("Guardando cliente:", {
      ...formData,
      preferredServiceId: formData.preferredServiceId || null,
      notes: formData.notes || null,
    })
    setIsSheetOpen(false)
    // TODO: Aquí deberías hacer la llamada a la API para crear/actualizar el cliente
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} onEdit={handleEdit} />
        ))}
      </div>

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
              >
                <SelectTrigger id="preferredService">
                  <SelectValue placeholder="Selecciona un servicio" />
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

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit">
                {editingClient ? "Guardar Cambios" : "Crear Cliente"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ClientsList