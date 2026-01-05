# SleekInvoices: Competitor Crush Roadmap

> **Goal**: Transform SleekInvoices from a beautiful UI into a competition-crushing SaaS with crypto payments, compliance features, and "sticky" UX.

---

## Current State Analysis

### What We Have
- ✅ Clean top navigation (Dashboard, Invoices, Clients, Analytics, Templates)
- ✅ Invoice creation with line items, taxes, discounts
- ✅ PDF generation and email delivery
- ✅ Stripe payment integration (payment links)
- ✅ Beautiful template customization (color presets, Google Fonts)
- ✅ Client management (CRUD)
- ✅ Recurring invoices
- ✅ Expense tracking
- ✅ Client portal with access tokens

### What We're Missing (Gap Analysis vs Invoice Ninja)
- ❌ **VAT/Tax ID field** on clients (critical for EU/B2B)
- ❌ **Crypto payment support** (Coinbase Commerce, manual wallets)
- ❌ **High decimal precision** for crypto amounts (8-18 decimals)
- ❌ **"Viewed" status tracking** (spy pixel/link tracking)
- ❌ **Dynamic currency symbols** (ETH, BTC symbols)
- ❌ **Payment gateway settings page** ("Get Paid" tab)
- ❌ **QR code generation** for crypto wallet addresses

---

## Phase 1: The Crypto Foundation & Compliance

**Objective**: Prepare the database and data structures to support crypto payments and EU compliance.

### 1.1 Database Schema Updates

- [ ] **Create `payment_gateways` table**
  ```sql
  id: uuid
  user_id: uuid (FK to users)
  provider: enum('stripe', 'coinbase_commerce', 'manual_wallet')
  config: jsonb (encrypted keys, wallet addresses)
  is_enabled: boolean
  created_at: timestamp
  updated_at: timestamp
  ```

- [ ] **Update `invoices` table for high-decimal precision**
  - Change `subtotal`, `total`, `taxAmount`, `discountAmount`, `amountPaid` from `DECIMAL(10,2)` to `DECIMAL(24,8)`
  - Add `cryptoAmount` column for native crypto amounts (e.g., 0.045 ETH)
  - Add `cryptoCurrency` column (e.g., 'ETH', 'BTC', 'USDC')

- [ ] **Update `invoiceLineItems` table**
  - Change `rate` and `amount` from `DECIMAL(10,2)` to `DECIMAL(24,8)`
  - Allows line items like "0.0025 ETH per hour"

- [ ] **Update `clients` table**
  - Add `vatNumber` (VARCHAR 50) - Tax ID / VAT Number field
  - Add `taxExempt` (BOOLEAN) - For tax-exempt clients

### 1.2 Client Modal Update

- [ ] **Add VAT/Tax ID field to ClientDialog.tsx**
  - New field: "VAT / Tax ID" (optional)
  - Placeholder: "e.g., DE123456789"
  - Display on invoice PDF under client address

### 1.3 Frontend Decimal Precision

- [ ] **Update invoice creation form**
  - Allow up to 8 decimal places in "Rate" field
  - Use `decimal.js` or similar library for precise calculations
  - Dynamic validation based on currency type:
    - Fiat (USD/EUR): 2 decimals max
    - Crypto (BTC/ETH): 8 decimals max

- [ ] **Update currency display logic**
  - Dynamic symbol based on currency ($ → Ξ for ETH, ₿ for BTC)
  - Proper decimal formatting per currency type

---

## Phase 2: The Payment Architecture ("Get Paid")

**Objective**: Build the unified payment gateway system with Stripe, Coinbase Commerce, and manual wallet support.

### 2.1 Settings Tab: "Payment Connections"

- [ ] **Create new Settings tab UI**
  - Tab name: "Get Paid" or "Payment Connections"
  - Location: Settings page, new tab after existing tabs

- [ ] **Stripe Section**
  - Display current Stripe connection status
  - Option to use platform Stripe (current) or bring own keys
  - Input fields for custom Publishable Key and Secret Key
  - "Test Connection" button

- [ ] **Coinbase Commerce Section**
  - Input field for API Key
  - "Connect Coinbase Commerce" button
  - Status indicator (Connected/Not Connected)
  - Supported currencies display (BTC, ETH, USDC, USDT)

- [ ] **Manual Wallet Section**
  - Input field for Wallet Address (0x...)
  - Dropdown for Network (Ethereum, Polygon, BSC, etc.)
  - QR code preview of the wallet address
  - Multiple wallets support (add/remove)

### 2.2 Backend: Payment Gateway Logic

- [ ] **Create `paymentGateways` tRPC router**
  - `list`: Get user's configured gateways
  - `create`: Add new gateway configuration
  - `update`: Modify gateway settings
  - `delete`: Remove gateway
  - `testConnection`: Verify API keys work

- [ ] **Stripe Payment Intent Logic**
  - Create PaymentIntent using user's keys (if custom)
  - Fall back to platform keys if not configured
  - Webhook handler for payment confirmation

