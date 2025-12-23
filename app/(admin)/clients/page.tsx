import { Metadata } from 'next'
import ClientsFilters from '@/components/admin/clients-filters'
import ClientsList, { type ClientFromDB } from '@/components/admin/clients-list'
import ClientsPagination from '@/components/admin/clients-pagination'
import ClientsSearch from '@/components/admin/clients-search'
import Sidebar from '@/components/admin/sidebar'
import AdminMobileHeader from '@/components/admin/admin-mobile-header'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { UsersIcon } from 'lucide-react'
import { SidebarProvider } from '@/context/sidebar-context'
import { getClients } from '@/actions/clients'

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

interface ClientsPageProps {
  searchParams: Promise<{
    page?: string
    name?: string
    email?: string
    userType?: string
    activityFilter?: "recent" | "inactive"
  }>
}

async function ClientPage({ searchParams }: ClientsPageProps) {
  // Await searchParams (it's a Promise in Next.js 15+)
  const params = await searchParams

  // Parse search params with defaults
  const page = parseInt(params.page || "1", 10)
  const pageSize = 12 // Number of clients per page
  const name = params.name || undefined
  const email = params.email || undefined
  const userType = params.userType || undefined
  const activityFilter = params.activityFilter || null

  // Fetch clients from server
  const { clients, total } = await getClients(page, pageSize, {
    name,
    email,
    userType,
    activityFilter,
  })

  const totalPages = Math.ceil(total / pageSize)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar active="clients" />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
          <AdminMobileHeader />
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
            <AdminPageHeader
              title="Clientes"
              subtitle={`Total ${total} Clientes`}
              icon={UsersIcon}
              actions={
                <ClientsSearch initialName={name || ""} />
              }
            />
            <ClientsFilters
              currentActivityFilter={activityFilter}
              currentUserTypeFilter={userType}
            />
            <ClientsList clients={clients as ClientFromDB[]} isLoading={false} />
            <ClientsPagination
              currentPage={page}
              totalPages={totalPages}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default ClientPage