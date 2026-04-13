"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/revenue": "Revenue Analytics",
  "/dashboard/products": "Product Analytics",
  "/dashboard/categories": "Category Analytics",
  "/dashboard/payments": "Payment Analytics",
  "/dashboard/insights": "Insights",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const pageTitle = pageTitles[pathname] || "Dashboard"

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-6">
      <SidebarTrigger className="-ml-2" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          {pathname !== "/dashboard" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
