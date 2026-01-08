import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Eye, 
  Edit3, 
  Sparkles,
  User,
  FileText,
  DollarSign,
  Calendar,
  Link,
  Building2,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

// Variable definitions with icons and categories
const EMAIL_VARIABLES = [
  { key: "clientName", label: "Client Name", icon: User, category: "client", sampleValue: "John Smith" },
  { key: "invoiceNumber", label: "Invoice Number", icon: FileText, category: "invoice", sampleValue: "INV-2026-001" },
  { key: "invoiceAmount", label: "Invoice Amount", icon: DollarSign, category: "invoice", sampleValue: "$1,250.00" },
  { key: "dueDate", label: "Due Date", icon: Calendar, category: "invoice", sampleValue: "January 15, 2026" },
  { key: "daysOverdue", label: "Days Overdue", icon: Calendar, category: "invoice", sampleValue: "7" },
  { key: "invoiceUrl", label: "Invoice Link", icon: Link, category: "invoice", sampleValue: "https://pay.sleekinvoices.com/inv/abc123" },
  { key: "companyName", label: "Your Company", icon: Building2, category: "company", sampleValue: "Acme Inc." },
];

// Pre-built email templates
const EMAIL_TEMPLATES = {
  invoice_sent: {
    id: "invoice_sent",
    name: "Invoice Sent",
    description: "Send when a new invoice is created",
    icon: "📤",
    subject: "Invoice {{invoiceNumber}} from {{companyName}}",
    body: `Hi {{clientName}},

Thank you for your business! Please find your invoice details below.

Invoice: {{invoiceNumber}}
Amount: {{invoiceAmount}}
Due Date: {{dueDate}}

You can view and pay your invoice here:
{{invoiceUrl}}

If you have any questions, please don't hesitate to reach out.

Best regards,
{{companyName}}`
  },
  friendly_reminder: {
    id: "friendly_reminder",
    name: "Friendly Reminder",
    description: "Gentle reminder for slightly overdue invoices",
    icon: "👋",
    subject: "Friendly Reminder: Invoice {{invoiceNumber}}",
    body: `Hi {{clientName}},

Hope you're doing well! Just a quick reminder that invoice {{invoiceNumber}} for {{invoiceAmount}} was due on {{dueDate}} and is now {{daysOverdue}} days overdue.

I know things can get busy, so no worries if it slipped through the cracks. You can view and pay the invoice here:
{{invoiceUrl}}

Let me know if you have any questions!

Best,
{{companyName}}`
  },
  professional_notice: {
    id: "professional_notice",
    name: "Professional Notice",
    description: "Formal reminder for corporate clients",
    icon: "📋",
    subject: "Payment Reminder: Invoice {{invoiceNumber}}",
    body: `Dear {{clientName}},

This is a reminder regarding invoice {{invoiceNumber}} in the amount of {{invoiceAmount}}, which was due on {{dueDate}}.

As of today, this invoice is {{daysOverdue}} days past due. We kindly request that you process this payment at your earliest convenience.

You may view the invoice and submit payment using the following link:
{{invoiceUrl}}

If you have already sent payment, please disregard this notice.

Thank you for your prompt attention to this matter.

Sincerely,
{{companyName}}`
  },
  urgent_notice: {
    id: "urgent_notice",
    name: "Urgent Notice",
    description: "Firm tone for significantly overdue payments",
    icon: "⚠️",
    subject: "URGENT: Payment Required - Invoice {{invoiceNumber}}",
    body: `Dear {{clientName}},

URGENT: Final Payment Notice

Despite previous reminders, invoice {{invoiceNumber}} for {{invoiceAmount}} remains unpaid. This invoice was due on {{dueDate}} and is now {{daysOverdue}} days overdue.

Immediate payment is required to avoid any disruption to services.

Please submit payment immediately using this link:
{{invoiceUrl}}

If you are experiencing difficulties, please contact us immediately to discuss payment arrangements.

{{companyName}}`
  },
  thank_you: {
    id: "thank_you",
    name: "Thank You",
    description: "Thank client after payment received",
    icon: "🙏",
    subject: "Thank You for Your Payment - Invoice {{invoiceNumber}}",
    body: `Hi {{clientName}},

Thank you for your payment of {{invoiceAmount}} for invoice {{invoiceNumber}}. We've received it and your account is now up to date.

We truly appreciate your business and look forward to working with you again!

Best regards,
{{companyName}}`
  },
  custom: {
    id: "custom",
    name: "Custom Template",
    description: "Start from scratch",
    icon: "✏️",
    subject: "",
    body: ""
  }
};

interface EmailTemplateEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

