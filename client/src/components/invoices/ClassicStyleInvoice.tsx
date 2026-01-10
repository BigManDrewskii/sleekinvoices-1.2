import { Currency, DateDisplay } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

interface ClassicStyleInvoiceProps {
  invoiceNumber: string;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  issueDate: Date;
  dueDate: Date;
  lineItems: LineItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  taxRate?: number;
  total: number;
  notes?: string;
  paymentTerms?: string;
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  taxId?: string;
  status?: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
}

/**
 * Modern Classic Style Invoice Component
 * 
 * A refined, contemporary invoice design with clean typography,
 * subtle gradients, and professional layout. Optimized for both
 * screen display and PDF generation.
 */
export function ClassicStyleInvoice({
  invoiceNumber,
  clientName,
  clientEmail,
  clientAddress,
  issueDate,
  dueDate,
  lineItems,
  subtotal,
  discountAmount,
  taxAmount,
  taxRate = 0,
  total,
  notes,
  paymentTerms,
  companyName,
  companyAddress,
  companyEmail,
  companyPhone,
  taxId,
  status = "draft",
  logoUrl,
  primaryColor = "#18181b",
  accentColor = "#5f6fff",
}: ClassicStyleInvoiceProps) {
  
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' };
      case 'overdue':
        return { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' };
      case 'sent':
      case 'pending':
        return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' };
      default:
        return { bg: 'bg-zinc-100', text: 'text-zinc-600', dot: 'bg-zinc-400' };
    }
  };

  const statusStyles = getStatusStyles(status);

  return (
    <div className="bg-white font-['Inter',system-ui,sans-serif] text-zinc-900 antialiased">
      {/* Header Section */}
      <div className="px-10 pt-10 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          {/* Company Info */}
          <div className="flex-1">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Company Logo" 
                className="h-10 w-auto object-contain mb-4"
              />
            ) : (
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xl font-semibold tracking-tight text-zinc-900">
                  {companyName || 'Your Company'}
                </span>
              </div>
            )}
            {companyName && logoUrl && (
              <p className="text-lg font-semibold text-zinc-900 mb-1">{companyName}</p>
            )}
            {companyAddress && (
              <p className="text-sm text-zinc-500 whitespace-pre-line leading-relaxed">{companyAddress}</p>
            )}
            {companyEmail && (
              <p className="text-sm text-zinc-500 mt-1">{companyEmail}</p>
            )}
            {companyPhone && (
              <p className="text-sm text-zinc-500">{companyPhone}</p>
            )}
            {taxId && (
              <p className="text-xs text-zinc-400 mt-2 font-medium tracking-wide">
                TAX ID: {taxId}
              </p>
            )}
          </div>

          {/* Invoice Title & Number */}
          <div className="text-right">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-1">
              Invoice
            </h1>
            <p className="text-lg font-mono font-medium text-zinc-500 tracking-tight">
              {invoiceNumber}
            </p>
            <div className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mt-3",
              statusStyles.bg,
              statusStyles.text
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", statusStyles.dot)} />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-10 h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200" />

      {/* Bill To & Dates Section */}
      <div className="px-10 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Bill To */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-2">
              Bill To
            </p>
            <p className="text-lg font-semibold text-zinc-900">{clientName}</p>
            {clientAddress && (
              <p className="text-sm text-zinc-500 whitespace-pre-line leading-relaxed mt-1">{clientAddress}</p>
            )}
            {clientEmail && (
              <p className="text-sm text-zinc-500 mt-1">{clientEmail}</p>
            )}
          </div>

          {/* Dates */}
          <div className="sm:text-right">
            <div className="inline-grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <span className="text-zinc-400 font-medium">Issue Date</span>
              <span className="text-zinc-900 font-medium font-mono">
                <DateDisplay date={issueDate} format="short" />
              </span>
              <span className="text-zinc-400 font-medium">Due Date</span>
              <span className="text-zinc-900 font-medium font-mono">
                <DateDisplay date={dueDate} format="short" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="px-10 pb-6">
        <div className="rounded-xl border border-zinc-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-zinc-50 border-b border-zinc-200">
            <div className="grid grid-cols-12 gap-4 px-5 py-3">
              <div className="col-span-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                Description
              </div>
              <div className="col-span-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 text-right">
                Qty
              </div>
              <div className="col-span-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 text-right">
                Rate
              </div>
              <div className="col-span-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 text-right">
                Amount
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-zinc-100">
            {lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-zinc-50/50 transition-colors">
                <div className="col-span-6 text-sm text-zinc-900">
                  {item.description}
                </div>
                <div className="col-span-2 text-sm text-zinc-600 text-right font-mono">
                  {item.quantity}
                </div>
                <div className="col-span-2 text-sm text-zinc-600 text-right font-mono">
                  <Currency amount={item.rate} />
                </div>
                <div className="col-span-2 text-sm text-zinc-900 text-right font-mono font-medium">
                  <Currency amount={item.quantity * item.rate} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Totals Section */}
      <div className="px-10 pb-8">
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between items-center py-2 text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="text-zinc-900 font-mono font-medium">
                <Currency amount={subtotal} />
              </span>
            </div>
            
            {discountAmount > 0 && (
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-emerald-600">Discount</span>
                <span className="text-emerald-600 font-mono font-medium">
                  -<Currency amount={discountAmount} />
                </span>
              </div>
            )}
            
            {taxAmount > 0 && (
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-zinc-500">Tax {taxRate > 0 && `(${taxRate}%)`}</span>
                <span className="text-zinc-900 font-mono font-medium">
                  <Currency amount={taxAmount} />
                </span>
              </div>
            )}
            
            <div className="border-t border-zinc-200 pt-3 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-zinc-900">Total</span>
                <span 
                  className="text-2xl font-bold font-mono"
                  style={{ color: accentColor }}
                >
                  <Currency amount={total} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Payment Terms */}
      {(notes || paymentTerms) && (
        <>
          <div className="mx-10 h-px bg-zinc-200" />
          <div className="px-10 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {notes && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-2">
                  Notes
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                  {notes}
                </p>
              </div>
            )}
            {paymentTerms && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-2">
                  Payment Terms
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {paymentTerms}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <div className="px-10 py-6 bg-zinc-50 border-t border-zinc-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
          <p>Thank you for your business</p>
          <p className="font-mono">Generated by SleekInvoices</p>
        </div>
      </div>
    </div>
  );
}
