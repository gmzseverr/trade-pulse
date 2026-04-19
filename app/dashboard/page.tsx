import { createClient } from "@/lib/supabase/server"
import { RevenueAreaChart } from "@/components/dashboard/revenue-area-chart.tsx"
import { RegionChart } from "@/components/dashboard/region-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, TrendingUp, Calendar } from "lucide-react"


export default async function DashboardPage() {
  const supabase = await createClient()

  // Veriyi çekiyoruz
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

  // KPI Değerlerini overviewStats view'ından veya manuel hesaplamadan alalım
  // Not: overviewStats undefined gelirse patlamaması için optional chaining ve default değerler şart
  const totalRevenue = Number(overviewStats?.total_revenue || 0)
  const totalOrders = Number(overviewStats?.total_orders || 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const totalDays = dailyRevenue?.length || 1 // 0'a bölme hatası için 1
  const revenuePerDay = totalRevenue / totalDays

  const kpis = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      description: "Lifetime earnings",
    },
    {
      title: "Avg Order Value",
      value: `$${avgOrderValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      description: "Per transaction",
    },
    {
      title: "Daily Average",
      value: `$${revenuePerDay.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Calendar,
      description: "Revenue per day",
    },
    {
      title: "Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      description: "Total transactions",
    },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Real-time insights into your e-commerce performance
        </p>
      </header>

      {/* KPI Cards Section */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueAreaChart data={dailyRevenue || []} />
        <CategoryChart data={categoryRevenue || []} />
        
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RegionChart data={regionRevenue || []} />
        <RecentOrders orders={recentOrders || []} />
      </div>
    </div>
  )
}