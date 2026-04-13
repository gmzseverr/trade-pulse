import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CategoryRevenue {
  product_category: string
  revenue: number
  orders: number
  avg_rating: number | null
}

export function CategoryTable({ data }: { data: CategoryRevenue[] }) {
  const maxRevenue = Math.max(...data.map((c) => Number(c.revenue)))

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Category Performance</CardTitle>
        <CardDescription>Detailed breakdown by product category</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Revenue Share</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Avg Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((category) => (
              <TableRow key={category.product_category}>
                <TableCell className="font-medium">{category.product_category}</TableCell>
                <TableCell>
                  <div className="w-full max-w-[200px]">
                    <Progress 
                      value={(Number(category.revenue) / maxRevenue) * 100} 
                      className="h-2"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">{category.orders}</TableCell>
                <TableCell className="text-right text-primary font-medium">
                  ${Number(category.revenue).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span>{category.avg_rating ? Number(category.avg_rating).toFixed(1) : "N/A"}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
