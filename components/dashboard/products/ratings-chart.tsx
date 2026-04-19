"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp } from "lucide-react"

interface ProductPerformance {
  product_id: string
  product_category: string
  units_sold: number
  revenue: number
  avg_rating: string
  review_volume: number
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "oklch(0.6 0.15 200)", // Senin ozel oklch rengin
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function RatingsChart({ data }: { data: ProductPerformance[] }) {
  // 1. Veriyi Temizle ve Sırala (En yüksek ciro en üste)
  const chartData = [...data]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6) // Sadece Top 6 ürünü gösterelim, kalabalık olmasın
    .map((item) => ({
      name: `ID: ${item.product_id}`,
      rawName: item.product_id,
      revenue: item.revenue,
      // String gelen rating'i sayıya çevirip tek ondalık yapıyoruz (Örn: 3.4)
      rating: parseFloat(item.avg_rating).toFixed(1),
      category: item.product_category,
    }))

  // 2. Custom Label: Barın sonuna ciro rakamını şıkça yazmak için
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
    return (
      <text 
        x={x + width + 10} 
        y={y + height / 2} 
        fill="hsl(var(--muted-foreground))" 
        textAnchor="start" 
        dominantBaseline="middle"
        className="text-[11px] font-bold tracking-tight"
      >
        {`$${value.toLocaleString()}`}
      </text>
    );
  };

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold tracking-tight">Top Product Performance</CardTitle>
          <TrendingUp className="size-5 text-emerald-500 animate-pulse" />
        </div>
        <CardDescription className="text-xs">
          Ranked by total revenue with associated customer satisfaction score
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Grafik Alanı */}
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: -10, right: 60, top: 10, bottom: 10 }}
              barCategoryGap="20%"
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-muted/30" />
              
              {/* X Ekseni (Ciro) - Gizli tutuyoruz, rakamları barın sonuna yazacağız */}
              <XAxis type="number" hide />
              
              {/* Y Ekseni (Ürün ID'leri) */}
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fontWeight: 700, fill: "hsl(var(--foreground))" }}
                width={80}
              />
              
              <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={{ fill: "transparent" }} />
              
              {/* Bar (Ciro Hacmi) */}
              <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={28}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    fillOpacity={0.85} 
                    className="transition-all hover:fill-opacity-100"
                  />
                ))}
                {/* Barın sonundaki rakamlar */}
                <LabelList dataKey="revenue" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>

       
      </CardContent>
    </Card>
  )
}