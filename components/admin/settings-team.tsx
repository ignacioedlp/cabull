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
import { UserPlusIcon, EditIcon, PlusIcon, Trash2Icon, MailIcon } from 'lucide-react'
import { UserRole } from "@/lib/generated/prisma/enums"
import { User } from "@/lib/generated/prisma/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateTeamMember, deleteTeamMember, updateTeamMemberActive, inviteTeamMember } from "@/actions/team"

// Función para obtener el texto del rol
const getRoleLabel = (role: UserRole): string => {
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
  team: User
  onEdit: (member: User) => void
  onDelete: (member: User) => void
  onToggleActive: (member: User) => void
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


function SettingsTeam({ team }: { team: User[] | undefined }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Sheet para invitar nuevo miembro (solo email)
  const [isInviteSheetOpen, setIsInviteSheetOpen] = React.useState(false)
  const [inviteData, setInviteData] = React.useState({
    email: "",
    role: "BARBER" as UserRole,
  })

  // Sheet para editar miembro existente
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false)
  const [editingMember, setEditingMember] = React.useState<User | null>(null)
  const [editData, setEditData] = React.useState<{
    name: string
    role: UserRole
    enabled: boolean
    color: string
  }>({
    name: "",
    role: "BARBER",
    enabled: true,
    color: "#000000",
  })

  // Diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [memberToDelete, setMemberToDelete] = React.useState<User | null>(null)

  // Función para abrir el Sheet de invitar
  const handleOpenInvite = () => {
    setInviteData({ email: "", role: "BARBER" })
    setIsInviteSheetOpen(true)
  }

  // Función para abrir el Sheet de editar
  const handleEdit = (member: User) => {
    setEditingMember(member)
    setEditData({
      name: member.name || "",
      role: member.role,
      enabled: member.active,
      color: member.color || "#000000",
    })
    setIsEditSheetOpen(true)
  }

  // Manejar envío de invitación
  const handleSubmitInvite = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      try {
        const result = await inviteTeamMember(inviteData.email, inviteData.role)

        if (result.success) {
          toast.success("Invitación enviada correctamente al email.")
          setIsInviteSheetOpen(false)
          setInviteData({ email: "", role: "BARBER" })
          router.refresh()
        } else {
          toast.error(result.error || "Ocurrió un error al enviar la invitación.")
        }
      } catch {
        toast.error("Error inesperado al enviar la invitación.")
      }
    })
  }

  // Manejar actualización de miembro
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingMember) return

    startTransition(async () => {
      try {
        const result = await updateTeamMember({
          id: editingMember.id,
          name: editData.name || null,
          email: editingMember.email, // Email no se edita
          role: editData.role,
          services: [],
          enabled: editData.enabled,
          color: editData.color || null,
        })

        if (result.success) {
          toast.success("Miembro del equipo actualizado correctamente.")
          setIsEditSheetOpen(false)
          router.refresh()
        } else {
          toast.error(result.error || "Ocurrió un error al actualizar el miembro del equipo.")
        }
      } catch {
        toast.error("Error inesperado al actualizar el miembro del equipo.")
      }
    })
  }

  // Función para abrir el diálogo de confirmación de eliminación
  const handleDelete = (member: User) => {
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
  const handleToggleActive = (member: User) => {
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
            <p className="text-text-secondary text-sm">Gestiona a tu personal y asigna servicios.</p>
          </div>
          <Button
            className="flex items-center gap-2"
            variant="outline"
            onClick={handleOpenInvite}
          >
            <MailIcon className="size-4" />
            Invitar al Equipo
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
            <Card className="border border-dashed border-muted cursor-pointer min-h-[220px] flex flex-col items-center justify-center text-center" onClick={handleOpenInvite}>
              <CardContent className="flex flex-col items-center justify-center text-center transition-colors">
                <div className="size-12 rounded-full border border-border-light flex items-center justify-center text-text-secondary mb-3 shadow-sm">
                  <MailIcon className="size-4" />
                </div>
                <h4 className="text-text-main font-bold text-base">Invitar al Equipo</h4>
                <p className="text-text-secondary text-xs mt-1 max-w-[150px]">
                  Envía una invitación por email a un nuevo miembro.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {/* Sheet para invitar nuevo miembro (solo email) */}
      <Sheet open={isInviteSheetOpen} onOpenChange={setIsInviteSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Invitar al Equipo</SheetTitle>
            <SheetDescription>
              Envía una invitación por email a un nuevo miembro para que se unja a tu equipo.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmitInvite} className="flex flex-col gap-6 py-4 px-4">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="invite-email">Email del Invitado *</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteData.email}
                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                placeholder="Ej: marco.rossi@example.com"
                required
              />
            </div>

            {/* Rol */}
            <div className="grid gap-2">
              <Label htmlFor="invite-role">Rol *</Label>
              <Select
                value={inviteData.role}
                onValueChange={(value: UserRole) => setInviteData({ ...inviteData, role: value })}
              >
                <SelectTrigger id="invite-role">
                  <SelectValue>
                    {getRoleLabel(inviteData.role)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STAFF">Personal</SelectItem>
                  <SelectItem value="BARBER">Peluquero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Enviando..." : "Enviar Invitación"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Sheet para editar miembro existente */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Editar Miembro del Equipo</SheetTitle>
            <SheetDescription>
              Modifica la información del miembro del equipo.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmitEdit} className="flex flex-col gap-6 py-4 px-4">
            {/* Email (readonly) */}
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editingMember?.email || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">El email no puede ser editado.</p>
            </div>

            {/* Nombre */}
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nombre Completo *</Label>
              <Input
                id="edit-name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Ej: Marco Rossi"
                required
              />
            </div>

            {/* Rol */}
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Rol *</Label>
              <Select
                value={editData.role}
                onValueChange={(value: UserRole) => setEditData({ ...editData, role: value })}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue>
                    {getRoleLabel(editData.role)}
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
              <Label htmlFor="edit-color">Color (para el calendario)</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="edit-color"
                  type="color"
                  value={editData.color}
                  onChange={(e) => setEditData({ ...editData, color: e.target.value })}
                  className="h-10 w-20 cursor-pointer"
                />
                <Input
                  type="text"
                  value={editData.color}
                  onChange={(e) => setEditData({ ...editData, color: e.target.value })}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Estado activo */}
            <div className="flex items-center justify-between">
              <div className="grid gap-1.5">
                <Label htmlFor="edit-enabled">Miembro Activo</Label>
                <p className="text-xs text-muted-foreground">
                  Los miembros inactivos no aparecerán en el menú de reservas.
                </p>
              </div>
              <Switch
                id="edit-enabled"
                checked={editData.enabled}
                onCheckedChange={(checked) => setEditData({ ...editData, enabled: checked })}
              />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar Cambios"}
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