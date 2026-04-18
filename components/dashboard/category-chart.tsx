"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"

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
  "oklch(0.6 0.15 200) ",
]

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
} satisfies ChartConfig

export function CategoryChart({ data }: { data: CategoryRevenue[] }) {
  const chartData = data.map((item, index) => ({
    name: item.product_category,
    value: Number(item.revenue),
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Revenue distribution across product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" />}
            />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => 
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
