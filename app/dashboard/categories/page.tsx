import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryPieChart } from "@/components/dashboard/categories/category-pie-chart"
import { CategoryBarChart } from "@/components/dashboard/categories/category-bar-chart"
import { CategoryTable } from "@/components/dashboard/categories/category-table"
import { Grid3X3, DollarSign, Star, TrendingUp } from "lucide-react"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categoryRevenue } = await supabase
    .from("category_revenue")
    .select("*")

  // Calculate category metrics
  const totalCategories = categoryRevenue?.length || 0
  const totalCategoryRevenue = categoryRevenue?.reduce((sum, c) => sum + Number(c.revenue), 0) || 0
  const avgCategoryRating = categoryRevenue?.length
    ? categoryRevenue.reduce((sum, c) => sum + Number(c.avg_rating || 0), 0) / categoryRevenue.length
    : 0
  const topCategory = categoryRevenue?.[0]

  const kpis = [
    {
      title: "Total Categories",
      value: totalCategories.toString(),
      icon: Grid3X3,
      description: "Active categories",
    },
    {
      title: "Category Revenue",
      value: `$${totalCategoryRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      description: "All categories combined",
    },
    {
      title: "Avg Category Rating",
      value: avgCategoryRating.toFixed(1),
      icon: Star,
      description: "Across all categories",
    },
    {
      title: "Top Category",
      value: topCategory?.product_category || "N/A",
      icon: TrendingUp,
      description: topCategory
        ? `$${Number(topCategory.revenue).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
        : "No data",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Category Analytics</h1>
        <p className="text-muted-foreground">
          Performance breakdown by product category
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
        <CategoryPieChart data={categoryRevenue || []} />
        <CategoryBarChart data={categoryRevenue || []} />
      </div>

      <CategoryTable data={categoryRevenue || []} />
    </div>
  )
}
