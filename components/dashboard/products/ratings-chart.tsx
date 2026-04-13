"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis } from "recharts"

interface ProductPerformance {
  product_id: string
  product_category: string
  total_quantity: number
  total_revenue: number
  avg_rating: number | null
  order_count: number
}

const chartConfig = {
  rating: {
    label: "Rating",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

export function RatingsChart({ data }: { data: ProductPerformance[] }) {
  const chartData = data
    .filter((item) => item.avg_rating !== null)
    .map((item) => ({
      product: item.product_id,
      revenue: Number(item.total_revenue),
      rating: Number(item.avg_rating),
      orders: Number(item.order_count),
    }))

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Revenue vs Rating</CardTitle>
        <CardDescription>Correlation between product ratings and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="rating"
              type="number"
              domain={[3.5, 5]}
              name="Rating"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              dataKey="revenue"
              type="number"
              name="Revenue"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <ZAxis dataKey="orders" range={[50, 400]} name="Orders" />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<ChartTooltipContent />}
            />
            <Scatter
              data={chartData}
              fill="var(--color-chart-1)"
              fillOpacity={0.6}
            />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
