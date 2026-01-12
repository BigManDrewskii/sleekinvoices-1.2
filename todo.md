# Invoice Generator - Implementation TODO

## 🚀 LEAN POWER PILLAR: Zero-Friction Invoicing

**Goal:** Create and send a professional invoice in under 60 seconds through intelligent simplicity + AI.

---

## 📋 PHASE 1: UI Streamlining (Ruthless Simplicity)

### 1.1 Dashboard Quick Actions
- [ ] Add prominent "Magic Invoice" button with sparkle icon
- [ ] Create quick action cards for most common tasks
- [ ] Streamline recent invoices display (show only essential info)
- [ ] Add keyboard shortcut hints (Cmd+N for new invoice)

### 1.2 Invoice Creation Flow Optimization
- [ ] Create MagicInvoiceInput component (single text field for AI compose)
- [ ] Add smart defaults for all form fields
- [ ] Implement one-click client selection with recent clients first
- [ ] Add inline client creation (no modal interruption)
- [ ] Simplify line item entry with natural language support
- [ ] Auto-calculate and display totals in real-time (already done)
- [ ] Add "Quick Send" button that skips preview for repeat clients

### 1.3 Progressive Disclosure
- [ ] Collapse advanced options by default (tax, discount, notes)
- [ ] Show "Advanced Options" toggle for power users
- [ ] Remember user preferences for collapsed/expanded state
- [ ] Simplify template selection (show preview on hover)

### 1.4 Navigation & Accessibility
- [x] Implement Command Palette (Cmd+K) for quick navigation
- [x] Add keyboard shortcuts for common actions
- [x] Improve focus states and tab navigation
- [ ] Add breadcrumb navigation for deep pages

---

## ✨ PHASE 2: Delight Layer (Micro-interactions & Polish)

### 2.1 Celebration Moments
- [x] Add confetti animation when invoice is sent
- [x] Add success animation when payment is received
- [ ] Create milestone celebrations (first invoice, $1000 earned, etc.)
- [ ] Add subtle sound effects (optional, user preference)

### 2.2 Smart Notifications
- [ ] "Client opened your invoice" with view count
- [ ] "Invoice is X days overdue - send reminder?" prompt
- [ ] Payment prediction based on client history
- [ ] Weekly summary notification

### 2.3 Empty States & Onboarding
- [x] Create empty state component structure with placeholder slots
- [x] **NOTE: User will provide mascot illustrations - leave image slots**
- [ ] Create first-time user onboarding flow
- [ ] Add contextual tips for new features
- [ ] Implement achievement badges system

### 2.4 Animation & Transitions
- [x] Add smooth page transitions (page-transition class)
- [x] Implement staggered list animations (already partially done)
- [x] Add hover effects on interactive elements (card-glow, hover-lift, etc.)
- [x] Create loading shimmer effects (already done)

### 2.5 Visual Polish
- [x] Audit and improve color contrast
- [x] Add subtle gradients and depth (gradient-text, card-glow)
- [x] Improve card shadows and borders (card-elevated, glass)
- [x] Ensure consistent spacing throughout

---

## 🤖 PHASE 3: AI-Powered Smart Compose

### 3.1 Backend: Invoice Extraction API
- [x] Create `ai.smartCompose` tRPC procedure
- [x] Implement LLM prompt for invoice data extraction
- [x] Add client name fuzzy matching logic
- [x] Create structured JSON output with validation
- [x] Add fallback to manual form if extraction fails
- [x] Implement credit-based rate limiting for AI calls

### 3.2 Frontend: Magic Input Component
- [x] Create MagicInput with expandable text area
- [x] Add real-time processing indicator (subtle spinner)
- [x] Navigate to CreateInvoice with pre-filled data
- [x] Implement error handling for failed extractions
- [x] Add example prompts/placeholders
- [x] Show remaining AI credits in UI

### 3.3 Smart Suggestions
- [ ] Implement client prediction based on recent activity
- [ ] Add line item suggestions from history
- [ ] Create "Similar to Invoice #X" detection
- [ ] Suggest due dates based on client payment patterns

### 3.4 AI Credit System (Monetization)
- [x] Create `aiCredits` and `aiUsageLogs` tables in database
- [x] Track credits per user per month
- [x] Free tier: 5 AI credits/month
- [x] Pro tier: 50 AI credits/month
- [x] Each Smart Compose = 1 credit
- [x] Show remaining credits in UI
- [x] Graceful degradation when credits exhausted
- [ ] Consider credit purchase option for future

### 3.5 AI Infrastructure
- [x] Use Manus Forge API with Gemini 2.5 Flash
- [x] Implement structured JSON schema for reliable parsing
- [x] Add comprehensive usage logging for cost tracking
- [x] Monitor API costs via aiUsageLogs table

---

## 🧪 PHASE 4: Testing & Quality Assurance

### 4.1 Unit Tests
- [ ] Test Smart Compose extraction logic
- [ ] Test client fuzzy matching
- [ ] Test calculation precision
- [ ] Test keyboard shortcuts

### 4.2 Integration Tests
- [ ] Test full invoice creation flow
- [ ] Test AI fallback scenarios
- [ ] Test payment processing integration

### 4.3 User Experience Testing
- [ ] Measure time-to-first-invoice
- [ ] Test on mobile devices
- [ ] Verify accessibility compliance
- [ ] Performance audit (Lighthouse)

---

## 📊 SUCCESS METRICS

| Metric | Current | Target |
|--------|---------|--------|
| Time to create invoice | ~3 min | <60 sec |
| Smart Compose adoption | 0% | 50% |
| User satisfaction | Unknown | NPS 50+ |
| Mobile usability | Good | Excellent |

---

## 🔧 TECHNICAL NOTES

### AI Model Strategy
- Primary: Free OpenRouter models (MiMo-V2-Flash, Gemma 3)
- Fallback: Gemini 2.5 Flash ($0.50/M input, $3/M output)
- Cost per 1000 extractions: ~$0-1
- Already have OpenRouter integration via existing LLM helper

### Dependencies to Add
- canvas-confetti (celebrations) - tiny, MIT license
- cmdk (command palette) - lightweight, MIT license
- Note: framer-motion may already be available via tw-animate-css

### Files to Create/Modify
- `client/src/components/MagicInvoiceInput.tsx` (new)
- `client/src/components/CommandPalette.tsx` (new)
- `client/src/components/Confetti.tsx` (new)
- `client/src/components/EmptyState.tsx` (new - with image slot for mascot)
- `server/routers.ts` (add createFromText procedure)
- `client/src/pages/Dashboard.tsx` (add quick actions)
- `client/src/pages/CreateInvoice.tsx` (integrate magic input)

---

## ✅ COMPLETED PHASES (Previous Work)

### Phase 1: Clients Management (Complete)
- [x] Create shared components (ClientDialog, DeleteConfirmDialog)
- [x] Implement Clients.tsx with table view and search
- [x] Implement create client flow
- [x] Implement edit client flow
- [x] Implement delete client flow with confirmation

### Phase 2: Invoices List (Complete)
- [x] Build InvoiceTable component
- [x] Implement status filter dropdown
- [x] Add search by invoice number/client

### UI Enhancement: Loading Skeletons (Complete)
- [x] Create base skeleton component with shimmer animation
- [x] Create TableSkeleton, CardSkeleton
- [x] Update all pages with skeleton loading states

### UI Enhancement: Button System & Modal Redesign (Complete)
- [x] Update button.tsx with new variants
- [x] Update dialog.tsx with improved animations
- [x] Update all modal components

### UI Enhancement: Advanced Loading Optimization (Complete)
- [x] Configure QueryClient with staleTime and gcTime
- [x] Add stagger-fade-in animation for lists

---

## 📝 IMPLEMENTATION LOG

*Track progress here as tasks are completed*

| Date | Task | Status |
|------|------|--------|
| 2026-01-07 | Command Palette (Cmd+K) | ✅ Complete |
| 2026-01-07 | Confetti on invoice sent | ✅ Complete |
| 2026-01-07 | Empty State components | ✅ Complete |
| 2026-01-07 | AI Smart Compose backend | ✅ Complete |
| 2026-01-07 | AI Credit System | ✅ Complete |
| 2026-01-07 | Magic Input component | ✅ Complete |
| 2026-01-07 | CreateInvoice URL pre-fill | ✅ Complete |
| 2026-01-07 | Page transition animations | ✅ Complete |
| 2026-01-07 | Delight layer CSS animations | ✅ Complete |
| 2026-01-07 | AI Assistant slide-out panel | ✅ Complete |
| 2026-01-07 | AI Assistant tests (9 passing) | ✅ Complete |


---

## 🧠 PHASE 4: Enhanced AI Experience (Industry Best Practices)

### 4.1 AI Assistant Interface
- [x] Create dedicated AI Assistant panel (slide-out drawer)
- [x] Implement multi-turn conversational context
- [x] Add streaming responses with typing effect
- [x] Create conversation history persistence
- [x] Add "Clear conversation" and "New chat" options
- [x] Implement context-aware suggestions based on current page

### 4.2 Task-Oriented AI Controls (Beyond Chat)
- [x] Add quick action buttons for common AI tasks
- [ ] Create visual invoice builder with AI refinement
- [ ] Implement slider controls for adjusting AI suggestions
- [ ] Add preset templates for different invoice types
- [ ] Create "AI Suggestions" sidebar for invoice editing

### 4.3 Smart Input Enhancements
- [ ] Add voice input option for invoice creation
- [ ] Implement auto-complete with AI predictions
- [ ] Create query builder for complex invoice requests
- [ ] Add drag-and-drop file parsing (receipts, contracts)
- [ ] Implement natural language date parsing improvements

### 4.4 Output Visualization & Refinement
- [ ] Show real-time invoice preview during AI generation
- [ ] Add "Refine" button for iterative improvements
- [ ] Create comparison view (before/after AI changes)
- [ ] Implement inline editing of AI suggestions
- [ ] Add confidence indicators for extracted data

### 4.5 Proactive AI Features
- [ ] Implement "Invoice Insights" dashboard widget
- [ ] Add payment prediction based on client history
- [ ] Create overdue invoice reminder suggestions
- [ ] Implement smart follow-up email drafts
- [ ] Add revenue forecasting based on patterns

### 4.6 AI Personality & Branding
- [ ] Define consistent AI assistant personality (friendly, professional)
- [ ] Add contextual help tips throughout the app
- [ ] Create onboarding AI tutorial for new users
- [ ] Implement error messages with helpful suggestions

---

## 💻 PHASE 5: Desktop & Tablet Optimization

### 5.1 Desktop Layout Enhancements
- [x] Optimize sidebar width and collapsibility (CSS classes added)
- [ ] Implement resizable panels for power users
- [x] Add multi-column layouts for wide screens (dashboard-grid, stats-grid)
- [x] Create keyboard-first navigation patterns (focus-ring-enhanced)
- [ ] Implement drag-and-drop for invoice items

### 5.2 Tablet-Specific Optimizations
- [x] Optimize touch targets (minimum 44px) - touch-target class
- [ ] Implement swipe gestures for common actions
- [x] Create tablet-optimized invoice preview (invoice-preview-layout)
- [x] Add split-view support for iPad (split-view-compact)
- [x] Optimize form layouts for touch input (card-actions-touch)

### 5.3 Responsive Breakpoints
- [x] Audit all pages for tablet breakpoints (768px-1024px)
- [x] Ensure proper spacing at all screen sizes (section-spacing, content-section)
- [x] Test navigation patterns on tablet devices (tablet-nav-scroll)
- [x] Optimize data tables for medium screens (table-responsive-tablet)
- [x] Add responsive images and icons

### 5.4 Mobile Strategy Note
- [ ] Document mobile app requirements for future development
- [ ] Create mobile-specific feature wishlist
- [ ] Plan API endpoints for mobile app consumption
- [ ] Design offline-first data sync strategy

---

## 🎯 Implementation Priority Order

### Immediate (This Session)
1. AI Assistant slide-out panel with streaming
2. Task-oriented quick action buttons
3. Desktop/tablet responsive audit

### Short-term
4. Voice input for invoice creation
5. Proactive AI insights widget
6. Tablet gesture support

### Medium-term
7. Full conversational AI with context
8. AI-powered email drafts
9. Revenue forecasting

---

## 📊 Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Time to create invoice | ~3 min | <60 sec |
| AI feature usage | New | 40% of users |
| User satisfaction | Unknown | >4.5/5 |
| Mobile/tablet usage | Unknown | Track separately |

<<<<<<< Updated upstream
=======
### Phase 5: Testing & Delivery
- [x] Write vitest tests for guided flow (11 tests passing)
- [x] Test all step transitions
- [x] Add entry point to navigation/dashboard
- [x] Save checkpoint and deliver


## UI Refinement - Manus.im Aesthetic
- [x] Refine Monthly Usage card - more compact and elegant
- [x] Improve Dashboard card styling with Manus.im aesthetic
- [x] Improve stats cards with gradient backgrounds and hover effects
- [x] Improve Recent Invoices card styling
- [x] Apply consistent elegant styling across components


## UI Consistency - Elegant Card Design
- [x] Apply elegant card styling to Invoices page
- [x] Apply elegant card styling to Clients page
- [x] Apply elegant card styling to Analytics page
- [x] Ensure consistent rounded-2xl, gradient backgrounds, and hover effects


