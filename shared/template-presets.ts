/**
 * Pre-designed invoice template presets
 * These templates provide users with professional starting points for their invoices
 */

export interface TemplatePreset {
  name: string;
  templateType: "modern" | "classic" | "minimal" | "bold" | "professional" | "creative";
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  fontSize: number;
  logoPosition: "left" | "center" | "right";
  logoWidth: number;
  headerLayout: "standard" | "centered" | "split";
  footerLayout: "simple" | "detailed" | "minimal";
  showCompanyAddress: boolean;
  showPaymentTerms: boolean;
  showTaxField: boolean;
  showDiscountField: boolean;
  showNotesField: boolean;
  footerText: string;
  language: string;
  dateFormat: string;
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    name: "Modern",
    templateType: "modern",
    description: "Clean and contemporary design with vibrant colors and modern typography. Perfect for tech companies and creative agencies.",
    primaryColor: "#5f6fff",
    secondaryColor: "#252f33",
    accentColor: "#10b981",
    headingFont: "Inter",
    bodyFont: "Inter",
    fontSize: 14,
    logoPosition: "left",
    logoWidth: 150,
    headerLayout: "standard",
    footerLayout: "simple",
    showCompanyAddress: true,
    showPaymentTerms: true,
    showTaxField: true,
    showDiscountField: true,
    showNotesField: true,
    footerText: "Thank you for your business!",
    language: "en",
    dateFormat: "MM/DD/YYYY",
  },
  {
    name: "Classic",
    templateType: "classic",
    description: "Traditional and professional design with serif fonts and conservative colors. Ideal for law firms, accounting, and corporate businesses.",
    primaryColor: "#1e3a8a",
    secondaryColor: "#475569",
    accentColor: "#dc2626",
    headingFont: "Georgia",
    bodyFont: "Georgia",
    fontSize: 13,
    logoPosition: "center",
    logoWidth: 180,
    headerLayout: "centered",
    footerLayout: "detailed",
    showCompanyAddress: true,
    showPaymentTerms: true,
    showTaxField: true,
    showDiscountField: true,
    showNotesField: true,
    footerText: "We appreciate your prompt payment. Please remit payment within the specified terms.",
    language: "en",
    dateFormat: "DD/MM/YYYY",
  },
  {
    name: "Minimal",
    templateType: "minimal",
    description: "Ultra-clean design with lots of white space and subtle accents. Great for designers, consultants, and minimalist brands.",
    primaryColor: "#18181b",
    secondaryColor: "#71717a",
    accentColor: "#3b82f6",
    headingFont: "Helvetica",
    bodyFont: "Helvetica",
    fontSize: 14,
    logoPosition: "left",
    logoWidth: 120,
    headerLayout: "standard",
    footerLayout: "minimal",
    showCompanyAddress: true,
    showPaymentTerms: false,
    showTaxField: true,
    showDiscountField: false,
    showNotesField: true,
    footerText: "",
    language: "en",
    dateFormat: "YYYY-MM-DD",
  },
  {
    name: "Bold",
    templateType: "bold",
    description: "Eye-catching design with strong colors and large typography. Perfect for making a statement and standing out.",
    primaryColor: "#dc2626",
    secondaryColor: "#1f2937",
    accentColor: "#f59e0b",
    headingFont: "Arial Black",
    bodyFont: "Arial",
    fontSize: 15,
    logoPosition: "right",
    logoWidth: 140,
    headerLayout: "split",
    footerLayout: "simple",
    showCompanyAddress: true,
    showPaymentTerms: true,
    showTaxField: true,
    showDiscountField: true,
    showNotesField: true,
    footerText: "Questions? Contact us anytime!",
    language: "en",
    dateFormat: "MM/DD/YYYY",
  },
  {
    name: "Professional",
    templateType: "professional",
    description: "Balanced and refined design that works for any industry. Versatile template with professional aesthetics.",
    primaryColor: "#0f766e",
    secondaryColor: "#334155",
    accentColor: "#0891b2",
    headingFont: "Roboto",
    bodyFont: "Roboto",
    fontSize: 14,
    logoPosition: "left",
    logoWidth: 160,
    headerLayout: "standard",
    footerLayout: "detailed",
    showCompanyAddress: true,
    showPaymentTerms: true,
    showTaxField: true,
    showDiscountField: true,
    showNotesField: true,
    footerText: "Thank you for choosing our services. We look forward to working with you again.",
    language: "en",
    dateFormat: "MM/DD/YYYY",
  },
  {
    name: "Creative",
    templateType: "creative",
    description: "Unique and artistic design with playful colors and creative layouts. Ideal for creative professionals and artistic businesses.",
    primaryColor: "#7c3aed",
    secondaryColor: "#4c1d95",
    accentColor: "#ec4899",
    headingFont: "Montserrat",
    bodyFont: "Open Sans",
    fontSize: 14,
    logoPosition: "center",
    logoWidth: 170,
    headerLayout: "centered",
    footerLayout: "simple",
    showCompanyAddress: true,
    showPaymentTerms: true,
    showTaxField: true,
    showDiscountField: true,
    showNotesField: true,
    footerText: "Let's create something amazing together!",
    language: "en",
    dateFormat: "MMM DD, YYYY",
  },
];

/**
 * Get a template preset by type
 */
export function getTemplatePreset(templateType: string): TemplatePreset | undefined {
  return TEMPLATE_PRESETS.find(preset => preset.templateType === templateType);
}

/**
 * Get all available template presets
 */
export function getAllTemplatePresets(): TemplatePreset[] {
  return TEMPLATE_PRESETS;
}
