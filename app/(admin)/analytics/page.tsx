import AnalyticsCards from '@/components/admin/analytics-cards'
import AnalyticsCharts from '@/components/admin/analytics-charts'
import Reviews from '@/components/admin/reviews'
import Sidebar from '@/components/admin/sidebar'
import TopBarbers from '@/components/admin/top-barbers'
import AdminMobileHeader from '@/components/admin/admin-mobile-header'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { BarChartIcon } from 'lucide-react'
import { Metadata } from 'next'
import AnalyticsActions from '@/components/admin/analytics-actions'
import { SidebarProvider } from '@/context/sidebar-context'

export const metadata: Metadata = {
  title: "CABULL | Analiticas",
  description: "CABULL | Analiticas",
  keywords: ["clientes", "barbershop", "La Plata", "Buenos Aires", "Argentina"],
  openGraph: {
    title: "CABULL | Analiticas",
    description: "CABULL | Analiticas",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCMMf0FWYZwr2-cu2opMYb-YaVy62k7RTecQ8-qAY-HdE6TfYworShAvALhBSat-eVTm_xXiGY1ymVnHN3uKvGF82-KabIaf7cE1oTijOhqUf8njemzIsi1YGp4h3BYBpIuZ_QLmUf5016IyKGYktq_DjFBzyXvPTI8qnjPOrBJhKr71IATcSSqZF7h99QoBrLjD8jV0eD0-Yfz-2uwUhJUoDueurV8Jami8NmfTY8Ej6Tffk7qFp__W97x3WRzA1PnGPX-VjP0i2Z2"],
  },
}

function AnalyticsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar active="analytics" />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
          <AdminMobileHeader />
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full space-y-6">
            <AdminPageHeader
              title="Analisis"
              subtitle="Resumen de octubre de 2023"
              icon={BarChartIcon}
              actions={
                <AnalyticsActions />
              }
            />

            <AnalyticsCards />
            <AnalyticsCharts />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopBarbers />
              <Reviews />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AnalyticsPage