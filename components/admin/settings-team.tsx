"use client"

import * as React from "react"
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import { UserPlusIcon, EditIcon, PlusIcon } from 'lucide-react'

// Tipos
export type AdminRole = "OWNER" | "STAFF" | "BARBER"

export type TeamMember = {
  id: string
  name: string
  email: string
  role: AdminRole
  services: string[]
  enabled: boolean
  color: string
}

// Datos de ejemplo (luego se pueden conectar a datos reales desde Prisma)
const team: TeamMember[] = [
  {
    id: "1",
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    role: 'BARBER',
    services: ['Corte Clásico', 'Afeitar'],
    enabled: true,
    color: '#000000'
  },
  {
    id: "2",
    name: 'David Chen',
    email: 'david.chen@example.com',
    role: 'BARBER',
    services: ['Corte Clásico'],
    enabled: false,
    color: '#FF0000'
  },
  {
    id: "3",
    name: 'Juan Perez',
    email: 'juan.perez@example.com',
    role: 'STAFF',
    services: ['Corte Clásico', 'Afeitar'],
    enabled: true,
    color: '#000000'
  },
  {
    id: "4",
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'OWNER',
    services: [],
    enabled: true,
    color: '#000000'
  }
]

// Servicios disponibles (esto debería venir de la base de datos)
const availableServices = [
  { id: "1", name: "Corte Clásico" },
  { id: "2", name: "Afeitar" },
  { id: "3", name: "Servicio Completo" },
]

// Función para obtener el texto del rol
const getRoleLabel = (role: AdminRole): string => {
  switch (role) {
    case "OWNER":
      return "Propietario"
    case "STAFF":
      return "Personal"
    case "BARBER":
      return "Peluquero"
    default:
      return role
  }
}

