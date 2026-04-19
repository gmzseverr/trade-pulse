import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button" 
import { ArrowUpRight } from "lucide-react" 
import Link from "next/link"

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
     <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Latest transactions across all regions
          </CardDescription>
        </div>
        
        <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all">
          <Link href="dashboard/orders">
            View All
            <ArrowUpRight className="size-3" />
          </Link>
        </Button>
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
