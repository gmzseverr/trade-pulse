"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"



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
orders: {
label: "Orders",
color: "var(--color-chart-2)",
},

} satisfies ChartConfig



export function RevenueAreaChart({ data }: { data: DailyRevenue[] }) {
  const [range, setRange] = React.useState("30d")

  const filteredData = React.useMemo(() => {
    const limit = range === "7d" ? 7 : range === "30d" ? 30 : data.length
    return data.slice(-limit).map((item) => ({
      date: new Date(item.order_date).toLocaleDateString("en-US", {
        month: "short", day: "numeric",
      }),
      revenue: Number(item.revenue),
    }))
  }, [data, range])

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-1">
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Visualizing growth over time</CardDescription>
        </div>
        {/* Filtre Butonları: Karmaşıklığı kullanıcı kontrolüne bırakıyoruz */}
        <div className="flex gap-2 bg-muted/50 p-1 rounded-lg border">
          {["7d", "30d", "all"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1 text-xs rounded-md transition-all",
                range === r ? "bg-background shadow-sm font-bold" : "text-muted-foreground"
              )}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={filteredData} margin={{ left: -20, right: 10 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* Sadece yatay çizgiler: Daha temiz bir görünüm sağlar */}
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              minTickGap={30} // Yazıların iç içe girmesini engeller
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Area
              type="linear"
              dataKey="revenue"
              stroke="var(--color-chart-1)"

           
              fill="url(#fillRevenue)"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}