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
import { Progress } from "@/components/ui/progress"

interface PaymentDistribution {
  payment_method: string
  count: number
  revenue: number
}

const methodIcons: Record<string, string> = {
  "Credit Card": "CC",
  "Debit Card": "DC",
  "PayPal": "PP",
  "Bank Transfer": "BT",
}

export function PaymentTable({ data }: { data: PaymentDistribution[] }) {
  const totalCount = data.reduce((sum, p) => sum + Number(p.count), 0)
  const maxRevenue = Math.max(...data.map((p) => Number(p.revenue)))

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Payment Method Details</CardTitle>
        <CardDescription>Performance breakdown by payment type</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Revenue Share</TableHead>
              <TableHead className="text-right">Transactions</TableHead>
              <TableHead className="text-right">Share %</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((payment) => (
              <TableRow key={payment.payment_method}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {methodIcons[payment.payment_method] || "??"}
                    </Badge>
                    <span className="font-medium">{payment.payment_method}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full max-w-[200px]">
                    <Progress 
                      value={(Number(payment.revenue) / maxRevenue) * 100} 
                      className="h-2"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">{payment.count}</TableCell>
                <TableCell className="text-right">
                  {((Number(payment.count) / totalCount) * 100).toFixed(1)}%
                </TableCell>
                <TableCell className="text-right text-primary font-medium">
                  ${Number(payment.revenue).toLocaleString("en-US", {
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
