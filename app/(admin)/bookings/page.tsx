import BookingsCards from '@/components/admin/bookings-cards'
import BookingsProgress from '@/components/admin/bookings-progress'
import BookingsTimeline from '@/components/admin/bookings-timeline'
import Sidebar from '@/components/admin/sidebar'
import AdminMobileHeader from '@/components/admin/admin-mobile-header'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { CalendarIcon } from 'lucide-react'
import { Metadata } from 'next'
import BookingsDayPicker from '@/components/admin/bookings-day-picker'
import { SidebarProvider } from '@/context/sidebar-context'
import dayjs from 'dayjs'
import { getAppointmentsForDay } from '@/actions/appointments'
import 'dayjs/locale/es'

export const metadata: Metadata = {
  title: "CABULL | Clientes",
  description: "CABULL | Clientes",
  keywords: ["clientes", "barbershop", "La Plata", "Buenos Aires", "Argentina"],
  openGraph: {
    title: "CABULL | Clientes",
    description: "CABULL | Clientes",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2"],
  },
}

interface BookingsPageProps {
  searchParams: Promise<{
    day?: string
  }>
}

async function BookingsPage({ searchParams }: BookingsPageProps) {
  const params = await searchParams

  // Parse search params with defaults
  const dayParam = params.day || dayjs().format('YYYY-MM-DD')

  const { success, appointments } = await getAppointmentsForDay(dayParam)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar active="bookings" />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
          <AdminMobileHeader />
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full space-y-8">
            <AdminPageHeader
              title="Programación Diaria"
              subtitle={dayjs(dayParam).locale('es').format('dddd, DD [de] MMMM')}
              icon={CalendarIcon}
              actions={
                <BookingsDayPicker day={dayParam} />
              }
            />
            <BookingsCards appointments={appointments} />
            <BookingsProgress appointments={appointments} />
            <BookingsTimeline appointments={appointments} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default BookingsPage