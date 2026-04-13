import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentPieChart } from "@/components/dashboard/payments/payment-pie-chart"
import { PaymentByRegionChart } from "@/components/dashboard/payments/payment-by-region-chart"
import { PaymentTable } from "@/components/dashboard/payments/payment-table"
import { CreditCard, Wallet, DollarSign, TrendingUp } from "lucide-react"

export default async function PaymentsPage() {
  const supabase = await createClient()

  const [
    { data: paymentDistribution },
    { data: paymentByRegion },
  ] = await Promise.all([
    supabase.from("payment_distribution").select("*"),
    supabase.from("payment_by_region").select("*"),
  ])

  // Calculate payment metrics
  const totalPaymentMethods = paymentDistribution?.length || 0
  const totalTransactions = paymentDistribution?.reduce((sum, p) => sum + Number(p.count), 0) || 0
  const totalPaymentRevenue = paymentDistribution?.reduce((sum, p) => sum + Number(p.revenue), 0) || 0
  const topPaymentMethod = paymentDistribution?.[0]

  const kpis = [
    {
      title: "Payment Methods",
      value: totalPaymentMethods.toString(),
      icon: CreditCard,
      description: "Active methods",
    },
    {
      title: "Total Transactions",
      value: totalTransactions.toLocaleString(),
      icon: Wallet,
      description: "All payment types",
    },
    {
      title: "Payment Revenue",
      value: `$${totalPaymentRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      description: "Total processed",
    },
    {
      title: "Top Method",
      value: topPaymentMethod?.payment_method || "N/A",
      icon: TrendingUp,
      description: topPaymentMethod
        ? `${topPaymentMethod.count} transactions`
        : "No data",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Payment Analytics</h1>
        <p className="text-muted-foreground">
          Insights into payment methods and transaction patterns
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PaymentPieChart data={paymentDistribution || []} />
        <PaymentByRegionChart data={paymentByRegion || []} />
      </div>

      <PaymentTable data={paymentDistribution || []} />
    </div>
  )
}
