"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"

interface PaymentDistribution {
  payment_method: string
  count: number
  revenue: number
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

export function PaymentPieChart({ data }: { data: PaymentDistribution[] }) {
  const chartData = data.map((item, index) => ({
    name: item.payment_method,
    value: Number(item.count),
    fill: COLORS[index % COLORS.length],
  }))

  const chartConfig = data.reduce((config, item, index) => {
    config[item.payment_method] = {
      label: item.payment_method,
      color: COLORS[index % COLORS.length],
    }
    return config
  }, {} as ChartConfig)

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Payment Method Distribution</CardTitle>
        <CardDescription>Transaction count by payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
