import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Eye, X } from "lucide-react";

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
  issueDate: Date;
  dueDate: Date;
  lineItems: LineItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  notes?: string;
  paymentTerms?: string;
  companyName?: string;
  companyAddress?: string;
}

export function InvoicePreviewModal({
  open,
  onClose,
  invoiceNumber,
  clientName,
  clientEmail,
  issueDate,
  dueDate,
  lineItems,
  subtotal,
  discountAmount,
  taxAmount,
  total,
  notes,
  paymentTerms,
  companyName,
  companyAddress,
}: InvoicePreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Invoice Preview
          </DialogTitle>
          <DialogDescription>
            Review your invoice before saving
          </DialogDescription>
        </DialogHeader>

        {/* Invoice Preview */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">INVOICE</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{invoiceNumber}</p>
            </div>
            <div className="text-right">
              {companyName && (
                <p className="font-semibold text-gray-900 dark:text-white">{companyName}</p>
              )}
              {companyAddress && (
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{companyAddress}</p>
              )}
            </div>
          </div>

          {/* Bill To & Dates */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Bill To</p>
              <p className="font-semibold text-gray-900 dark:text-white">{clientName}</p>
              {clientEmail && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{clientEmail}</p>
              )}
            </div>
            <div className="text-right">
              <div className="mb-2">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Issue Date: </span>
                <span className="text-gray-900 dark:text-white">{formatDate(issueDate)}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Due Date: </span>
                <span className="text-gray-900 dark:text-white">{formatDate(dueDate)}</span>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Description</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Qty</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Rate</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 text-gray-900 dark:text-white">{item.description}</td>
                  <td className="py-3 text-right text-gray-900 dark:text-white">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-900 dark:text-white">{formatCurrency(item.rate)}</td>
                  <td className="py-3 text-right text-gray-900 dark:text-white">{formatCurrency(item.quantity * item.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Discount:</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              {taxAmount > 0 && (
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax:</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white border-t-2 border-gray-300 dark:border-gray-700 pt-2">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes & Payment Terms */}
          {(notes || paymentTerms) && (
            <div className="space-y-4">
              {notes && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Notes</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{notes}</p>
                </div>
              )}
              {paymentTerms && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Payment Terms</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{paymentTerms}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
