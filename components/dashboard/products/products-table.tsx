"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

// JSON verindeki GERÇEK isimleri buraya yazdık
interface ProductPerformance {
  product_id: string
  product_category: string
  units_sold: number  // JSON'da units_sold var
  revenue: number     // JSON'da revenue var
  avg_rating: string  // JSON'da string geliyor
  review_volume: number
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "oklch(0.6 0.15 200)",
]

export function ProductsTable({ data }: { data: ProductPerformance[] }) {
  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">Product Insights</CardTitle>
        <CardDescription className="text-xs">Detailed inventory and financial metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-muted/40 overflow-hidden">

        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow >
              <TableHead className="cursor-pointer hover:text-primary">Product ID</TableHead>
              <TableHead className="text-[11px] uppercase font-bold">Category</TableHead>
              <TableHead className="text-right text-[11px] uppercase font-bold">Units Sold</TableHead>
              <TableHead className="text-right text-[11px] uppercase font-bold">Revenue</TableHead>
              <TableHead className="text-right text-[11px] uppercase font-bold">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product, index) => (
              <TableRow key={product.product_id} className="hover:bg-muted/10 transition-colors">
                <TableCell className="font-mono text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {/* Renkli İndikatör */}
                    <div 
                      className="size-1.5 rounded-full shrink-0" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                    <span className="font-mono text-[11px] font-bold">#{product.product_id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {product.product_category}
                  </Badge>
                </TableCell>
                {/* DOĞRU PROP: units_sold */}
                <TableCell className="text-right text-xs font-medium">
                  {product.units_sold || 0}
                </TableCell>
                {/* DOĞRU PROP: revenue (NaN hatası çözüldü) */}
                <TableCell className="text-right text-xs font-bold text-foreground">
                  ${Number(product.revenue || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-xs font-bold">
                      {product.avg_rating ? parseFloat(product.avg_rating).toFixed(1) : "0.0"}
                    </span>
                    <Star className="size-3 fill-primary text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  )
}