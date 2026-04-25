import Sidebar from '@/components/admin/sidebar'
import AdminMobileHeader from '@/components/admin/admin-mobile-header'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { HomeIcon, CalendarIcon, UsersIcon, BarChartIcon, SettingsIcon, ArrowRightIcon } from 'lucide-react'
import { Metadata } from 'next'
import { SidebarProvider } from '@/context/sidebar-context'
import { getDashboardStats } from '@/actions/dashboard'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatPriceARS } from '@/lib/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

export const metadata: Metadata = {
  title: "CABULL | Admin",
  description: "CABULL | Admin",
  keywords: ["admin", "barbershop", "La Plata", "Buenos Aires", "Argentina"],
  openGraph: {
    title: "CABULL | Admin",
    description: "CABULL | Admin",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2"],
  },
}

async function AdminPage() {
  const { stats } = await getDashboardStats()
  const today = dayjs().locale('es').format('dddd, DD [de] MMMM')

  // Botones de acción rápida
  const quickActions = [
    {
      title: "Itinerario Diario",
      description: "Ver y gestionar los turnos del día",
      icon: CalendarIcon,
      href: "/admin/bookings",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title: "Clientes",
      description: "Administrar tu base de clientes",
      icon: UsersIcon,
      href: "/admin/clients",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      title: "Rendimiento",
      description: "Ver análisis y estadísticas",
      icon: BarChartIcon,
      href: "/admin/analytics",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      title: "Configuraciones",
      description: "Ajustar horarios y servicios",
      icon: SettingsIcon,
      href: "/admin/settings",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar active="" />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
          <AdminMobileHeader />
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full space-y-6">
            <AdminPageHeader
              title="Panel de Control"
              subtitle={`Bienvenido, hoy es ${today}`}
              icon={HomeIcon}
            />

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Turnos de Hoy</CardTitle>
                  <CardDescription>Total de turnos programados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.todayAppointments}</div>
                  {stats.todayConfirmed > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.todayConfirmed} confirmados
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Próximos Turnos</CardTitle>
                  <CardDescription>En los próximos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                  <CardDescription>Clientes registrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalClients}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                  <CardDescription>Total facturado este mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPriceARS(stats.monthlyRevenue)}</div>
                </CardContent>
              </Card>
            </div>

            {/* Acciones rápidas */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link key={action.href} href={action.href}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center mb-2`}>
                            <Icon className={`w-6 h-6 ${action.color}`} />
                          </div>
                          <CardTitle className="text-base">{action.title}</CardTitle>
                          <CardDescription className="text-xs">
                            {action.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="ghost" size="sm" className="w-full justify-between group">
                            <span>Ir a {action.title}</span>
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Acceso rápido a turnos de hoy */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Turnos de Hoy</CardTitle>
                    <CardDescription>
                      {stats.todayAppointments > 0
                        ? `${stats.todayAppointments} turno${stats.todayAppointments !== 1 ? 's' : ''} programado${stats.todayAppointments !== 1 ? 's' : ''}`
                        : 'No hay turnos programados para hoy'}
                    </CardDescription>
                  </div>
                  <Link href="/admin/bookings">
                    <Button variant="outline" size="sm">
                      Ver Itinerario
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AdminPage
