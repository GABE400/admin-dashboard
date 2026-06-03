"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Download, CreditCard, Receipt } from "lucide-react";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockInvoices, DetailedInvoice } from "@/lib/mock-data";

interface InvoiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  const { id } = use(params);
  
  // Find the invoice in local state to allow updates
  const [invoice, setInvoice] = React.useState<DetailedInvoice | null>(null);

  React.useEffect(() => {
    const found = mockInvoices.find((inv) => inv.id === id);
    if (found) {
      setInvoice(found);
    }
  }, [id]);

  if (!invoice) {
    return (
      <div className="flex h-96 flex-col items-center justify-center space-y-4">
        <Receipt className="h-12 w-12 text-muted-foreground animate-pulse" />
        <h2 className="text-xl font-bold">Invoice Not Found</h2>
        <p className="text-sm text-muted-foreground">The requested invoice ID does not exist in our ledger.</p>
        <Link href="/apps/invoice">
          <Button variant="outline">Back to Invoicing Hub</Button>
        </Link>
      </div>
    );
  }

  // Calculate Invoice Math
  const subtotal = invoice.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
  const taxAmount = (subtotal * invoice.taxRate) / 100;
  const total = subtotal + taxAmount - invoice.discount;

  const handleMarkAsPaid = () => {
    setInvoice((prev) => {
      if (!prev) return null;
      return { ...prev, status: "paid" };
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/apps/invoice" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Invoices
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => alert("Mock Action: Downloading PDF Invoice...")}
          >
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          {invoice.status !== "paid" && (
            <Button className="gap-2" onClick={handleMarkAsPaid}>
              <CreditCard className="h-4 w-4" /> Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {/* Invoice Sheet container */}
      <Card className="shadow-lg border border-border bg-card text-card-foreground">
        <CardContent className="p-8 sm:p-12 space-y-8">
          
          {/* Header Branding Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30">
                <Receipt className="h-6 w-6" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent block">
                  Aether Corporation
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5 block">
                  Cloud Infrastructure Solutions
                </span>
              </div>
            </div>
            
            <div className="text-right sm:text-right text-xs text-muted-foreground space-y-1">
              <p>Aether Plaza, Floor 42</p>
              <p>Tech City, CA 94016</p>
              <p>billing@aether.com</p>
              <p>VAT No. EU9203940</p>
            </div>
          </div>

          <Separator />

          {/* Details Row */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {/* Bill To */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Bill To
              </span>
              <h3 className="font-bold text-foreground text-base leading-tight">
                {invoice.clientName}
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground/80">{invoice.clientCompany}</p>
                <p className="max-w-xs">{invoice.clientAddress}</p>
                <p className="mt-1.5">{invoice.clientEmail}</p>
              </div>
            </div>

            {/* Metadata Info */}
            <div className="space-y-3 sm:text-right sm:ml-auto">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Invoice ID
                </span>
                <span className="text-xl font-extrabold text-primary">{invoice.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:justify-items-end justify-items-start">
                <span className="text-muted-foreground">Invoice Date:</span>
                <span className="font-medium text-foreground">{invoice.invoiceDate}</span>
                
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium text-foreground">{invoice.dueDate}</span>
                
                <span className="text-muted-foreground">Status:</span>
                <Badge
                  variant={
                    invoice.status === "paid"
                      ? "success"
                      : invoice.status === "sent"
                      ? "default"
                      : invoice.status === "overdue"
                      ? "destructive"
                      : "secondary"
                  }
                  className="capitalize text-[10px] py-0 px-2 h-fit mt-0.5 sm:ml-auto"
                >
                  {invoice.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-border/80 rounded-lg overflow-hidden bg-muted/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20 text-left text-muted-foreground font-semibold">
                  <th className="p-4 pl-6">Line Item Description</th>
                  <th className="p-4 text-center">Qty</th>
                  <th className="p-4 text-right">Unit Price</th>
                  <th className="p-4 pr-6 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="text-foreground">
                    <td className="p-4 pl-6 font-medium">{item.description}</td>
                    <td className="p-4 text-center font-medium">{item.quantity}</td>
                    <td className="p-4 text-right font-medium">${item.price.toFixed(2)}</td>
                    <td className="p-4 pr-6 text-right font-bold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Row */}
          <div className="flex flex-col sm:flex-row gap-6 justify-between pt-4">
            {/* Note Panel */}
            <div className="max-w-xs space-y-1.5 text-xs text-muted-foreground leading-relaxed">
              <p className="font-bold text-foreground/80 uppercase tracking-wider">Payment Instructions</p>
              <p>Please settle this invoice within 15 days of release. Operations charge 1.5% interest per month on payments overdue by 30 days or more.</p>
            </div>

            {/* Summary Box */}
            <div className="w-full sm:w-64 space-y-2 text-sm sm:ml-auto">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT ({invoice.taxRate}%):</span>
                <span className="font-semibold text-foreground">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Discount:</span>
                <span className="font-semibold text-red-600 dark:text-red-500">-${invoice.discount.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-extrabold text-foreground">
                <span>Total Amount:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
