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
import { UserPlusIcon, EditIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { AdminRole } from "@/lib/generated/prisma/enums"
import { AdminUser } from "@/lib/generated/prisma/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createTeamMember, updateTeamMember, deleteTeamMember, updateTeamMemberActive } from "@/actions/team"

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
  onEdit,
  onDelete,
  onToggleActive,
  isPending
}: {
  team: AdminUser
  onEdit: (member: AdminUser) => void
  onDelete: (member: AdminUser) => void
  onToggleActive: (member: AdminUser) => void
  isPending: boolean
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
            disabled={isPending}
          >
            <EditIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            className="text-text-secondary hover:text-destructive"
            onClick={() => onDelete(team)}
            disabled={isPending}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-text-main font-bold text-lg">{team.name || team.email}</h4>
        <p className="text-text-secondary text-sm mb-4">{getRoleLabel(team.role)}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t border-border-light">
        <div className="flex items-center gap-2">
          <div className={`size-2 rounded-full ${team.active ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className={`text-xs ${team.active ? 'text-green-600' : 'text-yellow-600'} font-bold`}>
            {team.active ? 'Disponible' : 'En Descanso'}
          </span>
        </div>
        <button
          className="text-xs font-bold text-primary hover:underline disabled:opacity-50"
          onClick={() => onToggleActive(team)}
          disabled={isPending}
        >
          {team.active ? 'Desactivar' : 'Activar'}
        </button>
      </CardFooter>
    </Card>
  )
}


function SettingsTeam({ team }: { team: AdminUser[] | undefined }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Estado para el Sheet y el miembro a editar
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingMember, setEditingMember] = React.useState<AdminUser | null>(null)

  // Estado para el diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [memberToDelete, setMemberToDelete] = React.useState<AdminUser | null>(null)

  // Estado del formulario
  const [formData, setFormData] = React.useState<{
    name: string
    email: string
    role: AdminRole
    enabled: boolean
    color: string
  }>({
    name: "",
    email: "",
    role: "BARBER",
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
      enabled: true,
      color: "#000000",
    })
    setIsSheetOpen(true)
  }

  // Función para abrir el Sheet en modo editar
  const handleEdit = (member: AdminUser) => {
    setEditingMember(member)
    setFormData({
      name: member.name || "",
      email: member.email,
      role: member.role,
      enabled: member.active,
      color: member.color || "#000000",
    })
    setIsSheetOpen(true)
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      try {
        // Preparar los datos del miembro del equipo
        const teamMemberData = {
          name: formData.name || null,
          email: formData.email,
          role: formData.role,
          services: [], // Por ahora vacío, se puede implementar después
          enabled: formData.enabled,
          color: formData.color || null,
        }

        let result
        if (editingMember) {
          // Actualizar miembro existente
          result = await updateTeamMember({
            id: editingMember.id,
            ...teamMemberData,
          })
        } else {
          // Crear nuevo miembro
          result = await createTeamMember(teamMemberData)
        }

        if (result.success) {
          // Mostrar mensaje de éxito y cerrar el Sheet
          toast.success(
            editingMember
              ? "Miembro del equipo actualizado correctamente."
              : "Miembro del equipo creado correctamente."
          )
          setIsSheetOpen(false)
          router.refresh()
        } else {
          // Mostrar mensaje de error
          toast.error(result.error || "Ocurrió un error al guardar el miembro del equipo.")
        }
      } catch {
        // Error inesperado
        toast.error("Error inesperado al guardar el miembro del equipo.")
      }
    })
  }

  // Función para abrir el diálogo de confirmación de eliminación
  const handleDelete = (member: AdminUser) => {
    setMemberToDelete(member)
    setDeleteDialogOpen(true)
  }

  // Función para confirmar la eliminación
  const handleConfirmDelete = async () => {
    if (!memberToDelete) return

    startTransition(async () => {
      try {
        const result = await deleteTeamMember(memberToDelete.id)

        if (result.success) {
          // Cerrar diálogo y refrescar la página
          toast.success("Miembro del equipo eliminado correctamente.")
          setDeleteDialogOpen(false)
          setMemberToDelete(null)
          router.refresh()
        } else {
          // Mostrar mensaje de error
          toast.error(result.error || "Ocurrió un error al eliminar el miembro del equipo.")
          setDeleteDialogOpen(false)
        }
      } catch {
        // Error inesperado
        toast.error("Error inesperado al eliminar el miembro del equipo.")
        setDeleteDialogOpen(false)
      }
    })
  }

  // Función para activar/desactivar miembro
  const handleToggleActive = (member: AdminUser) => {
    startTransition(async () => {
      try {
        const result = await updateTeamMemberActive(member.id, !member.active)

        if (result.success) {
          toast.success(
            member.active
              ? "Miembro del equipo desactivado correctamente."
              : "Miembro del equipo activado correctamente."
          )
          router.refresh()
        } else {
          toast.error(result.error || "Ocurrió un error al actualizar el estado del miembro.")
        }
      } catch {
        toast.error("Error inesperado al actualizar el estado del miembro.")
      }
    })
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
            {team?.map((t) => (
              <TeamCard
                key={t.id}
                team={t}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
                isPending={isPending}
              />
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

            {/* Estado activo */}
            <div className="flex items-center justify-between">
              <div className="grid gap-1.5">
                <Label htmlFor="enabled">Miembro Activo</Label>
                <p className="text-xs text-muted-foreground">
                  Los miembros inactivos no aparecerán en el menú de reservas.
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
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? editingMember
                    ? "Guardando..."
                    : "Creando..."
                  : editingMember
                    ? "Guardar Cambios"
                    : "Crear Miembro"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Diálogo de confirmación para eliminar miembro del equipo */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar miembro del equipo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el miembro{" "}
              <strong>{memberToDelete?.name || memberToDelete?.email}</strong>.
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

export default SettingsTeam