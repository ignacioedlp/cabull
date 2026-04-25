import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const result = await auth.api.getSession({
    headers: await headers(),
  })

  if (!result?.user) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: result.user.id },
  })

  if (!user || user.role === "CUSTOMER" || !user.active) {
    redirect("/login?error=inactive")
  }

  return <>{children}</>
}
