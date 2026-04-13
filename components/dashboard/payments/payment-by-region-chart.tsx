"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Cell } from "recharts"

interface PaymentByRegion {
  region: string
  payment_method: string
  count: number
  revenue: number
}

const chartConfig = {
  count: {
    label: "Transactions",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

export function PaymentByRegionChart({ data }: { data: PaymentByRegion[] }) {
  // Group by region and aggregate
  const regionData = data.reduce((acc, item) => {
    const existing = acc.find((r) => r.region === item.region)
    if (existing) {
      existing.transactions += Number(item.count)
      existing.revenue += Number(item.revenue)
    } else {
      acc.push({
        region: item.region,
        transactions: Number(item.count),
        revenue: Number(item.revenue),
      })
    }
    return acc
  }, [] as { region: string; transactions: number; revenue: number }[])

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Transactions by Region</CardTitle>
        <CardDescription>Payment activity across regions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={regionData}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              dataKey="region"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              width={100}
            />
            <ChartTooltip
              cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="transactions"
              fill="var(--color-chart-2)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
