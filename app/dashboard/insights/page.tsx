import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InsightCards } from "@/components/dashboard/insights/insight-cards"
import { TrendAnalysis } from "@/components/dashboard/insights/trend-analysis"
import { Recommendations } from "@/components/dashboard/insights/recommendations"
import { Lightbulb, TrendingUp, Target, AlertCircle } from "lucide-react"

export default async function InsightsPage() {
  const supabase = await createClient()

  const [
    { data: overviewStats },
    { data: dailyRevenue },
    { data: regionRevenue },
    { data: categoryRevenue },
    { data: paymentDistribution },
    { data: productPerformance },
  ] = await Promise.all([
    supabase.from("overview_stats").select("*").single(),
    supabase.from("daily_revenue").select("*").order("order_date", { ascending: true }),
    supabase.from("region_revenue").select("*"),
    supabase.from("category_revenue").select("*"),
    supabase.from("payment_distribution").select("*"),
    supabase.from("product_performance").select("*").limit(10),
  ])

  // Generate insights from data
  const totalRevenue = Number(overviewStats?.total_revenue || 0)
  const avgOrderValue = Number(overviewStats?.avg_order_value || 0)
  const topRegion = regionRevenue?.[0]
  const topCategory = categoryRevenue?.[0]
  const topPayment = paymentDistribution?.[0]
  const topProduct = productPerformance?.[0]

  // Calculate growth (mock - comparing first half to second half of data)
  const midPoint = Math.floor((dailyRevenue?.length || 0) / 2)
  const firstHalfRevenue = dailyRevenue?.slice(0, midPoint).reduce((sum, d) => sum + Number(d.revenue), 0) || 0
  const secondHalfRevenue = dailyRevenue?.slice(midPoint).reduce((sum, d) => sum + Number(d.revenue), 0) || 0
  const growthRate = firstHalfRevenue > 0 
    ? ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100 
    : 0

  const insights = {
    totalRevenue,
    avgOrderValue,
    growthRate,
    topRegion: topRegion?.region || "N/A",
    topRegionRevenue: Number(topRegion?.revenue || 0),
    topCategory: topCategory?.product_category || "N/A",
    topCategoryRevenue: Number(topCategory?.revenue || 0),
    topPaymentMethod: topPayment?.payment_method || "N/A",
    topPaymentCount: Number(topPayment?.count || 0),
    topProduct: topProduct?.product_id || "N/A",
    topProductRevenue: Number(topProduct?.total_revenue || 0),
    avgRating: Number(topProduct?.avg_rating || 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Business Insights</h1>
        <p className="text-muted-foreground">
          AI-powered analysis and recommendations for your business
        </p>
      </div>

      <InsightCards insights={insights} />

      <div className="grid gap-6 lg:grid-cols-2">
        <TrendAnalysis 
          dailyRevenue={dailyRevenue || []} 
          growthRate={growthRate}
        />
        <Recommendations 
          insights={insights}
          categoryData={categoryRevenue || []}
          regionData={regionRevenue || []}
        />
      </div>
    </div>
  )
}
