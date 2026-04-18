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
import { 
  Bar, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Line, 
  ComposedChart, // Karma grafik için ana bileşen
  ResponsiveContainer 
} from "recharts"

interface DiscountImpact {
  discount_percent: string
  units: number
  revenue: number
  transactions: number
}

const chartConfig = {
  revenue: {
    label: "Total Revenue",
    color: "#3b82f6",
  },
  transactions: {
    label: "Transaction Count",
    color: "#f97316",
  },
} satisfies ChartConfig

export function DiscountImpactChart({ data }: { data: DiscountImpact[] }) {
  const chartData = [...data]
    .sort((a, b) => parseFloat(a.discount_percent) - parseFloat(b.discount_percent))
    .map((item) => ({
      tier: `%${Math.round(parseFloat(item.discount_percent))}`,
      revenue: Number(item.revenue || 0),
      transactions: Number(item.transactions || 0),
    }))

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Discount Efficiency Analysis</CardTitle>
        <CardDescription>Revenue (Bars) vs. Transaction Volume (Line)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          {/* BarChart yerine ComposedChart kullanıyoruz */}
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" opacity={0.3} />
            
            <XAxis
              dataKey="tier"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            
            {/* Sol Y Ekseni: Revenue için */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tick={{ fill: "#3b82f6", fontSize: 11 }}
            />

            {/* Sağ Y Ekseni: Transactions için (Görünmez ama ölçek için şart) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              hide // Değerler barların üstünde çok kalabalık yapmasın diye gizledik
              domain={['auto', 'auto']}
            />

            <ChartTooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              content={<ChartTooltipContent indicator="line" />}
            />
            
            <ChartLegend content={<ChartLegendContent />} />
            
            {/* Ciro: Bar olarak */}
            <Bar 
              yAxisId="left"
              dataKey="revenue" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
              opacity={0.8}
            />
            
            {/* İşlem Sayısı: Çizgi olarak */}
            <Line
              yAxisId="right" 
              type="monotone"
              dataKey="transactions"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4, fill: "#f97316" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}