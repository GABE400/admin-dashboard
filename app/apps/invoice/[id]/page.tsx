import { mockInvoices } from "@/lib/mock-data";
import InvoiceDetailPageClient from "./invoice-detail-client";

interface InvoiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return mockInvoices.map((invoice) => ({
    id: invoice.id,
  }));
}

export default async function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  const { id } = await params;
  
  return <InvoiceDetailPageClient id={id} />;
}

