import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react"

interface OverviewStats {
  total_revenue: number | null
  total_orders: number | null
  avg_order_value: number | null
  unique_products: number | null
}

export function KPICards({ stats }: { stats: OverviewStats | null }) {
  const kpis = [
    {
      title: "Total Revenue",
      value: stats?.total_revenue
        ? `$${Number(stats.total_revenue).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "$0.00",
      icon: DollarSign,
      description: "All-time revenue",
    },
    {
      title: "Total Orders",
      value: stats?.total_orders?.toLocaleString() || "0",
      icon: ShoppingCart,
      description: "Orders processed",
    },
    {
      title: "Avg Order Value",
      value: stats?.avg_order_value
        ? `$${Number(stats.avg_order_value).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "$0.00",
      icon: TrendingUp,
      description: "Per transaction",
    },
    {
      title: "Unique Products",
      value: stats?.unique_products?.toLocaleString() || "0",
      icon: Package,
      description: "Products sold",
    },
  ]

  return (
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
  )
}
