"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

interface DailyRevenue {
  order_date: string
  revenue: number
  orders: number
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

export function TrendAnalysis({ 
  dailyRevenue,
  growthRate,
}: { 
  dailyRevenue: DailyRevenue[]
  growthRate: number
}) {
  const chartData = dailyRevenue.map((item) => ({
    date: new Date(item.order_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    revenue: Number(item.revenue),
  }))

  const avgRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0) / chartData.length || 0

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Trend Analysis</CardTitle>
            <CardDescription>Performance trend with average line</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {growthRate >= 0 ? (
              <TrendingUp className="h-5 w-5 text-primary" />
            ) : (
              <TrendingDown className="h-5 w-5 text-destructive" />
            )}
            <span className={`font-semibold ${growthRate >= 0 ? "text-primary" : "text-destructive"}`}>
              {growthRate >= 0 ? "+" : ""}{growthRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--color-border)" }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ReferenceLine 
              y={avgRevenue} 
              stroke="var(--color-muted-foreground)" 
              strokeDasharray="5 5"
              label={{
                value: `Avg: $${avgRevenue.toFixed(0)}`,
                position: "right",
                fill: "var(--color-muted-foreground)",
                fontSize: 11,
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={{ fill: "var(--color-chart-1)", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