## Navigation Redesign & Search Verification
- [x] Verify global search functionality works correctly
- [x] Redesign navigation bar with enhanced visual appeal (gradient background, backdrop blur, scroll shadow)
- [x] Optimize navigation for tablet viewports (768px-1023px) with horizontal nav and dropdowns
- [x] Optimize navigation for mobile viewports (< 768px) with hamburger menu
- [x] Improve navigation aesthetics and usability


## Invoice Creation UX Improvement
- [x] Replace separate Guided/New Invoice buttons with single "New Invoice" button
- [x] Create overlay/dialog with two choices: Smart Invoice Builder and Classic Form
- [x] Add explanations for each invoice creation method
- [x] Style Navigation "New" button with purple outline and darker fill for differentiation


## New Invoice Dialog & Button Refinement
- [x] Add AI option (Magic Invoice) to the New Invoice dialog with emerald accent
- [x] Restyle Navigation "New" button to follow design system (outline variant with primary color)


## Dashboard UI Refinement
- [x] Refine MagicInvoiceSection container with Manus.im inspired aesthetic (subtle glow on hover, refined gradients)


## Elegant Loader Implementation
- [x] Review UIverse loader design (fresh-panther-41)
- [x] Create reusable GearLoader component with size variants (sm, md, lg)
- [x] Integrate loader into app Suspense fallback
- [x] Add CSS animations (clockwise, counter-clockwise, slow rotation)
- [x] Test loader across different contexts


## Orb Component Fix
- [x] Fix orb rendering issues (gradient, sparkle icon, glass reflection, animated overlay)


## Integration Research
- [ ] Research payment processing solutions (Stripe alternatives, modern options)
- [ ] Research Whop and similar partnership/monetization platforms
- [ ] Identify strategic integrations for invoice app modernization
- [ ] Compile recommendations report


## Integration Research (Completed)
- [x] Research payment processing solutions (Paddle, LemonSqueezy, crypto payments)
- [x] Research partnership tools (Whop, PartnerStack, affiliate platforms)
- [x] Research accounting integrations (QuickBooks, Xero)
- [x] Research AI automation and e-signature integrations
- [x] Identify strategic integrations aligned with market preferences
- [x] Compile comprehensive recommendations report (see research/integration-recommendations.md)


## QuickBooks Integration

### Phase 1: Research & Architecture
- [x] Research QuickBooks Online API documentation
- [x] Study OAuth 2.0 authentication flow
- [x] Review Invoice and Customer entity structures
- [x] Design integration architecture (one-way sync: SleekInvoices → QuickBooks)

### Phase 2: Database Schema
- [x] Create quickbooksConnections table for OAuth tokens
- [x] Create quickbooksCustomerMapping table for client-customer mapping
- [x] Create quickbooksInvoiceMapping table for invoice mapping
- [x] Create quickbooksSyncLog table for audit trail
- [x] Run database migrations

### Phase 3: OAuth 2.0 Implementation
- [x] Install intuit-oauth package
- [x] Create type declarations for intuit-oauth
- [x] Implement OAuth client creation
- [x] Implement authorization URL generation
- [x] Implement token exchange
- [x] Implement token refresh
- [x] Implement connection status checking

### Phase 4: Customer Sync
- [x] Implement customer mapping lookup
- [x] Implement customer creation in QuickBooks
- [x] Implement customer update in QuickBooks
- [x] Implement sync all clients functionality
- [x] Implement client sync status checking

### Phase 5: Invoice Sync
- [x] Implement invoice mapping lookup
- [x] Implement invoice creation in QuickBooks
- [x] Implement invoice update in QuickBooks
- [x] Implement sync all invoices functionality
- [x] Implement invoice sync status checking
- [x] Implement sync history retrieval

### Phase 6: tRPC Router
- [x] Add getStatus procedure
- [x] Add getAuthUrl procedure
- [x] Add handleCallback procedure
- [x] Add disconnect procedure
- [x] Add syncClient procedure
- [x] Add syncAllClients procedure
- [x] Add syncInvoice procedure
- [x] Add syncAllInvoices procedure
- [x] Add getClientSyncStatus procedure
- [x] Add getInvoiceSyncStatus procedure
- [x] Add getSyncHistory procedure

### Phase 7: Frontend UI
- [x] Create QuickBooksSettings component
- [x] Add connection status display
- [x] Add connect/disconnect buttons
- [x] Add sync all clients button
- [x] Add sync all invoices button
- [x] Add sync history dialog
- [x] Create QuickBooksCallback page
- [x] Add route for OAuth callback
- [x] Integrate into Settings page

### Phase 8: Testing
- [x] Create comprehensive vitest tests
- [x] Test OAuth configuration check
- [x] Test OAuth client creation
- [x] Test authorization URL generation
- [x] Test API call error handling
- [x] Test customer mapping functions
- [x] Test invoice mapping functions
- [x] Test sync history retrieval
- [x] All 9 tests passing

### Phase 9: Delivery
- [x] Save checkpoint with QuickBooks integration
- [x] Request QuickBooks API credentials from user
- [x] Pass Intuit compliance questionnaire
- [x] Configure production credentials
- [x] Validate credentials with tests (5 tests passing)


## Legal Pages & QuickBooks Configuration

### Phase 1: Terms of Service Page
- [x] Create Terms of Service page component
- [x] Add route for /terms
- [x] Include standard SaaS terms content
- [x] Style consistently with landing page

### Phase 2: Privacy Policy Page
- [x] Create Privacy Policy page component
- [x] Add route for /privacy
- [x] Include GDPR-compliant privacy content
- [x] Cover QuickBooks data handling
- [x] Style consistently with landing page

### Phase 3: QuickBooks API Configuration
- [x] Configure QUICKBOOKS_CLIENT_ID secret
- [x] Configure QUICKBOOKS_CLIENT_SECRET secret
- [x] Configure QUICKBOOKS_REDIRECT_URI secret
- [x] Configure QUICKBOOKS_ENVIRONMENT secret (production)
- [x] Test OAuth flow with credentials validation

### Phase 4: Delivery
- [x] Save checkpoint with legal pages
- [x] Provide URLs for Intuit compliance form
- [x] Pass Intuit compliance review


## Legal Pages Design Refinement

### Phase 1: Design System Review
- [x] Review landing page header/footer design
- [x] Identify logo component and usage
- [x] Document color scheme and typography

### Phase 2: Page Refinement
- [x] Update Terms page to match landing page design
- [x] Update Privacy page to match landing page design
- [x] Use correct SleekInvoices logo component
- [x] Match header/footer styling with landing page

### Phase 3: Landing Page Integration
- [x] Add Terms link to landing page footer
- [x] Add Privacy link to landing page footer


## Bug Fixes - January 2026

