import ClientsFilters from '@/components/admin/clients-filters'
import ClientsList from '@/components/admin/clients-list'
import ClientsPagination from '@/components/admin/clients-pagination'
import Sidebar from '@/components/admin/sidebar'
import AdminMobileHeader from '@/components/admin/admin-mobile-header'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { Input } from '@/components/ui/input'
import { SearchIcon, UsersIcon } from 'lucide-react'
import { Metadata } from 'next'
import { SidebarProvider } from '@/context/sidebar-context'

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

function ClientPgae() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar active="clients" />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
          <AdminMobileHeader />
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
            <AdminPageHeader
              title="Clientes"
              subtitle="Total 2,453 Clientes"
              icon={UsersIcon}
              actions={
                <>
                  <div className="relative flex-1 md:w-64">
                    <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input className="w-full pl-10 pr-4 h-10 rounded-lg border border-muted border-b-2 bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all " placeholder="Buscar clientes..." type="text" />
                  </div>
                </>
              }
            />
            <ClientsFilters />
            <ClientsList />
            <ClientsPagination />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default ClientPgae