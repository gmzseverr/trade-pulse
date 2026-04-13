import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  order_date: string
  product_id: string
  product_category: string
  quantity: number
  revenue: number
  region: string
  payment_method: string
}

export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest transactions across all regions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border border-border/50 p-3"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{order.product_id}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {order.product_category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {order.region}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">
                  ${Number(order.revenue).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.order_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