### QuickBooks Redirect URI Fix
- [x] Check current QUICKBOOKS_REDIRECT_URI value (https://sleekinvoices.com/quickbooks/callback)
- [x] User added redirect URI to Intuit Developer Portal
- [x] OAuth flow working after fix

### Loading Spinner Standardization
- [x] Find all instances of old crescent-style spinner (13 pages)
- [x] Replace with new GearLoader cog animation component
- [x] Lower opacity to 70% on all full-page loading screens
- [x] Small inline button spinners kept as-is (appropriate for button states)


## QuickBooks Sync Enhancements

### Per-Invoice Sync Button
- [x] Add "Sync to QuickBooks" action to invoice Actions dropdown
- [x] Check if QuickBooks is connected before showing option
- [x] Show sync status indicator on invoice row (syncing spinner)
- [x] Handle sync errors gracefully with toast notifications

### Automatic Sync on Invoice Creation
- [x] Trigger QuickBooks sync when new invoice is created (status='sent')
- [x] Sync associated client first if not already synced (handled by syncInvoiceToQB)
- [x] Log sync activity to sync history (via quickbooksSyncLog table)
- [x] Handle errors without blocking invoice creation (fire-and-forget pattern)

### Automatic Sync on Invoice Send
- [x] Trigger QuickBooks sync when invoice is sent via email (draft→sent)
- [x] Log sync activity to sync history
- [x] Handle errors without blocking email sending

### Automatic Sync on Payment
- [x] Trigger QuickBooks sync when invoice is marked as paid
- [x] Update payment status in QuickBooks
- [x] Log sync activity to sync history
- [x] Handle errors gracefully (fire-and-forget pattern)

### Testing
- [x] Test per-invoice sync button functionality (12 tests)
- [x] Test automatic sync on invoice creation (3 tests)
- [x] Test automatic sync on payment (2 tests)
- [x] Test error handling (2 tests)
- [x] Test InvoiceActionsMenu integration (3 tests)
- [x] All 12 tests passing


## QuickBooks Advanced Enhancements

### Sync Status Indicators on Invoice List
- [x] Create QuickBooks sync status badge component (inline in Invoices.tsx)
- [x] Fetch sync status for invoices in list query (joined quickbooksInvoiceMapping)
- [x] Display sync indicator (icon/badge) on invoice rows (desktop and mobile)
- [x] Show last synced timestamp on hover/tooltip
- [x] Handle loading state for sync status (QB column only shows when connected)

### Two-Way Payment Sync
- [x] Research QuickBooks payment webhooks/polling options (using CDC polling)
- [x] Create endpoint to receive QuickBooks payment updates (pollPayments mutation)
- [x] Implement payment sync from QuickBooks to SleekInvoices (pollPaymentsFromQB)
- [x] Add periodic sync check for payment status (manual "Pull Payments" button)
- [x] Handle payment reconciliation conflicts (via quickbooksPaymentMapping table)

### QuickBooks Sync Settings
- [x] Create quickbooksSyncSettings database table
- [x] Add sync preferences UI in Settings page (collapsible panel)
- [x] Implement auto-sync toggle (enable/disable) for invoices and payments
- [x] Add minimum invoice amount filter for sync
- [x] Add sync frequency settings (pollIntervalMinutes)
- [x] Save and apply user preferences

### Testing
- [x] Test sync status indicator display (2 tests)
- [x] Test two-way payment sync (3 tests)
- [x] Test sync settings persistence (5 tests)
- [x] Test settings application to sync behavior (4 tests)
- [x] All 14 tests passing


## Landing Page Improvements

### Banner Refinement
- [x] Review and remove/refine obstructing banner at line 34
- [x] Ensure banner doesn't obstruct UI elements (made smaller, less intrusive)

### AND.CO Research
- [x] Research AND.CO competitor (features, positioning, pricing)
- [x] Identify key differentiators for SleekInvoices (templates, QB sync, crypto)
- [x] Apply competitive insights to landing page messaging (added AND.CO to comparison)

### Hero Section Improvements
- [x] Reduce copy - make it more concise and targeted
- [x] Apply landing page best practices (single clear CTA, social proof)
- [x] Improve visual hierarchy and clarity

### Aesthetic Improvements
- [x] Unify background - use one solid dark background (#0a0a0f)
- [x] Remove alternating background tones between sections
- [x] Improve features section aesthetic (cleaner cards with icons)
- [x] Ensure consistent visual design across all sections

### Testing
- [x] Verify all changes render correctly
- [x] Test responsive design on mobile
- [x] Ensure no UI obstructions


## Landing Page Refinements (Round 2)

- [x] Fix banner spacing - removed banner entirely (cleaner approach)
- [x] Match background color to dashboard (using theme bg-background variable)
- [x] Unify max-width across all sections (max-w-4xl, px-6 padding)
- [x] Improve overall UI for cleaner look (theme variables throughout)


## Pre-Launch Review Findings (January 8, 2026)

### Critical Issues (In Progress)
- [x] Fix settings page direct URL routing (verified - loads correctly, just slow initial load)
- [x] Update 404 page to use dark theme (skip Sleeky - user adding later)
- [ ] Clean up test data (479 clients, duplicate invoices) - User action required via Database panel
- [x] Add pagination to clients list (25 items per page, page size selector)
- [x] Verify invoice number uniqueness validation (getInvoiceByNumber in db.ts, checked in routers.ts)

### Design Inconsistencies
- [x] Standardize date format across app (formatDate in utils.ts uses consistent format)
- [x] Update Magic Invoice button styling (removed dashed border, added subtle bg)
- [x] Empty state displays use "—" consistently (acceptable for table cells)

### Feature Improvements
- [x] Reorganize settings page into tabs (Profile, Company, Reminders, Integrations)
- [ ] Add visual email template editor or syntax highlighting
- [ ] Add sorting to clients list
- [ ] Add bulk actions to clients list
- [ ] Add client revenue display
- [ ] Add template preview to invoice creation

### Landing Page
- [ ] Add testimonials section
- [ ] Add product demo video/GIF
- [ ] Create contact page
- [ ] Create privacy and terms pages
- [ ] Add Sleeky mascot to empty states and 404 page

### Mobile
- [ ] Test hamburger menu on mobile
- [ ] Verify touch targets are 44x44 pixels minimum
- [ ] Test invoice creation form on mobile
- [ ] Verify modals don't overflow on small screens


## Client Management Enhancements

### Client Sorting
- [x] Add sort dropdown/buttons for Name, Email, Date Added
- [x] Implement ascending/descending toggle
- [x] Persist sort preference in state
- [x] Update table headers to show sort indicators (clickable with icons)

### Bulk Delete
- [x] Add checkbox column to clients table
- [x] Add "Select All" checkbox in header
- [x] Add "Delete Selected" button (shows when items selected)
- [x] Implement bulk delete API endpoint
- [x] Add confirmation dialog before deletion
- [x] Show count of selected items

### Visual Email Template Editor
- [x] Create placeholder-aware textarea component (PlaceholderTextarea.tsx)
- [x] Highlight {{placeholders}} with distinct styling (green for valid, red for invalid)
- [x] Add placeholder insertion buttons/dropdown
- [x] Show live preview of template with sample data
- [x] Validate placeholder syntax (highlights invalid placeholders in red)


## Client Management Enhancements (Round 2)

### Client Search Filters
- [x] Add company filter dropdown (list unique companies)
- [x] Add tax exempt status filter (All/Tax Exempt/Not Exempt)
- [x] Add date range filter (created date)
- [x] Combine filters with existing search and sort

### Email Template Presets
- [x] Create friendly reminder template preset
- [x] Create formal reminder template preset
- [x] Create urgent reminder template preset
- [x] Add preset selector dropdown in Settings ("Use Template" button)
- [x] Allow customization after selecting preset

### Export Clients to CSV
- [x] Add "Export CSV" button to clients page
- [x] Generate CSV with all client fields (name, email, phone, company, address, VAT, tax exempt, notes, created)
- [x] Handle large datasets efficiently (client-side generation)
- [x] Include proper CSV escaping for special characters (quotes, commas, newlines)


## Advanced Features (Round 3)

### Invoice Filters
- [x] Add status filter dropdown (All/Draft/Sent/Paid/Overdue)
- [x] Add date range filter (today, week, month, quarter, year)
- [x] Add client filter dropdown (auto-populated from invoices)
- [x] Add amount range filter (min/max)
- [x] Combine filters with existing search and sort
- [x] Add collapsible advanced filters panel with badge count

### Client Tags/Categories
- [x] Create client_tags database table (clientTags + clientTagAssignments)
- [x] Add tag management UI (create, edit, delete tags with color picker)
- [x] Add tag assignment to clients (inline in table + bulk assign)
- [x] Filter clients by tags
- [x] Display tags on client cards/rows

### Batch Invoice Creation
- [x] Add multi-select mode to clients list (already exists with checkboxes)
- [x] Create batch invoice page (/invoices/batch)
- [x] Allow setting common line items for batch
- [x] Generate invoices for selected clients (sequential creation)
- [x] Show progress/results of batch creation (real-time status updates)


## Advanced Features Round 4

### Feature 1: Recurring Invoice Templates (Batch Configurations)
- [x] Create batchInvoiceTemplates database table (name, lineItems, dueInDays, templateId, notes, frequency)
- [x] Add backend CRUD operations for batch templates
- [x] Add tRPC procedures (create, list, get, update, delete)
- [x] Add "Save as Template" button on batch invoice page
- [x] Create BatchTemplateDialog for saving/naming templates
- [x] Add "Load Template" dropdown on batch invoice page
- [x] Show template list with name, line items count, frequency
- [x] Allow editing and deleting saved templates
- [x] Write tests for batch template operations (11 tests passing)

### Feature 2: Client Import from Tags on Batch Invoice Page
- [x] Add tag filter dropdown to batch invoice page
- [x] Fetch all tags for current user
- [x] Add "Select All Clients with Tag" button
- [x] When tag selected, auto-populate client selection
- [x] Show tag badges in client selection list
- [x] Allow combining tag filter with manual selection
- [x] Write tests for tag-based client selection (included in batch template tests)

### Feature 3: Invoice Export (CSV and PDF)
- [x] Add Export dropdown button to Invoices page
- [x] Implement CSV export for filtered invoice list
- [x] Include columns: Invoice #, Client, Email, Issue Date, Due Date, Amount, Status, Paid Amount
- [x] Implement PDF export for filtered invoice list
- [x] Create professional PDF report layout
- [x] Include summary stats at top (total, paid, outstanding)
- [x] Apply current filters to export
- [x] Show export progress for large datasets
- [x] Write tests for export functionality (included in UI component)



## Analytics Chart Fix

### Issues Reported
- [ ] Revenue chart is not visible
- [ ] Chart UX is not user-friendly

### Fixes Needed
- [ ] Investigate why chart is not rendering properly
- [ ] Add proper chart container with fixed height
- [ ] Improve chart styling and colors
- [ ] Add chart legend and tooltips
- [ ] Ensure chart data is properly formatted


## Feature Audit

- [x] Create comprehensive feature audit document
- [x] Inventory all features from codebase
- [x] Document feature purposes and UX assessment
- [x] Identify alignment with user needs and business objectives


## Competitive Analysis & Improvements

### Research Phase
- [ ] Research top invoicing platforms (FreshBooks, QuickBooks, Wave, Zoho Invoice, Invoice Ninja)
- [ ] Document competitor features and pricing
- [ ] Identify competitive gaps and advantages
- [ ] Create competitive positioning analysis

### Priority Improvements (Based on Audit)
- [ ] Improve email template editor UX
- [ ] Simplify crypto payment setup or evaluate removal
- [ ] Add feature usage analytics
- [ ] Validate client portal value


## Priority Improvements (Based on Competitive Analysis - Jan 2026)

### Immediate Priority - UX Polish (Email Template Editor Redesign)
- [x] Create EmailTemplateEditor component with visual variable insertion
- [x] Add clickable variable chips/buttons for easy insertion
- [x] Implement live preview panel showing email with sample data
- [x] Create pre-built email template library (Invoice Sent, Payment Reminder, Thank You, Overdue Notice)
- [x] Add template selector dropdown
- [x] Simplify interface - no HTML knowledge required
- [x] Update Settings page to use new editor
- [ ] Write tests for new email template editor
- [ ] Fix email template preview to properly render HTML templates with sample data

### Short-Term - Feature Gaps
- [ ] Add time tracking feature
- [ ] Multiple contacts per client
- [ ] Improve onboarding flow

### Medium-Term - Differentiation
- [ ] Enhance AI features (payment prediction, smart follow-ups)
- [ ] Continue analytics improvements


## Email Subject Line Preview Feature
- [x] Add subject line input field to EmailTemplateEditor component
- [x] Add subject line preview with variable replacement in preview mode
- [x] Update Settings page to pass subject line value to editor
- [x] Test subject line preview with all variable types


## Bug Fix: Nested Anchor Tag Error
- [x] Fix nested <a> tag error on Settings page (React DOM validation error)


## AI Integration Improvements (Manus-Inspired)

### Phase 1: Enhance Collaborative Mode
- [ ] Expand quick actions library (add 10+ new actions)
- [x] Add inline action buttons in AI responses
  - [x] Create ActionButton component for rendering clickable actions
  - [x] Implement response parser to detect action markers
  - [x] Update AI system prompt to generate action buttons
  - [x] Support actions: create invoice, view client, send reminder, navigate
- [ ] Improve AI panel visual design (larger input, category chips)
- [ ] Add follow-up suggestions after each response
- [ ] Support embedded data tables in AI responses
- [ ] Add clickable client/invoice references in responses

### Phase 2: Add Embedded AI Features
- [ ] Dashboard AI Insight card (daily actionable recommendation)
- [ ] Smart suggestions during invoice creation (line items, payment terms)
- [ ] Client health score feature
- [ ] Contextual AI tooltips throughout app
- [ ] Smart defaults (auto-fill based on patterns)

### Phase 3: Add Asynchronous AI Features
- [ ] Background report generation
- [ ] Batch reminder sending with AI personalization
- [ ] Scheduled AI tasks (weekly summaries, auto-reminders)
- [ ] Bulk expense categorization

### Phase 4: Advanced AI Interactions
- [ ] Voice input support
- [ ] Visual selection mode (select element → ask AI to improve)
- [ ] Multi-step workflow engine


## Dashboard UI Improvements (Manus-Inspired)
- [x] Redesign MonthlyUsageCard - elegant/compact for Pro, prominent for Free users
- [x] Improve MagicInput with Manus-inspired design language
- [x] Add subtle gradients and refined spacing
- [x] Improve card hierarchy and visual flow


## Performance Optimization
- [x] Audit current bundle size and identify heavy dependencies
- [x] Analyze code splitting and lazy loading opportunities

### Phase 1: Quick Wins
- [x] Lazy load AIAssistant component (removes streamdown/mermaid from main bundle)
- [x] Add manual chunks configuration to vite.config.ts
- [x] Lazy load AIAssistantProvider context
- [x] Main bundle reduced from 1.87MB to 317KB (83% reduction!)

### Phase 2: Streamdown Replacement
- [x] Install react-markdown and remark-gfm packages
- [x] Create lightweight MarkdownRenderer component
- [x] Update AIAssistant to use new renderer
- [x] Update AIChatBox to use new renderer
- [x] Remove streamdown dependency
- [x] Verify bundle size reduction (12.3MB → 219KB = 98% reduction!)

### Phase 3: Advanced Optimizations
- [ ] Add preload hints for critical chunks
- [ ] Implement compression (gzip/brotli)
- [ ] Add performance monitoring


## Icon Pack Research
- [x] Research lightweight open-source icon libraries
- [x] Analyze bundle size and performance impact
- [x] Evaluate visual consistency with SleekInvoices brand
- [x] Check licensing for commercial use
- [x] Create recommendation document (docs/ICON_LIBRARY_RECOMMENDATIONS.md)


## Phosphor Icons Implementation
- [x] Install @phosphor-icons/react package
- [x] Replace primary action button icons with Bold weight variants
- [x] Update "New Invoice" button icon (Dashboard, Navigation)
- [x] Update "Save" button icons (SleekTemplateEditor, TemplateEditor)
- [x] Update "Create/Update Client" button icon (ClientDialog)
- [x] Update "Record Payment" button icon (PartialPaymentDialog)
- [x] Update "Add Expense" button icon (BillableExpenseDialog)
- [x] Update "Import Clients" button icon (CSVImportDialog)
- [x] Update "Export" button icon (InvoiceExportDialog)


## Phosphor Icons Fill Weight for Active States
- [x] Identify all active/selected state patterns in the codebase
- [x] Create NavigationIcon component for automatic weight switching
- [x] Update Navigation component icons to use Fill for active states
  - [x] Desktop navigation dropdown items
  - [x] Tablet navigation items and dropdowns
  - [x] Mobile menu items and submenus
- [x] Update sidebar/menu icons with Fill for selected items (N/A - no sidebar in current design)
- [x] Update tab components with Fill for active tabs (N/A - tabs use text styling)


## Navbar Design Optimization (Jan 8, 2026)
- [x] Analyze current navbar structure and identify friction points
- [x] Research UI/UX best practices for navigation
- [x] Implement visual hierarchy improvements
- [x] Optimize touch targets and spacing
- [x] Enhance hover/focus states for better feedback
- [x] Improve mobile navigation experience
- [x] Test and verify all improvements


## AI Assistant Sidebar UI Improvement (Jan 8, 2026)
- [x] Analyze current AI Assistant component structure
- [x] Research Manus.im design patterns and aesthetic
- [x] Improve chat message styling (bubbles, typography, spacing)
- [x] Enhance input area design
- [x] Refine header and overall container styling
- [x] Add smooth animations and transitions
- [x] Test and verify improvements


## Export Conversation Feature (Jan 8, 2026)
- [x] Add export button to AI Assistant header
- [x] Implement conversation to text file conversion
- [x] Add download functionality
- [x] Test export feature


## Onboarding & Tooltips System (Jan 8, 2026)
- [x] Design onboarding flow architecture
- [x] Create reusable tooltip component with animations
- [x] Build onboarding tour system with step navigation
- [x] Implement welcome modal for first-time users
- [x] Add onboarding steps for Dashboard features
- [x] Add onboarding steps for Invoice creation
- [x] Add onboarding steps for AI Assistant
- [x] Add contextual tooltips to key UI elements
- [x] Persist onboarding completion state
- [x] Test complete onboarding flow


## Onboarding Popup Redesign (Jan 9, 2026)
- [x] Analyze current popup design and identify improvement areas
- [x] Make popup more compact with tighter spacing
- [x] Improve visual cleanliness with refined typography and colors
- [x] Add smart positioning to avoid obstructions
- [x] Implement viewport-aware positioning (always visible)
- [x] Add responsive breakpoints for mobile/tablet/desktop
- [x] Ensure excellent readability at all sizes
- [x] Test across different screen sizes


## Estimates API Error Fix (Jan 9, 2026)
- [x] Investigate failed query for updating expired estimates
- [x] Fix the database query in estimates router
- [x] Create missing estimates and estimateLineItems tables
- [x] Test estimates page functionality


## Manage Categories UI Improvement (Jan 9, 2026)
- [x] Analyze current Manage Categories UI on Expenses page
- [x] Improve visual design and layout
- [x] Enhance category list styling
- [x] Improve add/edit category form
- [x] Test the improvements


## Payments Modal Enhancement (Jan 9, 2026)
- [x] Analyze current Payments page modal structure
- [x] Add pagination to payment records list (10 per page)
- [x] Standardize modal UI patterns for consistency
- [x] Add search/filter functionality (search, method filter, status filter)
- [x] Add sortable columns (date, amount)
- [x] Test the improvements


## Payment Details Modal (Jan 9, 2026)
- [x] Create payment details modal component
- [x] Display all payment fields including crypto details
- [x] Add clickable row functionality to open modal
- [x] Style modal consistently with other dialogs
- [x] Add copy-to-clipboard for transaction hashes and wallet addresses
- [x] Add block explorer links for crypto transactions
- [x] Test the modal functionality


## Payment Receipt PDF Generation (Jan 9, 2026)
- [x] Create PDF receipt template in pdf.ts
- [x] Add generateReceipt endpoint to payments router
- [x] Implement download button in payment details modal
- [x] Test receipt generation

## Refund Functionality (Jan 9, 2026)
- [x] Add refund endpoint to payments router
- [x] Create refundPayment function in db.ts
- [x] Add refund button and dialog in payment details modal
- [x] Track refund reason in payment notes
- [x] Test refund functionality

## Payment Reminders (Jan 9, 2026)
- [x] Create sendPaymentReminder endpoint in reminders router
- [x] Create enhanced payment reminder email template
- [x] Add ability to send custom message with reminder
- [x] Log reminder history
- [x] Test reminder functionality


## Onboarding Modal Improvements (Jan 9, 2026)
- [x] Research onboarding modal best practices
- [x] Fix tooltip cutoff issues on all screen sizes
- [x] Implement viewport-aware positioning
- [x] Add scroll-into-view for target elements
- [x] Test on mobile, tablet, and desktop viewports


## Modal Windows Spacing Refinement (Jan 9, 2026)
- [x] Audit all modal components for spacing inconsistencies
- [x] Define consistent modal spacing standards (padding, margins, gaps)
- [x] Fix Create Recurring Invoice modal spacing
- [x] Fix all Dialog components with tight spacing
- [x] Apply consistent header/content/footer padding
- [x] Ensure visual harmony across all modals
- [x] Test modal consistency across the application


## Production Hardening & UX Improvements (Jan 9, 2026)

### Priority 1: Production Hardening
- [x] Set up error monitoring (console-based error tracking)
- [x] Implement rate limiting on public endpoints
- [x] Add health check endpoint for monitoring
- [ ] Database query optimization (add indexes)

### Priority 2: UX Improvements
- [x] Implement invoice duplication feature
- [x] Add bulk invoice actions (send/download multiple)
- [x] Add email delivery tracking via Resend webhooks

### Priority 3: Compliance & Operations
- [ ] Implement data export for GDPR compliance
- [x] Add audit logging system for tracking changes
- [ ] Add account deletion flow (GDPR right to be forgotten)

## Delete My Account Feature (Jan 9, 2026)
- [x] Create backend endpoint for account deletion
- [x] Implement comprehensive data cleanup (all tables)
- [x] Create multi-step confirmation dialog UI
- [x] Add clear communication throughout deletion process
- [x] Log deletion for audit trail before removing data
- [x] Test complete deletion flow


## Local Development Setup for Claude Code
- [x] Docker Compose for local MySQL database
- [x] Comprehensive seed data script with realistic test data
- [x] Complete auth bypass for local development
- [x] Local development setup scripts (setup.sh)
- [x] Updated .env.local.example with all required variables
- [x] Local development documentation


## Typography Audit - SUSE Mono Font
- [x] Audit Clients page for numerical displays
- [x] Audit Invoices page for numerical displays
- [x] Audit Analytics page for numerical displays
- [x] Apply font-numeric fixes to all identified elements


## Numerical Typography Audit
- [x] Audit Estimates page for numerical displays
- [x] Audit Payments page for numerical displays
- [x] Audit RecurringInvoices page for numerical displays
- [x] Audit Subscription page for numerical displays
- [x] Audit CreateInvoice/EditInvoice pages for numerical displays
- [x] Apply font-numeric class to estimate counts and amounts
- [x] Apply font-numeric class to payment counts and amounts
- [x] Apply font-numeric class to subscription pricing
- [x] Apply font-numeric class to line item amounts
- [x] Create font-numeric-bold class for prominent amounts
- [x] Test typography changes


## Animated Numbers Feature
- [x] Create AnimatedNumber component with count-up animation
- [x] Implement smooth easing (ease-out-expo and ease-out-quart)
- [x] Support currency formatting with animation (AnimatedCurrency)
- [x] Support integer and decimal animations (AnimatedInteger, AnimatedPercentage)
- [x] Apply to Dashboard statistics cards
- [x] Apply to Payments page stats
- [x] Apply to Analytics page metrics
- [x] Add staggered animation delays for visual appeal
- [x] Test animation performance (35 tests passing)
- [x] Save checkpoint


## Receipt Style Invoice Template
- [x] Clone and analyze receipt-style prototype repository
- [x] Study current invoice template system architecture
- [x] Create Receipt Style template design in template system (ReceiptStyleInvoice.tsx)
- [x] Update InvoicePreviewModal for receipt style rendering (style toggle)
- [x] Update PDF generation for receipt style (pdf.ts)
- [x] Update email templates for receipt style (email.ts)
- [x] Test all invoice functionality (34 tests passing)
- [x] Ensure no feature regressions
- [x] Save checkpoint


## Classic Invoice Style Redesign
- [x] Analyze current Classic style issues (archaic look, poor responsiveness)
- [x] Design modern Classic style with contemporary typography (Inter font)
- [x] Implement clean, minimal header with better logo placement
- [x] Create refined line items table with better spacing (rounded corners, grid layout)
- [x] Improve totals section with modern styling (accent color total)
- [x] Add subtle shadows and rounded corners for depth
- [x] Ensure responsive layout for mobile/tablet (CSS Grid)
- [x] Update PDF generation for modern Classic style
- [x] Test all functionality (34 tests passing)
- [x] Save checkpoint


## Template Creator UI Redesign
- [x] Analyze current template creator interface
- [x] Redesign UI to match current design system
- [x] Add style toggle (Receipt/Classic) in editor
- [x] Implement live preview with style switching
- [x] Ensure responsive layout for all devices (Mobile/Tablet/Desktop preview)
- [x] Optimize PDF export for both styles
- [x] Ensure PDF matches preview exactly
- [x] Test all functionality (34 tests passing)
- [x] Save checkpoint


## Dynamic Colors with Contrast Ratio Optimization
- [ ] Create contrast ratio utility functions (WCAG compliant)
- [ ] Update ReceiptStyleInvoice to accept primaryColor, accentColor props
- [ ] Update ClassicStyleInvoice to use contrast-safe text colors
- [ ] Implement automatic text color adjustment based on background
- [ ] Update InvoicePreviewModal to pass colors to both styles
- [ ] Update PDF generation with contrast-safe colors
- [ ] Test color combinations for accessibility
- [ ] Save checkpoint


## Dynamic Colors with Contrast Ratio Optimization
- [x] Create color contrast utility functions (WCAG compliance)
- [x] Implement automatic text color selection for backgrounds
- [x] Update ReceiptStyleInvoice with dynamic color props
- [x] Update ClassicStyleInvoice with contrast-safe colors
- [x] Pass template colors through InvoicePreviewModal
- [x] Update PDF generation to use dynamic colors
- [x] Ensure all color combinations meet WCAG AA contrast (4.5:1)
- [x] Test with various color combinations (18 tests passing)
- [x] Save checkpoint

## NOWPayments IPN Secret
- [x] Add NOWPAYMENTS_IPN_SECRET environment variable for webhook signature verification
- [x] Update nowpayments library to use IPN secret instead of public key for signature verification

## Bug Fix: Invoice Creation Database Error
- [x] Fix failed INSERT query when creating invoices
- [x] Investigate clientId 690001 - may not exist in clients table

## NOWPayments Currency Selector
- [x] Update backend to make payCurrency optional in createPayment
- [x] Update frontend to remove currency pre-selection for invoice payments
- [x] Let customers choose currency on NOWPayments checkout page

## Client Portal Crypto Payments
- [x] Add backend endpoint for client-initiated crypto payments
- [x] Update Client Portal UI with crypto payment button
- [x] Add CryptoPaymentDialog to Client Portal
- [x] Test end-to-end client crypto payment flow


## Email System Enhancements

### Crypto Payment Confirmation Email
- [x] Add payment confirmation email to NOWPayments webhook handler (already implemented)
- [x] Include crypto payment details (currency, amount, transaction hash)
- [x] Send email when invoice payment status changes to 'paid'
- [x] Test crypto payment confirmation email

### Email Delivery Tracking System
- [x] Create emailLogs database table with schema (already exists)
- [x] Add migration for emailLogs table (already exists)
- [x] Create logEmail() function to record all sent emails (already exists)
- [x] Update sendInvoiceEmail to log emails
- [x] Update sendPaymentReminderEmail to log emails
- [x] Update sendReminderEmail to log emails
- [x] Update sendPaymentConfirmationEmail to log emails
- [x] Update portal invitation email to log emails
- [x] Add email status tracking (sent, delivered, failed)
- [x] Store Resend message IDs for tracking
- [x] Write comprehensive tests for email logging (25 tests passing)


### Email History UI
- [x] Create EmailHistory page component
- [x] Display email list with columns: recipient, subject, type, status, sent date
- [x] Add delivery status badges (sent, delivered, opened, bounced, failed)
- [x] Show open/click counts for tracked emails
- [x] Add filtering by email type and status
- [x] Add search by recipient email or invoice number
- [x] Add pagination for large email lists
- [x] Add email detail modal with full tracking info
- [x] Add retry button for failed emails
- [x] Add navigation link in sidebar

### Resend Webhooks
- [x] Create /api/webhooks/resend endpoint (already exists)
- [x] Verify Resend webhook signatures (already implemented)
- [x] Handle email.delivered event
- [x] Handle email.opened event
- [x] Handle email.clicked event
- [x] Handle email.bounced event
- [x] Handle email.complained event
- [x] Update emailLog table with delivery status
- [x] Increment open/click counts on repeat events

### Email Retry System
- [x] Add retryCount and lastRetryAt columns to emailLog table
- [x] Create retryEmail function with exponential backoff
- [x] Implement max retry limit (3 attempts)
- [x] Add retry delay calculation (1min, 5min, 15min)
- [x] Create tRPC endpoint for manual retry
- [x] Log retry attempts and results
- [x] Write tests for email retry system (17 tests passing)

### Email Analytics Dashboard Widget
- [x] Create tRPC endpoint for email analytics over time
- [x] Calculate open rate (opened / delivered) by period
- [x] Calculate click rate (clicked / opened) by period
- [x] Support daily/weekly/monthly time periods
- [x] Create EmailAnalyticsWidget component with chart
- [x] Show trend indicators (up/down vs previous period)
- [x] Add widget to Analytics page
- [x] Write tests for analytics endpoint (15 tests passing)

### AI Credit Top-Up System
- [x] Create aiCreditPurchases table for tracking purchases
- [x] Add purchasedCredits column to aiCredits table
- [x] Create Stripe product/price for credit packs (Starter: 25/$2.99, Standard: 100/$9.99, Pro: 500/$39.99)
- [x] Implement Stripe checkout session for credit purchase
- [x] Handle checkout.session.completed webhook for credits
- [x] Add tRPC endpoints: createCreditPurchase, getCreditPurchaseHistory, getCreditPacks
- [x] Update getAiCredits to include purchased credits
- [x] Create CreditTopUp UI component with pricing tiers
- [x] Add top-up button to AI Assistant when low on credits
- [x] Write tests for credit purchase flow (13 tests passing)


## Sleeky Mascot Integration

### Phase 1: Asset Preparation & AI Rebranding
- [ ] Extract Sleeky SVG assets from character sheet (11 poses)
- [ ] Create Sleeky AI avatar (32px, 64px, 128px, 256px)
- [ ] Optimize all Sleeky assets for web (SVG + PNG)
- [ ] Rename AI features to "Sleeky AI" (Smart Compose → Sleeky Smart Compose)
- [ ] Replace AI icons with Sleeky avatar throughout app
- [ ] Update AI Assistant sidebar header with Sleeky avatar
- [ ] Create SleekyAvatar component with pose variants
- [ ] Create SleekyAIBadge component for AI features
- [ ] Write tests for new Sleeky components

### Phase 2: Empty States with Sleeky
- [ ] Create EmptyStateWithSleeky component
- [ ] Implement Invoices empty state (happy pose)
- [ ] Implement Clients empty state (welcoming pose)
- [ ] Implement Expenses empty state (thinking pose)
- [ ] Implement Products empty state (energetic pose)
- [ ] Implement Estimates empty state (confident pose)
- [ ] Implement Email History empty state (cool pose)
- [ ] Implement Payments empty state (celebrating pose)
- [ ] Implement Search results empty state (confused pose)
- [ ] Implement Analytics empty state (waiting pose)
- [ ] Write tests for empty state components

### Phase 3: Success & Error States
- [ ] Create SleekyLoadingSpinner component
- [ ] Create SleekySuccessAnimation component
- [ ] Replace generic spinners with SleekyLoadingSpinner
- [ ] Add Sleeky to error states (sad pose)
- [ ] Add Sleeky to success toasts (celebrating)
- [ ] Add Sleeky to invoice sent celebration
- [ ] Add Sleeky to payment received celebration
- [ ] Add Sleeky to first invoice created modal
- [ ] Add Sleeky to subscription upgrade success
- [ ] Write tests for success/error animations

### Phase 4: Refinement & Polish
- [ ] Add subtle animations to Sleeky poses (bounce, float, spin)
- [ ] Ensure accessibility (alt text, color contrast)
- [ ] Test performance on mobile devices
- [ ] Optimize asset file sizes
- [ ] A/B test engagement metrics
- [ ] Gather user feedback
- [ ] Refine based on feedback
>>>>>>> Stashed changes
