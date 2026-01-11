import { formatCurrency, formatDate, formatDateShort } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { format as formatDateFns } from 'date-fns';

/**
 * Currency component - renders monetary values with SUSE Mono font
 * Automatically applies font-numeric class for consistent number display
 * @param bold - Use bold weight (700) for emphasis
 */
export function Currency({
  amount,
  currency = 'USD',
  className,
  bold = false,
}: {
  amount: number | string;
  currency?: string;
  className?: string;
  bold?: boolean;
}) {
  return (
    <span className={cn(bold ? "font-numeric-bold" : "font-numeric", className)}>
      {formatCurrency(amount, currency)}
    </span>
  );
}

/**
 * Date display component - renders dates with monospace font
 * Supports template format strings and legacy short/long formats
 */
const FORMAT_MAP: Record<string, string> = {
  // Template format strings
  'MM/DD/YYYY': 'MM/dd/yyyy',
  'DD/MM/YYYY': 'dd/MM/yyyy',
  'YYYY-MM-DD': 'yyyy-MM-dd',
  'MMM DD, YYYY': 'MMM dd, yyyy',
  // Legacy formats
  'short': 'MM/dd/yyyy',
  'medium': 'MMM dd, yyyy',
  'long': 'MMMM dd, yyyy',
};

export function DateDisplay({
  date,
  format = 'MMM DD, YYYY',
  className,
}: {
  date: Date | string;
  format?: string;
  className?: string;
}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formatString = FORMAT_MAP[format] || FORMAT_MAP['MMM DD, YYYY'];
  const formatted = formatDateFns(dateObj, formatString);
  return <span className={cn("font-numeric", className)}>{formatted}</span>;
}

/**
 * Invoice number component - renders invoice numbers with SUSE Mono font
 * Use for invoice numbers, estimate numbers, receipt numbers, etc.
 * Uses bold weight by default for prominence
 * @param bold - Use bold weight (default: true)
 */
export function InvoiceNumber({
  value,
  className,
  bold = true,
}: {
  value: string;
  className?: string;
  bold?: boolean;
}) {
  return <span className={cn(bold ? "font-numeric-bold" : "font-numeric", className)}>{value}</span>;
}

/**
 * Generic numeric component - renders any number with SUSE Mono font
 * Supports optional decimal places and bold weight
 * @param bold - Use bold weight (700) for emphasis
 */
export function Numeric({
  value,
  decimals,
  className,
  bold = false,
}: {
  value: number | string;
  decimals?: number;
  className?: string;
  bold?: boolean;
}) {
  const formatted =
    typeof value === 'number' && decimals !== undefined
      ? value.toFixed(decimals)
      : String(value);
  return <span className={cn(bold ? "font-numeric-bold" : "font-numeric", className)}>{formatted}</span>;
}
