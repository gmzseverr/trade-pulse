"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

interface CategoryRevenue {
  product_category: string
  revenue: number
  orders: number
  avg_rating: number | null
}



const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

const chartConfig = {
  orders: {
    label: "Orders",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

export function CategoryBarChart({ data }: { data: CategoryRevenue[] }) {
  const chartData = data.map((item, index) => ({
  category: item.product_category || "Unknown",
  orders: Number(item.orders ?? 0),
  fill: COLORS[index % COLORS.length],
}))

  

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Orders by Category</CardTitle>
        <CardDescription>Number of orders per category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
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