- [ ] **Coinbase Commerce Integration**
  - Create Charge when client clicks "Pay with Crypto"
  - Webhook handler for charge confirmation
  - Auto-update invoice status to PAID

- [ ] **Manual Wallet "Marked Paid" Logic**
  - Client clicks "I have sent the payment"
  - Status changes to "PROCESSING" or "PENDING_VERIFICATION"
  - Email notification to invoice owner
  - Manual verification workflow

### 2.3 Database: Save Gateway Configurations

- [ ] **Implement secure storage for API keys**
  - Encrypt sensitive data (API keys, secrets)
  - Store in `payment_gateways.config` JSONB column
  - Never expose full keys in API responses

---

## Phase 3: The Public Invoice Experience

**Objective**: Create the "sticky" features that differentiate SleekInvoices from competitors.

### 3.1 Invoice Public View Updates

- [ ] **Add "Pay with Crypto" button**
  - Appears alongside "Pay Now" (Stripe) button
  - Opens modal with payment options:
    - Coinbase Commerce (if configured)
    - Direct wallet transfer (if configured)

- [ ] **QR Code Generation**
  - Use `qrcode.react` library
  - Generate QR for wallet address
  - Include amount in QR data (EIP-681 format for ETH)
  - "Click to copy" functionality for address

- [ ] **Dynamic Currency Display**
  - Show correct currency symbol based on invoice currency
  - Format amounts appropriately (2 decimals for fiat, 8 for crypto)
  - Currency conversion display (optional): "≈ $1,234.56 USD"

### 3.2 "Viewed" Status Tracking

- [ ] **Implement link tracking middleware**
  - Change email links from `/invoice/{id}` to `/track/invoice/{id}`
  - Middleware flow:
    1. Check if status is "SENT"
    2. Update to "VIEWED" with timestamp
    3. Redirect to actual invoice view

- [ ] **Add "viewed" to invoice status enum**
  - Update schema: `status: enum('draft', 'sent', 'viewed', 'paid', 'overdue', 'canceled')`
  - Update StatusBadge component for new status

- [ ] **Notification on view**
  - Send email/push notification to invoice owner
  - "Client viewed Invoice #001 just now"
  - Include timestamp and IP location (optional)

### 3.3 Invoice Template Updates

- [ ] **Add Crypto QR Code toggle**
  - In template Field Visibility section
  - Toggle: "Show Crypto Payment QR"
  - Places QR code on PDF if enabled

- [ ] **VAT Number display**
  - Show client's VAT/Tax ID on invoice
  - Position: Under client address
  - Only show if client has VAT number

- [ ] **Payment instructions section**
  - Dynamic based on enabled payment methods
  - "Pay online: [Stripe link]"
  - "Pay with crypto: [Wallet address]"

---

## Implementation Order

### Sprint 1: Foundation (Phase 1)
1. Database schema updates (payment_gateways table, decimal precision)
2. Client VAT field (schema + UI)
3. Frontend decimal precision handling

### Sprint 2: Payment Architecture (Phase 2)
1. Settings "Get Paid" tab UI
2. Payment gateway tRPC router
3. Coinbase Commerce integration
4. Manual wallet logic

### Sprint 3: Public Experience (Phase 3)
1. Invoice public view payment options
2. QR code generation
3. "Viewed" status tracking
4. Template updates

---

## Success Metrics

| Feature | Invoice Ninja | SleekInvoices Target |
|---------|--------------|---------------------|
| Crypto Support | No / Complex | Native (Coinbase + Manual Wallet) |
| Decimal Precision | 2 decimals | 8 decimals (crypto-ready) |
| Payment UX | Redirect to page | Embedded + QR Codes |
| Status Tracking | Basic | "Viewed" timestamp + notification |
| Onboarding | 15+ clicks | 2-3 clicks (inline modals) |
| VAT Compliance | Yes | Yes (matching feature) |

---

## Technical Notes

### Libraries to Add
- `coinbase-commerce-node` - Coinbase Commerce API
- `qrcode.react` - QR code generation
- `decimal.js` - Precise decimal math
- `crypto-js` - Encryption for API keys

### API Endpoints to Create
- `POST /api/payments/coinbase/create-charge`
- `POST /api/payments/coinbase/webhook`
- `GET /api/track/invoice/:id` (view tracking middleware)
- `POST /api/payments/mark-paid` (manual wallet confirmation)

### Environment Variables to Add
- `COINBASE_COMMERCE_API_KEY` (optional, for platform-level integration)
- `ENCRYPTION_KEY` (for encrypting user API keys)

---

## Notes

This roadmap is designed to be executed in phases. Each phase builds on the previous one, ensuring a stable foundation before adding complexity.

**Phase 1** is purely backend/database work with minimal UI changes.
**Phase 2** introduces the settings UI and payment logic.
**Phase 3** is the user-facing "wow" features.

Do not skip phases or implement features out of order.
