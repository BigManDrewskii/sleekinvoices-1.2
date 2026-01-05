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
- [ ] Add template selector dropdown in Create Invoice form
- [ ] Show template preview thumbnail in selector
- [ ] Remember last used template per user
- [ ] Allow template override per invoice

### Phase 6: Invoice Preview
- [ ] Add "Preview Invoice" button before finalizing
- [ ] Show full invoice with selected template applied
- [ ] Allow template switching in preview mode
- [ ] Add "Edit" and "Finalize" actions from preview

### Phase 7: Edge Cases & Error Handling
- [ ] Handle user with no templates (show initialize button)
- [ ] Handle deleting default template (prevent or auto-select new default)
- [ ] Handle deleting template used by existing invoices (allow but warn)
- [ ] Handle network errors during template operations
- [ ] Handle invalid template data
- [ ] Handle concurrent template edits
- [ ] Add loading states for all async operations
- [ ] Add success/error toast notifications

### Phase 8: Testing & Delivery
- [ ] Write comprehensive vitest tests for all flows
- [ ] Test template CRUD operations
- [ ] Test invoice creation with template selection
- [ ] Test invoice preview functionality
- [ ] Test all edge cases
- [ ] Save final checkpoint
