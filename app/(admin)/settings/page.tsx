import SettingsBusinessLogic from '@/components/admin/settings-business-logic'
import SettingsServicesList from '@/components/admin/settings-services-list'
import SettingsTeam from '@/components/admin/settings-team'
import Sidebar from '@/components/admin/sidebar'
import AdminMobileHeader from '@/components/admin/admin-mobile-header'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { Button } from '@/components/ui/button'
import { SettingsIcon } from 'lucide-react'
import { Metadata } from 'next'
import { SidebarProvider } from '@/context/sidebar-context'
import { getBusinessHours, getBusinessRules } from '@/actions/business'
import { getServices } from '@/actions/services'
import { getTeam } from '@/actions/team'

export const metadata: Metadata = {
  title: "CABULL | Configuraciones",
  description: "CABULL | Configuraciones",
  keywords: ["configuraciones", "barbershop", "La Plata", "Buenos Aires", "Argentina"],
  openGraph: {
    title: "CABULL | Configuraciones",
    description: "CABULL | Configuraciones",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2"],
  },
}
async function SettingsPage() {

  const { businessRules } = await getBusinessRules()
  const { businessHours } = await getBusinessHours()
  const { services } = await getServices(false)
  const { team } = await getTeam()

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar active="settings" />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
          <AdminMobileHeader />
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full space-y-3">
            <AdminPageHeader
              title="Configuraciones"
              subtitle="Administra las operaciones y los servicios de tu tienda."
              icon={SettingsIcon}
            />
            <div>
              <div className="flex gap-8 overflow-x-auto no-scrollbar mb-1">
                <Button variant="ghost" className="border-x-0 border-y-0 border-b-2 border-primary ">
                  General
                </Button>
              </div>
            </div>
            <SettingsBusinessLogic
              businessHours={businessHours || []}
              reservationWindow={businessRules?.reservationWindow?.toString() || '7'}
              reservationInterval={businessRules?.reservationInterval?.toString() || '30'}
              id={businessRules?.id || ''}
            />
            <SettingsServicesList services={services || []} />
            <SettingsTeam team={team || []} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default SettingsPage