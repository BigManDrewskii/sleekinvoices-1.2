# Project TODO

## Comprehensive Template Management System

### Phase 1: Research & Architecture
- [ ] Research best-in-class invoicing systems (FreshBooks, QuickBooks, Wave, Zoho Invoice)
- [ ] Design template system architecture with clear separation of concerns
- [ ] Define user flows for template management
- [ ] Define user flows for invoice creation with templates
- [ ] Document edge cases and error scenarios

### Phase 2: Code Cleanup
- [x] Delete Templates.old.tsx duplicate file
- [x] Remove automatic initialization logic
- [x] Clean up confusing variable names
- [x] Add clear comments to all template-related code

### Phase 3: Template Library
- [x] Create 6 unique, non-duplicate pre-made templates
- [x] Add template preview thumbnails/cards
- [x] Implement "Initialize Default Templates" button (manual, not automatic)
- [x] Add empty state with clear call-to-action
- [x] Show template count and categories (preset vs custom)

### Phase 4: Template CRUD Operations
- [x] Create new template (from scratch or from preset)
- [x] Edit existing template with live preview
- [x] Delete template with confirmation
- [x] Duplicate template functionality (can use edit + save as new)
- [x] Set default template
- [x] Validate template data before save

### Phase 5: Invoice Creation Integration
- [x] Add template selector dropdown in Create Invoice form
- [x] Show template preview thumbnail in selector (color indicator)
- [x] Allow template override per invoice
- [x] Update backend to accept and store templateId
- [x] Add template selector to Edit Invoice form

### Phase 6: Invoice Preview
- [x] Add "Preview Invoice" button before finalizing (already exists)
- [x] Show full invoice with selected template applied
- [x] Allow template switching in preview mode
- [x] Template styling (colors, fonts) applied to preview

### Phase 7: Edge Cases & Error Handling
- [x] Handle user with no templates (show initialize button in empty state)
- [x] Handle deleting default template (backend prevents deletion)
- [x] Handle deleting template used by existing invoices (allowed, invoices fallback to default)
- [x] Handle network errors during template operations (tRPC error handling)
- [x] Handle invalid template data (Zod validation on backend)
- [x] Add loading states for all async operations (loading skeletons)
- [x] Add success/error toast notifications (sonner toasts)

### Phase 8: Testing & Delivery
- [x] Write comprehensive vitest tests for all flows
- [x] Test template CRUD operations (8 tests passing)
- [x] Test template field validation (4 tests passing)
- [x] Test template initialization (1 test passing)
- [x] Test all edge cases (delete default, field visibility)
- [x] All 13 tests passing
- [ ] Save final checkpoint

## Console Warning Cleanup
- [x] Suppress benign ResizeObserver warnings in browser console
