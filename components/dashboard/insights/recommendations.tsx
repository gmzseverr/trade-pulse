import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface Insights {
  totalRevenue: number
  avgOrderValue: number
  growthRate: number
  topRegion: string
  topRegionRevenue: number
  topCategory: string
  topCategoryRevenue: number
  topPaymentMethod: string
  topPaymentCount: number
  topProduct: string
  topProductRevenue: number
  avgRating: number
}

interface CategoryData {
  product_category: string
  revenue: number
  orders: number
  avg_rating: number | null
}

interface RegionData {
  region: string
  revenue: number
  orders: number
}

export function Recommendations({
  insights,
  categoryData,
  regionData,
}: {
  insights: Insights
  categoryData: CategoryData[]
  regionData: RegionData[]
}) {
  // Generate recommendations based on data
  const recommendations = []

  // Growth recommendation
  if (insights.growthRate > 10) {
    recommendations.push({
      type: "success",
      title: "Strong Growth Momentum",
      description: `Your business is growing at ${insights.growthRate.toFixed(1)}%. Consider scaling marketing efforts in ${insights.topRegion} to accelerate growth.`,
      icon: TrendingUp,
    })
  } else if (insights.growthRate < 0) {
    recommendations.push({
      type: "warning",
      title: "Revenue Decline Detected",
      description: `Revenue has decreased by ${Math.abs(insights.growthRate).toFixed(1)}%. Focus on customer retention and promotional campaigns.`,
      icon: AlertTriangle,
    })
  }

  // Region recommendation
  const lowestRegion = regionData[regionData.length - 1]
  if (lowestRegion && regionData.length > 1) {
    recommendations.push({
      type: "insight",
      title: "Regional Opportunity",
      description: `${lowestRegion.region} has the lowest performance. Consider targeted marketing campaigns or localized pricing strategies.`,
      icon: Target,
    })
  }

  // Category recommendation
  recommendations.push({
    type: "insight",
    title: "Category Focus",
    description: `${insights.topCategory} is your best performer. Consider expanding product offerings in this category.`,
    icon: Lightbulb,
  })

  // Payment recommendation
  recommendations.push({
    type: "success",
    title: "Payment Optimization",
    description: `${insights.topPaymentMethod} is preferred by customers. Ensure checkout flow is optimized for this method.`,
    icon: CheckCircle,
  })

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Data-driven insights for your business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-lg border border-border/50 p-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  rec.type === "success"
                    ? "bg-primary/10 text-primary"
                    : rec.type === "warning"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <rec.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{rec.title}</h4>
                  <Badge
                    variant={
                      rec.type === "success"
                        ? "default"
                        : rec.type === "warning"
                        ? "destructive"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {rec.type === "success"
                      ? "Opportunity"
                      : rec.type === "warning"
                      ? "Action Needed"
                      : "Insight"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
