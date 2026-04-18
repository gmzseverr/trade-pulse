import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowRight, Link } from "lucide-react"

interface DailyRevenue {
  order_date: string
  revenue: number
  orders: number
}

export function RevenueTable({ data }: { data: DailyRevenue[] }) {
  // Show most recent first, limit to 10 rows
  const tableData = [...data].reverse().slice(0, 10)

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Daily Revenue Breakdown</CardTitle>
        <CardDescription>Recent daily performance metrics</CardDescription>
       <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 text-primary">
          <Link href="/dashboard/orders" className="flex items-center gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
       
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.order_date}>
                <TableCell className="font-medium">
                  {new Date(row.order_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">{row.orders}</TableCell>
                <TableCell className="text-right text-primary font-medium">
                  ${Number(row.revenue).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
