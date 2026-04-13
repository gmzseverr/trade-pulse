import { createClient } from "@/lib/supabase/server"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RegionChart } from "@/components/dashboard/region-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { RecentOrders } from "@/components/dashboard/recent-orders"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch data from views
  const [
    { data: overviewStats },
    { data: dailyRevenue },
    { data: regionRevenue },
    { data: categoryRevenue },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from("overview_stats").select("*").single(),
    supabase.from("daily_revenue").select("*").order("order_date", { ascending: true }),
    supabase.from("region_revenue").select("*"),
    supabase.from("category_revenue").select("*"),
    supabase.from("orders").select("*").order("order_date", { ascending: false }).limit(5),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Real-time insights into your e-commerce performance
        </p>
      </div>

      <KPICards stats={overviewStats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={dailyRevenue || []} />
        <RegionChart data={regionRevenue || []} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryChart data={categoryRevenue || []} />
        <RecentOrders orders={recentOrders || []} />
      </div>
    </div>
  )
}
