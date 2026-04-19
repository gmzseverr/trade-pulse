"use client"

import * as React from "react"
import { Pie, PieChart, Cell, Legend, ResponsiveContainer, Sector } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RegionRevenue {
  customer_region: string
  revenue: number
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
} satisfies ChartConfig

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8} 
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={6} 
      />
    </g>
  )
}

export function RegionChart({ data }: { data: RegionRevenue[] }) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)

  const totalRevenue = React.useMemo(() => {
    return data.reduce((sum, item) => sum + Number(item.revenue || 0), 0)
  }, [data])

  const chartData = data.map((item, index) => ({
    name: item.customer_region,
    value: Number(item.revenue || 0),
    percentage: ((Number(item.revenue || 0) / totalRevenue) * 100).toFixed(1),
    fill: COLORS[index % COLORS.length],
  }))

 return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader className="items-start pb-0">
        <CardTitle className="text-xl font-bold tracking-tight">Market Share</CardTitle>
        <CardDescription>Revenue by Global Region</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-0 pt-4">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <PieChart>
            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent hideLabel />} 
            />
            
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
           
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
              stroke="none"
              label={false} 
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>

            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              iconType="circle"
              content={({ payload }) => (
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-8 px-2">
                  {payload?.map((entry: any, index: number) => (
                    <div key={`item-${index}`} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground leading-none">
                          {entry.value}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase font-medium">
                          %{chartData[index].percentage} • ${Number(chartData[index].value / 1000).toFixed(1)}k
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}