export function EmailTemplateEditor({
  value,
  onChange,
  disabled,
  label,
  description,
  className,
}: EmailTemplateEditorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("custom");
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  // Parse the template to highlight variables
  const highlightedContent = useMemo(() => {
    if (!value) return "";
    
    let html = value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Highlight valid variables
    const validKeys = EMAIL_VARIABLES.map(v => v.key);
    html = html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const isValid = validKeys.includes(key);
      if (isValid) {
        return `<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-primary/20 text-primary text-sm font-medium">${match}</span>`;
      }
      return `<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-destructive/20 text-destructive text-sm font-medium">${match}</span>`;
    });
    
    html = html.replace(/\n/g, "<br>");
    return html;
  }, [value]);

  // Generate preview with sample values
  const previewContent = useMemo(() => {
    if (!value) return "<p class='text-muted-foreground italic'>No content yet. Select a template or start typing.</p>";
    
    let preview = value;
    
    for (const variable of EMAIL_VARIABLES) {
      const regex = new RegExp(`\\{\\{${variable.key}\\}\\}`, "g");
      preview = preview.replace(regex, `<span class="font-semibold text-primary">${variable.sampleValue}</span>`);
    }
    
    preview = preview
      .replace(/&/g, "&amp;")
      .replace(/<(?!span|\/span|br)/g, "&lt;")
      .replace(/(?<!span)>/g, "&gt;")
      .replace(/\n/g, "<br>");
    
    return preview;
  }, [value]);

  // Insert variable at cursor position
  const insertVariable = (variableKey: string) => {
    if (disabled) return;
    
    const textarea = document.getElementById("email-template-textarea") as HTMLTextAreaElement;
    if (!textarea) {
      onChange(value + `{{${variableKey}}}`);
      return;
    }
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = `{{${variableKey}}}`;
    
    const newValue = value.substring(0, start) + text + value.substring(end);
    onChange(newValue);
    
    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  // Load a preset template
  const loadTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = EMAIL_TEMPLATES[templateId as keyof typeof EMAIL_TEMPLATES];
    if (template && template.body) {
      onChange(template.body);
    }
  };

  // Reset to empty
  const resetTemplate = () => {
    setSelectedTemplate("custom");
    onChange("");
  };

  // Group variables by category
  const variablesByCategory = useMemo(() => {
    const grouped: Record<string, typeof EMAIL_VARIABLES> = {};
    for (const variable of EMAIL_VARIABLES) {
      if (!grouped[variable.category]) {
        grouped[variable.category] = [];
      }
      grouped[variable.category].push(variable);
    }
    return grouped;
  }, []);

  const categoryLabels: Record<string, string> = {
    client: "Client",
    invoice: "Invoice",
    company: "Company"
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div className="space-y-1">
          <Label className="text-base font-semibold">{label}</Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Template Selector */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Start with a template:</Label>
        </div>
        <Select value={selectedTemplate} onValueChange={loadTemplate} disabled={disabled}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Choose a template..." />
          </SelectTrigger>
          <SelectContent>
            {Object.values(EMAIL_TEMPLATES).map((template) => (
              <SelectItem key={template.id} value={template.id}>
                <div className="flex items-center gap-2">
                  <span>{template.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{template.name}</span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTemplate}
            disabled={disabled}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Variable Chips */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Click to insert variables:</span>
          </div>
          <div className="space-y-3">
            {Object.entries(variablesByCategory).map(([category, variables]) => (
              <div key={category} className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide w-16">
                  {categoryLabels[category]}
                </span>
                {variables.map((variable) => {
                  const Icon = variable.icon;
                  return (
                    <button
                      key={variable.key}
                      type="button"
                      onClick={() => insertVariable(variable.key)}
                      disabled={disabled}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm",
                        "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
                        "transition-all duration-200 hover:scale-105",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                        "border border-transparent hover:border-primary/30"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {variable.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editor/Preview Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[300px]">
          <TabsTrigger value="edit" className="gap-2">
            <Edit3 className="h-4 w-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-4">
          <div className="relative">
            <textarea
              id="email-template-textarea"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              rows={12}
              placeholder="Write your email template here... Use the variable buttons above to insert dynamic content."
              className={cn(
                "w-full p-4 rounded-lg border border-input bg-background resize-none",
                "font-sans text-sm leading-relaxed",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "placeholder:text-muted-foreground"
              )}
            />
            {value && (
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {value.length} characters
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card className="bg-card">
            <CardContent className="p-0">
              {/* Email Header Preview */}
              <div className="border-b border-border p-4 bg-muted/30 rounded-t-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Acme Inc.</p>
                    <p className="text-xs text-muted-foreground">to: john.smith@example.com</p>
                  </div>
                </div>
                <p className="text-sm font-medium">
                  Subject: {selectedTemplate !== "custom" && EMAIL_TEMPLATES[selectedTemplate as keyof typeof EMAIL_TEMPLATES]?.subject 
                    ? EMAIL_TEMPLATES[selectedTemplate as keyof typeof EMAIL_TEMPLATES].subject.replace(/\{\{(\w+)\}\}/g, (_, key) => {
                        const variable = EMAIL_VARIABLES.find(v => v.key === key);
                        return variable?.sampleValue || key;
                      })
                    : "Your Invoice"}
                </p>
              </div>
              
              {/* Email Body Preview */}
              <div 
                className="p-6 min-h-[250px] text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: previewContent }}
              />
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This preview shows how your email will look with sample data
          </p>
        </TabsContent>
      </Tabs>

      {/* Help Text */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
        <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-muted-foreground">
          <strong className="text-foreground">Tip:</strong> Variables like{" "}
          <code className="px-1 py-0.5 rounded bg-primary/10 text-primary text-xs">{"{{clientName}}"}</code>{" "}
          will be automatically replaced with real data when the email is sent.
        </p>
      </div>
    </div>
  );
}
