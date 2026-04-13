import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductsTable } from "@/components/dashboard/products/products-table"
import { ProductPerformanceChart } from "@/components/dashboard/products/product-performance-chart"
import { RatingsChart } from "@/components/dashboard/products/ratings-chart"
import { Package, Star, TrendingUp, ShoppingBag } from "lucide-react"

export default async function ProductsPage() {
  const supabase = await createClient()

  const [
    { data: productPerformance },
    { data: overviewStats },
  ] = await Promise.all([
    supabase.from("product_performance").select("*").limit(20),
    supabase.from("overview_stats").select("*").single(),
  ])

  // Calculate product metrics
  const topProducts = productPerformance?.slice(0, 5) || []
  const avgRating = productPerformance?.length
    ? productPerformance.reduce((sum, p) => sum + Number(p.avg_rating || 0), 0) / productPerformance.length
    : 0
  const totalQuantitySold = productPerformance?.reduce((sum, p) => sum + Number(p.total_quantity), 0) || 0

  const kpis = [
    {
      title: "Unique Products",
      value: overviewStats?.unique_products?.toLocaleString() || "0",
      icon: Package,
      description: "Products with sales",
    },
    {
      title: "Total Units Sold",
      value: totalQuantitySold.toLocaleString(),
      icon: ShoppingBag,
      description: "All-time quantity",
    },
    {
      title: "Avg Rating",
      value: avgRating.toFixed(1),
      icon: Star,
      description: "Across all products",
    },
    {
      title: "Top Product Revenue",
      value: topProducts[0]
        ? `$${Number(topProducts[0].total_revenue).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
        : "$0.00",
      icon: TrendingUp,
      description: topProducts[0]?.product_id || "N/A",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Product Analytics</h1>
        <p className="text-muted-foreground">
          Performance metrics and insights for your product catalog
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
        <ProductPerformanceChart data={topProducts} />
        <RatingsChart data={productPerformance || []} />
      </div>

      <ProductsTable data={productPerformance || []} />
    </div>
  )
}
