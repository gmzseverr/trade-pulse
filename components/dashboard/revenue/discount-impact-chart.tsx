"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, Legend } from "recharts"

interface DiscountImpact {
  discount_tier: string
  order_count: number
  total_revenue: number
  avg_order_value: number
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

const chartConfig = {
  total_revenue: {
    label: "Revenue",
    color: "var(--color-chart-1)",
  },
  order_count: {
    label: "Orders",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

export function DiscountImpactChart({ data }: { data: DiscountImpact[] }) {
  const chartData = data.map((item, index) => ({
    tier: item.discount_tier,
    revenue: Number(item.total_revenue),
    orders: Number(item.order_count),
    avgValue: Number(item.avg_order_value),
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Discount Impact</CardTitle>
        <CardDescription>How discounts affect revenue and order volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="tier"
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
              cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
