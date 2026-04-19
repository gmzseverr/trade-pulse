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

interface ProductPerformance {
  product_id: string
  product_category: string
  quantity: number
  total_revenue: number
  rating: number | null
  order_count: number
}

export function ProductsTable({ data }: { data: ProductPerformance[] }) {
  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Product Performance Table</CardTitle>
        <CardDescription>Detailed metrics for all products</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell className="font-medium">{product.product_id}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.product_category}</Badge>
                </TableCell>
                <TableCell className="text-right">{product.total_quantity}</TableCell>
                <TableCell className="text-right">{product.order_count}</TableCell>
                <TableCell className="text-right text-primary font-medium">
                  ${Number(product.total_revenue).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span>{product.avg_rating ? Number(product.avg_rating).toFixed(1) : "N/A"}</span>
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
