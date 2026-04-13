import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, MapPin, Package, CreditCard, Star } from "lucide-react"

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

export function InsightCards({ insights }: { insights: Insights }) {
  const cards = [
    {
      title: "Growth Trend",
      icon: insights.growthRate >= 0 ? TrendingUp : TrendingDown,
      value: `${insights.growthRate >= 0 ? "+" : ""}${insights.growthRate.toFixed(1)}%`,
      description: "Period over period change",
      status: insights.growthRate >= 0 ? "positive" : "negative",
    },
    {
      title: "Top Performing Region",
      icon: MapPin,
      value: insights.topRegion,
      description: `$${insights.topRegionRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })} in revenue`,
      status: "neutral",
    },
    {
      title: "Leading Category",
      icon: Package,
      value: insights.topCategory,
      description: `$${insights.topCategoryRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })} in sales`,
      status: "neutral",
    },
    {
      title: "Preferred Payment",
      icon: CreditCard,
      value: insights.topPaymentMethod,
      description: `${insights.topPaymentCount} transactions`,
      status: "neutral",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon 
              className={`h-4 w-4 ${
                card.status === "positive" 
                  ? "text-primary" 
                  : card.status === "negative" 
                  ? "text-destructive" 
                  : "text-muted-foreground"
              }`} 
            />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{card.value}</span>
              {card.status !== "neutral" && (
                <Badge 
                  variant={card.status === "positive" ? "default" : "destructive"}
                  className="text-xs"
                >
                  {card.status === "positive" ? "Growing" : "Declining"}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
