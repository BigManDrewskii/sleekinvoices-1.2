# Phase 6B: Advanced Analytics Dashboard

## Focus: High-Impact Analytics Features

### Component 1: Backend Analytics Functions (60-90 min)

- [x] Add `getAgingReport(userId)` to db.ts
  - [ ] 0-30 days overdue
  - [ ] 31-60 days overdue
  - [ ] 61-90 days overdue
  - [ ] 90+ days overdue
  - [ ] Return count and total amount per bucket

- [x] Add `getClientProfitability(userId)` to db.ts
  - [ ] Revenue per client (sum of paid invoices)
  - [ ] Expenses per client (billable expenses)
  - [ ] Profit = revenue - expenses
  - [ ] Profit margin %

- [x] Add `getCashFlowProjection(userId, months)` to db.ts
  - [ ] Expected income (unpaid invoices by due date)
  - [ ] Historical expense average
  - [ ] Net cash flow projection

- [x] Add `getRevenueVsExpensesByMonth(userId, year)` to db.ts
  - [ ] Monthly revenue from payments
  - [ ] Monthly expenses
  - [ ] Net profit per month

- [x] Add tRPC procedures in analytics router
  - [ ] `analytics.getAgingReport`
  - [ ] `analytics.getClientProfitability`
  - [ ] `analytics.getCashFlowProjection`
  - [ ] `analytics.getRevenueVsExpenses`

### Component 2: Frontend Analytics Dashboard (60-90 min)

- [ ] Update `client/src/pages/Analytics.tsx`
  - [ ] Aging Report section with table
  - [ ] Client Profitability table (sortable)
  - [ ] Cash Flow Projection chart
  - [ ] Revenue vs Expenses chart

- [ ] Use existing chart components or add simple ones
  - [ ] Bar chart for aging report
  - [ ] Line chart for cash flow
  - [ ] Stacked bar for revenue vs expenses

### Component 3: Testing (30-45 min)

- [ ] Create `server/analytics-advanced.test.ts`
  - [ ] Test aging report calculation
  - [ ] Test client profitability with expenses
  - [ ] Test cash flow projection
  - [ ] Test revenue vs expenses aggregation

- [ ] Run all tests: `pnpm test`

### Component 4: Checkpoint (15 min)

- [ ] Update TODO_PHASE6B.md
- [ ] Create CHECKPOINT_PHASE6B.md
- [ ] Save checkpoint

## Success Metrics

- All analytics queries optimized (<1s response time)
- Charts rendering correctly
- ~82 tests passing (76 existing + 6 new)
- Zero TypeScript errors

## Estimated Time: 3-4 hours