// Componente de tarjeta de equipo
const TeamCard = ({
  team,
  onEdit
}: {
  team: TeamMember
  onEdit: (member: TeamMember) => void
}) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-start mb-4">
        <div
          className="size-14 rounded-full bg-cover bg-center border border-muted"
          data-alt="Barber portrait male with beard"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqFd1cxhorCHtgMUYBZkEfxjuPAzclr-Gx_wom_yQrxPw4aiIXykCLionl9tk6NHBAiszLjVZW1tHDGh-y4IqSRE9L4YPJ6d_YHawPDEtxkqb5jGEvavKLDWuS8i_Dw5N5iK5ik1cBK77MNF2h1Wf3AYMbmsCD3fKXbEuirecGtl1KoS_dg0OibRVOHELC62mT7Qc_cCJlYzSxdivOeFhCe0OmbRVqvGPoQC_oj69ohak5l0UG1t4eSP9mWhuw6rllHyaNpNaVqh1Q')" }}
        ></div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-text-secondary hover:text-text-main"
            onClick={() => onEdit(team)}
          >
            <EditIcon className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-text-main font-bold text-lg">{team.name}</h4>
        <p className="text-text-secondary text-sm mb-4">{getRoleLabel(team.role)}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {team.services.map((service) => (
            <span
              key={service}
              className="px-2 py-1 bg-background-main rounded text-xs text-text-secondary border border-border-light font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t border-border-light">
        <div className="flex items-center gap-2">
          <div className={`size-2 rounded-full ${team.enabled ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className={`text-xs ${team.enabled ? 'text-green-600' : 'text-yellow-600'} font-bold`}>
            {team.enabled ? 'Disponible' : 'En Descanso'}
          </span>
        </div>
        <button className="text-xs font-bold text-primary hover:underline">
          {team.enabled ? 'Desactivar' : 'Activar'}
        </button>
      </CardFooter>
    </Card>
  )
}


function SettingsTeam() {
  // Estado para el Sheet y el miembro a editar
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingMember, setEditingMember] = React.useState<TeamMember | null>(null)

  // Estado del formulario
  const [formData, setFormData] = React.useState<{
    name: string
    email: string
    role: AdminRole
    services: string[]
    enabled: boolean
    color: string
  }>({
    name: "",
    email: "",
    role: "BARBER",
    services: [],
    enabled: true,
    color: "#000000",
  })

  // Función para abrir el Sheet en modo crear
  const handleCreate = () => {
    setEditingMember(null)
    setFormData({
      name: "",
      email: "",
      role: "BARBER",
      services: [],
      enabled: true,
      color: "#000000",
    })
    setIsSheetOpen(true)
  }

  // Función para abrir el Sheet en modo editar
  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      services: member.services,
      enabled: member.enabled,
      color: member.color,
    })
    setIsSheetOpen(true)
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el miembro del equipo
    console.log("Guardando miembro del equipo:", formData)
    setIsSheetOpen(false)
    // TODO: Aquí deberías hacer la llamada a la API para crear/actualizar el miembro
  }

  // Función para manejar la selección de servicios
  const handleServiceToggle = (serviceName: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceName)
        ? prev.services.filter((s) => s !== serviceName)
        : [...prev.services, serviceName],
    }))
  }

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-end">
          <div>
            <h3 className="text-text-main text-lg font-bold">Gestión de Equipo</h3>
            <p className="text-text-secondary text-sm">Gestiona a tus personal y asigna servicios.</p>
          </div>
          <Button
            className="flex items-center gap-2"
            variant="outline"
            onClick={handleCreate}
          >
            <UserPlusIcon className="size-4" />
            Agregar Personal
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((t) => (
              <TeamCard key={t.id} team={t} onEdit={handleEdit} />
            ))}
            <Card className="border border-dashed border-muted cursor-pointer min-h-[220px] flex flex-col items-center justify-center text-center" onClick={handleCreate}>
              <CardContent className="flex flex-col items-center justify-center text-center transition-colors">
                <div className="size-12 rounded-full border border-border-light flex items-center justify-center text-text-secondary mb-3 shadow-sm">
                  <PlusIcon className="size-4" />
                </div>
                <h4 className="text-text-main font-bold text-base">Unirse al Equipo</h4>
                <p className="text-text-secondary text-xs mt-1 max-w-[150px]">
                  Invita a un nuevo personal via email para configurar su cuenta.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {/* Sheet para crear/editar miembro del equipo */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editingMember ? "Editar Miembro del Equipo" : "Nuevo Miembro del Equipo"}
            </SheetTitle>
            <SheetDescription>
              {editingMember
                ? "Modifica la información del miembro del equipo."
                : "Completa los datos para agregar un nuevo miembro al equipo."}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4 px-4">
            {/* Nombre */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Marco Rossi"
                required
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
                placeholder="Ej: marco.rossi@example.com"
                required
              />
            </div>

            {/* Rol */}
            <div className="grid gap-2">
              <Label htmlFor="role">Rol *</Label>
              <Select
                value={formData.role}
                onValueChange={(value: AdminRole) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="role">
                  <SelectValue>
                    {getRoleLabel(formData.role)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OWNER">Propietario</SelectItem>
                  <SelectItem value="STAFF">Personal</SelectItem>
                  <SelectItem value="BARBER">Peluquero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color */}
            <div className="grid gap-2">
              <Label htmlFor="color">Color (para el calendario)</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="h-10 w-20 cursor-pointer"
                />
                <Input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Servicios */}
            <div className="grid gap-2">
              <Label>Servicios que puede realizar</Label>
              <div className="grid gap-3 border rounded-md p-4">
                {availableServices.map((service) => (
                  <div key={service.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`service-${service.id}`}
                      checked={formData.services.includes(service.name)}
                      onCheckedChange={() => handleServiceToggle(service.name)}
                    />
                    <Label
                      htmlFor={`service-${service.id}`}
                      className="font-normal cursor-pointer"
                    >
                      {service.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Estado activo */}
            <div className="flex items-center justify-between">
              <div className="grid gap-1.5">
                <Label htmlFor="enabled">Miembro Activo</Label>
                <p className="text-xs text-muted-foreground">
                  Los miembros inactivos no aparecerán disponibles para reservas.
                </p>
              </div>
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit">
                {editingMember ? "Guardar Cambios" : "Crear Miembro"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default SettingsTeam