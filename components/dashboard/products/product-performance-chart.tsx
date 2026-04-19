"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

// JSON verindeki gerçek alanlara göre güncelledik
interface ProductPerformance {
  product_id: string
  product_category: string
  units_sold: number // JSON: units_sold
  revenue: number    // JSON: revenue
  avg_rating: string
  review_volume: number
}

// 5+1 Renk Paletin (Aynen korunuyor)
const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "oklch(0.6 0.15 200)", 
]

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
} satisfies ChartConfig

export function ProductPerformanceChart({ data }: { data: ProductPerformance[] }) {
  // Veriyi hazırlarken hem sıralıyoruz hem de anahtarları eşliyoruz
  const chartData = [...data]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6) // En iyi 6 ürün
    .map((item, index) => ({
      product: `ID: ${item.product_id}`,
      revenue: Number(item.revenue),
      fill: COLORS[index % COLORS.length], 
    }))

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">Top Products by Revenue</CardTitle>
        <CardDescription className="text-xs">Financial performance ranking</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            {/* Sadece dikey çizgiler kalsın: Daha modern durur */}
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" horizontal={false} />
            
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            
            <YAxis
              dataKey="product"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 600 }}
              width={80}
            />
            
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
              content={<ChartTooltipContent hideLabel />}
            />
            
            <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={25}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}