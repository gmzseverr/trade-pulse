import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueAreaChart } from "@/components/dashboard/revenue/revenue-area-chart"
import { RegionBarChart } from "@/components/dashboard/revenue/region-bar-chart"
import { DiscountImpactChart } from "@/components/dashboard/revenue/discount-impact-chart"
import { RevenueTable } from "@/components/dashboard/revenue/revenue-table"
import { DollarSign, TrendingUp, Percent, Calendar } from "lucide-react"

export default async function RevenuePage() {
  const supabase = await createClient()

  const [
    { data: overviewStats },
    { data: dailyRevenue },
    { data: regionRevenue },
    { data: discountImpact },
  ] = await Promise.all([
    supabase.from("overview_stats").select("*").single(),
    supabase.from("daily_revenue").select("*").order("order_date", { ascending: true }),
    supabase.from("region_revenue").select("*"),
    supabase.from("discount_impact").select("*"),
  ])

  // Calculate additional metrics
  const totalRevenue = Number(overviewStats?.total_revenue || 0)
  const avgOrderValue = Number(overviewStats?.avg_order_value || 0)
  const totalOrders = Number(overviewStats?.total_orders || 0)
  
  // Calculate revenue per day average
  const revenuePerDay = dailyRevenue?.length 
    ? totalRevenue / dailyRevenue.length 
    : 0

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
      icon: Percent,
      description: "Total transactions",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Revenue Analytics</h1>
        <p className="text-muted-foreground">
          Deep dive into revenue trends and patterns
        </p>
      </div>

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

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueAreaChart data={dailyRevenue || []} />
        <RegionBarChart data={regionRevenue || []} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DiscountImpactChart data={discountImpact || []} />
        <RevenueTable data={dailyRevenue || []} />
      </div>
    </div>
  )
}
