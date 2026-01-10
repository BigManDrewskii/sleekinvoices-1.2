import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogBody } from "@/components/shared/DialogPatterns";
import { Button } from "@/components/ui/button";
import { Eye, X, Receipt, FileText } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { TemplateSelector } from "./TemplateSelector";
import { useState } from "react";
import { ReceiptStyleInvoice } from "./ReceiptStyleInvoice";
import { ClassicStyleInvoice } from "./ClassicStyleInvoice";
import { cn } from "@/lib/utils";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

interface InvoicePreviewModalProps {
  open: boolean;
  onClose: () => void;
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
  templateId?: number | null;
  onTemplateChange?: (templateId: number | null) => void;
}

type InvoiceStyle = 'classic' | 'receipt';

/**
 * Invoice Preview Modal with Style Support
 * 
 * Shows a full preview of the invoice with the selected style applied.
 * Users can switch between modern classic and receipt styles.
 */
export function InvoicePreviewModal({
  open,
  onClose,
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
  templateId,
  onTemplateChange,
}: InvoicePreviewModalProps) {
  const [previewTemplateId, setPreviewTemplateId] = useState<number | null>(templateId || null);
  const [invoiceStyle, setInvoiceStyle] = useState<InvoiceStyle>('receipt');
  
  // Fetch templates to get the selected template's styling
  const { data: templates } = trpc.templates.list.useQuery();
  
  // Get the template to use for preview (either selected or default)
  const template = previewTemplateId 
    ? templates?.find(t => t.id === previewTemplateId)
    : templates?.find(t => t.isDefault);

  // Apply template colors
  const primaryColor = template?.primaryColor || "#18181b";
  const accentColor = template?.accentColor || "#5f6fff";
  const logoUrl = template?.logoUrl;

  const handleTemplateChange = (newTemplateId: number | null) => {
    setPreviewTemplateId(newTemplateId);
    onTemplateChange?.(newTemplateId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Invoice Preview
          </DialogTitle>
          <DialogDescription>
            Review your invoice before saving. Switch between styles to find the perfect look.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          {/* Style Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex bg-muted/50 p-1 rounded-lg">
              <button
                onClick={() => setInvoiceStyle('receipt')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  invoiceStyle === 'receipt' 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Receipt className="h-4 w-4" />
                Receipt Style
              </button>
              <button
                onClick={() => setInvoiceStyle('classic')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  invoiceStyle === 'classic' 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <FileText className="h-4 w-4" />
                Classic Style
              </button>
            </div>
            
            {/* Template Selector - only show for classic style */}
            {invoiceStyle === 'classic' && (
              <div className="flex-1 w-full sm:w-auto">
                <TemplateSelector
                  value={previewTemplateId}
                  onChange={handleTemplateChange}
                />
              </div>
            )}
          </div>

          {/* Invoice Preview */}
          <div className="bg-zinc-100 rounded-xl p-4 sm:p-6">
            <div className="shadow-[0_0_1px_rgba(0,0,0,0.1),0_8px_40px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden">
              {invoiceStyle === 'receipt' ? (
                <ReceiptStyleInvoice
                  invoiceNumber={invoiceNumber}
                  clientName={clientName}
                  clientEmail={clientEmail}
                  clientAddress={clientAddress}
                  issueDate={issueDate}
                  dueDate={dueDate}
                  lineItems={lineItems}
                  subtotal={subtotal}
                  discountAmount={discountAmount}
                  taxAmount={taxAmount}
                  taxRate={taxRate}
                  total={total}
                  notes={notes}
                  paymentTerms={paymentTerms}
                  companyName={companyName}
                  companyAddress={companyAddress}
                  companyEmail={companyEmail}
                  companyPhone={companyPhone}
                  taxId={taxId}
                  status={status}
                  logoUrl={logoUrl || undefined}
                />
              ) : (
                <ClassicStyleInvoice
                  invoiceNumber={invoiceNumber}
                  clientName={clientName}
                  clientEmail={clientEmail}
                  clientAddress={clientAddress}
                  issueDate={issueDate}
                  dueDate={dueDate}
                  lineItems={lineItems}
                  subtotal={subtotal}
                  discountAmount={discountAmount}
                  taxAmount={taxAmount}
                  taxRate={taxRate}
                  total={total}
                  notes={notes}
                  paymentTerms={paymentTerms}
                  companyName={companyName}
                  companyAddress={companyAddress}
                  companyEmail={companyEmail}
                  companyPhone={companyPhone}
                  taxId={taxId}
                  status={status}
                  logoUrl={logoUrl || undefined}
                  primaryColor={primaryColor}
                  accentColor={accentColor}
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
