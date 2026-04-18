"use client"

import * as React from "react"
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Order {
  id: string
  order_date: string
  product_id: string
  product_category: string
  quantity: number
  revenue: number
  region: string
  rating: string
}

export function OrdersTable({ data }: { data: Order[] }) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [regionFilter, setRegionFilter] = React.useState("all")
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Order; direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10

  // 1. Dinamik Filtreleme Seçeneklerini Oluştur (Kategori & Bölge)
  const filters = React.useMemo(() => ({
    categories: ["All", ...Array.from(new Set(data.map(d => d.product_category).filter(Boolean)))],
    regions: ["All", ...Array.from(new Set(data.map(d => d.region).filter(Boolean)))]
  }), [data])

  // 2. Filtreleme, Sıralama ve Arama Mantığı
  const processedData = React.useMemo(() => {
    let result = data.filter((item) => {
      const matchesSearch = (item.product_id?.toString() || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (item.id?.toString() || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.product_category === categoryFilter;
      const matchesRegion = regionFilter === "All" || item.region === regionFilter;
      
      return matchesSearch && matchesCategory && matchesRegion;
    });

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, categoryFilter, regionFilter, sortConfig]);

  // 3. Sayfalama
  const totalPages = Math.ceil(processedData.length / itemsPerPage)
  const paginatedData = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (key: keyof Order) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  return (
    <Card className="bg-card/50 backdrop-blur-md border-none shadow-xl">


<CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 space-y-0 pb-6">
  <div>
    <CardTitle className="text-xl font-bold tracking-tight">Order Registry</CardTitle>
    <CardDescription className="text-xs">Deep dive into transaction details</CardDescription>
  </div>
  
  <div className="flex flex-wrap items-center gap-2">
    {/* Arama Kutusu */}
    <div className="relative w-full sm:w-48 group">
      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="pl-8 h-9 text-xs bg-background/20 border-muted-foreground/20"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {/* Kategori Filtresi */}
    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
      <SelectTrigger className="h-9 w-fit gap-2 text-xs bg-background/20 border-muted-foreground/20 min-w-[110px]">
        <Filter className="h-3 w-3 text-muted-foreground" />
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent align="end">
        {filters.categories.map(cat => (
          <SelectItem key={cat} value={cat} className="text-xs capitalize">
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* Bölge Filtresi (İkonu Globe ile değiştirdik, daha profesyonel) */}
    <Select value={regionFilter} onValueChange={setRegionFilter}>
      <SelectTrigger className="h-9 w-fit gap-2 text-xs bg-background/20 border-muted-foreground/20 min-w-[110px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <SelectValue placeholder="Region" />
      </SelectTrigger>
      <SelectContent align="end">
        {filters.regions.map(reg => (
          <SelectItem key={reg} value={reg} className="text-xs">
            {reg}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {(categoryFilter !== "All" || regionFilter !== "All" || searchQuery !== "") && (
      <Button 
        variant="ghost" 
        onClick={() => {
          setSearchQuery(""); 
          setCategoryFilter("All"); 
          setRegionFilter("All");
          setSortConfig(null);
        }}
        className="h-9 px-3 text-[10px] font-medium text-primary hover:bg-primary/10 transition-all"
      >
        Clear Filters
      </Button>
    )}
  </div>
</CardHeader>

      <CardContent>
        <div className="rounded-md border border-muted/40 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/20">
              <TableRow>
                <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort('id')}>
                  <div className="flex items-center gap-1">ID <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort('order_date')}>
                  <div className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right cursor-pointer hover:text-primary" onClick={() => handleSort('revenue')}>
                  <div className="flex items-center justify-end gap-1">Revenue <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="text-center cursor-pointer hover:text-primary" onClick={() => handleSort('rating')}>
                  <div className="flex items-center justify-center gap-1">Rating <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, idx) => {
                const rowKey = row.id || `key-${idx}`;
                return (
                  <TableRow key={rowKey} className="hover:bg-muted/10 transition-colors">
                    <TableCell className="font-mono text-[10px] text-muted-foreground">#{row.id || "N/A"}</TableCell>
                    <TableCell className="text-sm">
                      {row.order_date ? new Date(row.order_date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' }) : "---"}
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="font-normal text-[10px]">{row.product_category || "Other"}</Badge></TableCell>
                    <TableCell className="text-right font-bold text-primary">${Number(row.revenue || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{row.region || "Global"}</TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-medium",
                        Number(row.rating) >= 4 ? "bg-green-500/10 text-green-500" : 
                        Number(row.rating) >= 2 ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {row.rating || "0.0"} ★
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-xs">
          <p className="text-muted-foreground">Page {currentPage} of {totalPages || 1}</p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
            <Button variant="ghost" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}>Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}