"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockInvoices, DetailedInvoice } from "@/lib/mock-data";

export default function InvoiceListPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredInvoices = React.useMemo(() => {
    return mockInvoices.filter((inv) => {
      const matchesSearch =
        inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
        inv.clientCompany.toLowerCase().includes(search.toLowerCase()) ||
        inv.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || inv.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Invoicing Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track business billing history, invoice statuses, and receivables client balances.
          </p>
        </div>
        <div>
          <Button className="gap-2" onClick={() => alert("Mock Action: Create New Invoice form in dev.")}>
            <Plus className="h-4 w-4" /> Create Invoice
          </Button>
        </div>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by invoice ID, client name, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer w-full sm:w-40"
            >
              <option value="all">All Invoices</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Invoice List Table */}
      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/80 text-left text-muted-foreground font-semibold bg-muted/20">
                  <th className="p-4 pl-6">Invoice ID</th>
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-muted/10 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 pl-6 font-semibold text-primary">
                        <Link href={`/apps/invoice/${inv.id}`}>{inv.id}</Link>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground leading-none">
                            {inv.clientName}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-1">
                            {inv.clientCompany}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-foreground">
                        ${(inv.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) + 
                           (inv.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) * inv.taxRate) / 100 - 
                           inv.discount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="p-4 text-xs text-muted-foreground">
                        {new Date(inv.dueDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            inv.status === "paid"
                              ? "success"
                              : inv.status === "sent"
                              ? "default"
                              : inv.status === "overdue"
                              ? "destructive"
                              : "secondary"
                          }
                          className="capitalize text-[10px] py-0 px-2"
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <Link href={`/apps/invoice/${inv.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-sm text-muted-foreground"
                    >
                      No invoices found matching search filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
