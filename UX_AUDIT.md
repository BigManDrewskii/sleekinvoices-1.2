# UX Audit - Issues Found

## Create Invoice Page

### Critical Issues
1. **No client validation** - "No clients yet" dropdown allows creating invoice without client
2. **Rate field not required** - Can create invoice with $0.00 items
3. **No form validation feedback** - No error messages shown for invalid inputs
4. **Duplicate Cancel buttons** - Three cancel buttons visible (navigation issue)

### Medium Priority
5. **Invoice number not editable** - Auto-generated but no way to customize
6. **No client quick-add from invoice form** - "New Client" button present but UX unclear
7. **Line item deletion** - No visible delete button for line items
8. **Discount/Tax percentage input** - Shows "0%" placeholder but unclear if it's percentage or decimal
9. **No preview before save** - Can't see what invoice looks like before creating
10. **Save as Draft vs Save & Send** - Unclear difference, no explanation

### Low Priority
11. **No keyboard shortcuts** - No quick navigation (Tab order, Enter to submit)
12. **Date picker UX** - Native date input, could be improved with calendar widget
13. **Currency not shown** - No currency symbol in rate/amount fields
14. **No autosave** - Risk of losing work if browser crashes
15. **No field help text** - No tooltips or hints for complex fields

## General Navigation Issues
- Multiple cancel buttons appearing (likely from nested navigation components)
- Need to consolidate navigation structure

## Next Steps
1. Fix critical validation issues
2. Improve form UX with better error handling
3. Add client selection validation
4. Remove duplicate navigation elements
5. Add preview functionality
6. Improve line item management
