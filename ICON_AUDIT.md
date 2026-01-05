# Icon Usage Audit

## Summary
Found 48 files using Lucide React icons. Analysis below categorizes usage into Strategic (keep) vs Decorative (remove).

## ✅ Strategic Icons (Keep - Serve Clear Purpose)

### Navigation Icons
- **Navigation.tsx**: Menu, User, Settings, LogOut - **KEEP** (core navigation)
- **DashboardLayout.tsx**: LayoutDashboard, LogOut, PanelLeft, Users - **KEEP** (sidebar navigation)
- **LandingNavigation.tsx**: Menu - **KEEP** (mobile menu toggle)

### Action Buttons (Primary Actions)
- **CreateInvoice.tsx**: Save, Send, Eye (preview) - **KEEP** (primary invoice actions)
- **EditInvoice.tsx**: Save - **KEEP** (primary action)
- **Invoices.tsx**: Plus (new invoice), Search, Edit, Trash2, Send, Download - **KEEP** (table actions)
- **Clients.tsx**: Plus (new client), Search, Edit, Trash2 - **KEEP** (table actions)
- **Templates.tsx**: Plus, Eye, Edit, Trash2, Star (default) - **KEEP** (template management)
- **LineItemRow.tsx**: Trash2 - **KEEP** (delete line item)
- **ClientSelector.tsx**: Plus - **KEEP** (add new client inline)
- **TemplateEditor.tsx**: ArrowLeft (back), Save - **KEEP** (editor actions)

### Status Indicators
- **PaymentStatusBadge.tsx**: CheckCircle2, Circle, Clock - **KEEP** (payment status)
- **ViewInvoice.tsx**: Status icons for paid/unpaid/overdue - **KEEP** (invoice status)

### Loading States
- **Spinner.tsx**: Loader2Icon - **KEEP** (loading indicator)
- **AIChatBox.tsx**: Loader2 - **KEEP** (AI thinking state)

### Error/Warning States
- **ErrorBoundary.tsx**: AlertTriangle, RotateCcw - **KEEP** (error handling)
- **NotFound.tsx**: AlertCircle, Home - **KEEP** (404 page)
- **Dashboard.tsx**: AlertCircle - **KEEP** (overdue invoice warning)

### UI Component Icons (shadcn/ui - Keep All)
- Accordion: ChevronDownIcon
- Breadcrumb: ChevronRight, MoreHorizontal
- Calendar: ChevronLeft, ChevronRight
- Carousel: ArrowLeft, ArrowRight
- Checkbox: CheckIcon
- Command: SearchIcon
- Dialog: XIcon
- Dropdown: CheckIcon, ChevronRightIcon, CircleIcon
- Select: CheckIcon, ChevronDownIcon, ChevronUpIcon
- Sheet: XIcon
- Pagination: ChevronLeft, ChevronRight, MoreHorizontal
- **KEEP ALL** - These are functional UI components

## ❌ Decorative Icons (Remove - Purely Visual)

### Dashboard.tsx
- **DollarSign, FileText, TrendingUp** in stat cards - **REMOVE** (decorative, stats are clear without icons)
- **Plus** in "New Invoice" button - **REVIEW** (button text is clear, icon may be redundant)

### Analytics.tsx
- Multiple chart/graph icons in metric cards - **REMOVE** (decorative, metrics are self-explanatory)

### Settings.tsx
- **FileText, User, Building2, Mail** in form section headers - **REMOVE** (decorative headers)
- **Upload** in logo upload - **KEEP** (indicates upload action)

### Subscription.tsx
- **FileText** in plan cards - **REMOVE** (decorative)
- **Check** in feature lists - **REVIEW** (may be useful for scanability)
- **CreditCard, ExternalLink** - **KEEP** (action indicators)

### Templates.tsx
- **Sparkles** in "Initialize Default Templates" button - **REMOVE** (decorative, button text is clear)
- **Copy** in duplicate action - **KEEP** (clarifies copy action)
- **Palette** in template cards - **REMOVE** (decorative, color preview already shows this)

### UpgradePromoBanner.tsx
- **Sparkles, Zap** - **REMOVE** (purely decorative marketing)
- **Check** in feature list - **REVIEW** (may help scanability)

### UsageIndicator.tsx
- **AlertCircle, Sparkles** - **REVIEW** (may be useful for drawing attention to limits)

### AIChatBox.tsx
- **Sparkles** for AI assistant - **REVIEW** (helps identify AI vs user messages)
- **User** for user messages - **KEEP** (identifies message sender)
- **Send** button - **KEEP** (universal action icon)

### PortalAccessDialog.tsx
- **Key, Shield, ShieldOff** - **KEEP** (security-related, helps understanding)
- **Copy, ExternalLink, Mail, RefreshCw** - **KEEP** (action buttons)

### InvoicePreviewModal.tsx
- **Eye** - **KEEP** (preview action)
- **X** - **KEEP** (close action)
- **Palette** - **REMOVE** (decorative, template selector has text)

### TemplateSelector.tsx
- **Palette** - **REMOVE** (decorative, dropdown is clear)

### ReceiptUpload.tsx
- **Upload, X, FileText, ImageIcon** - **KEEP** (file upload states)

### RecurringInvoices.tsx
- **Calendar, RefreshCw, Pause, Play** - **KEEP** (recurring schedule indicators)

## Action Plan

### Phase 1: Remove Decorative Icons
1. Dashboard stat cards (DollarSign, FileText, TrendingUp)
2. Analytics metric cards
3. Settings form headers (FileText, User, Building2, Mail)
4. Subscription plan cards (FileText)
5. Templates "Sparkles" in init button
6. UpgradePromoBanner (Sparkles, Zap)
7. InvoicePreviewModal Palette icon
8. TemplateSelector Palette icon

### Phase 2: Review Ambiguous Cases
1. Dashboard "Plus" in New Invoice button
2. Subscription "Check" in feature lists
3. UpgradePromoBanner "Check" in features
4. UsageIndicator alert icons
5. AIChatBox "Sparkles"

### Phase 3: Ensure All Kept Icons Have Labels
- Audit all icon-only buttons
- Add aria-labels where text labels aren't visible
- Ensure navigation icons have visible text

## Metrics
- **Total files with icons**: 48
- **Strategic icons (keep)**: ~35 files
- **Decorative icons (remove)**: ~8-10 instances
- **Review needed**: ~5 instances

## Expected Impact
- Cleaner, less cluttered UI
- Faster visual scanning
- Reduced cognitive load
- More professional appearance
- Better accessibility
