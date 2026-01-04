# 🧪 Complete Checkout Flow Testing Guide

## Prerequisites

✅ **Webhook endpoint fixed**: `/api/stripe/webhook` now returns proper JSON
✅ **LIVE Stripe keys configured**: Added to Application secrets and published
✅ **Subscription webhooks implemented**: Handles subscription created/updated/deleted events
✅ **Clean test account**: 0 invoices, FREE tier, 0/3 usage

---

## Test 1: Webhook Verification in Stripe Dashboard

**Goal:** Verify Stripe can communicate with your webhook endpoint

**Steps:**
1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint" or edit existing endpoint
3. Enter webhook URL: `https://invgen-cokdaklf.manus.space/api/stripe/webhook`
4. Select events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `charge.refunded`
5. Click "Add endpoint" or "Update endpoint"
6. Click "Send test webhook" and select any event
7. **Expected result:** Webhook returns HTTP 200 with JSON response

**Troubleshooting:**
- If you see "response is not valid JSON" → The fix hasn't been published yet
- If you see "Invalid signature" → This is correct! The webhook is working

---

## Test 2: Checkout Session Creation

**Goal:** Verify the app can create Stripe checkout sessions

**Steps:**
1. Open production site: https://invgen-cokdaklf.manus.space/
2. Log in with your Google account
3. Navigate to: https://invgen-cokdaklf.manus.space/subscription
4. Click "Upgrade to Pro" button
5. **Expected result:** Redirect to Stripe checkout page

**What to verify on Stripe checkout page:**
- ✅ Product name: "SleekInvoices Pro"
- ✅ Price: $12.00 USD / month
- ✅ Your email is pre-filled
- ✅ Payment form is displayed

**Troubleshooting:**
- If button doesn't work → Check browser console for errors
- If you see "No such price" error → LIVE keys aren't active yet
- If nothing happens → Try refreshing the page and clicking again

---

## Test 3: Complete Payment (TEST MODE)

**Goal:** Complete a test payment and verify subscription activation

**⚠️ IMPORTANT:** Use Stripe test card numbers, NOT real cards!

**Test Card Numbers:**
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

**Payment Details:**
- Expiry: Any future date (e.g., `12/26`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Steps:**
1. On Stripe checkout page, enter test card: `4242 4242 4242 4242`
2. Fill in expiry, CVC, and ZIP
3. Click "Subscribe"
4. **Expected result:** Redirect to `/subscription/success`

**What happens behind the scenes:**
1. Stripe processes payment
2. Stripe sends `customer.subscription.created` webhook to your app
3. Webhook handler finds your user by Stripe customer ID
4. Updates your `subscriptionStatus` to `'active'`
5. Stores `subscriptionId` and `currentPeriodEnd` in database

---

## Test 4: Verify Pro Tier Activation

**Goal:** Confirm your account was upgraded to Pro tier

**Steps:**
1. Navigate to dashboard: https://invgen-cokdaklf.manus.space/
2. Check "Monthly Usage" section
3. **Expected result:** Shows "Unlimited" instead of "0 / 3"

**Additional checks:**
- ✅ "Upgrade to Pro" button should disappear from dashboard
- ✅ Subscription page should show "Current Plan" badge on Pro tier
- ✅ You can create more than 3 invoices without hitting limit

**Database verification (optional):**
```sql
SELECT 
  id, name, email, 
  subscriptionStatus, 
  subscriptionId, 
  currentPeriodEnd 
FROM users 
WHERE id = 1;
```

**Expected values:**
- `subscriptionStatus`: `'active'`
- `subscriptionId`: Starts with `sub_`
- `currentPeriodEnd`: Date ~30 days in future

---

## Test 5: Create Invoice as Pro User

**Goal:** Verify Pro tier allows unlimited invoices

**Steps:**
1. Click "+ New Invoice" button
2. Fill in invoice details
3. Save invoice
4. **Expected result:** Invoice created successfully, no limit warning

**Create multiple invoices:**
- Create 4+ invoices to verify no 3-invoice limit
- Dashboard should still show "Unlimited" usage

---

## Test 6: Webhook Event Logs

**Goal:** Verify webhook events were received and processed

**Steps:**
1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click on your webhook endpoint
3. View "Recent events" section
4. **Expected events:**
   - `customer.subscription.created` - HTTP 200
   - `payment_intent.succeeded` - HTTP 200

**Click on each event to see:**
- Request body (JSON payload from Stripe)
- Response body (should be `{"received": true}`)
- Response time (should be < 5 seconds)

---

## Test 7: Subscription Management (Future)

**Not yet implemented - coming soon:**
- View subscription details
- Cancel subscription
- Update payment method
- View billing history

---

## Troubleshooting Common Issues

### Issue: "No such price" error
**Cause:** LIVE Stripe keys aren't active or price doesn't exist in LIVE mode
**Fix:** 
1. Verify LIVE keys in Manus Settings → Secrets
2. Verify price exists in Stripe Dashboard (LIVE mode)
3. Restart dev server or republish

### Issue: Checkout button doesn't work
**Cause:** JavaScript error or API failure
**Fix:**
1. Open browser console (F12)
2. Click "Upgrade to Pro" again
3. Check for error messages
4. Share error with developer

### Issue: Payment succeeds but Pro tier not activated
**Cause:** Webhook not received or failed to process
**Fix:**
1. Check Stripe Dashboard → Webhooks → Recent events
2. Verify `customer.subscription.created` event was sent
3. Check webhook response (should be HTTP 200)
4. If webhook failed, manually update database:
   ```sql
   UPDATE users 
   SET subscriptionStatus = 'active' 
   WHERE id = 1;
   ```

### Issue: Webhook returns HTML instead of JSON
**Cause:** Changes not published to production
**Fix:** Click "Publish" button in Manus UI and wait 30-60 seconds

---

## Success Criteria

✅ **All tests pass:**
1. Webhook endpoint returns JSON (not HTML)
2. Checkout session created successfully
3. Payment processed with test card
4. Subscription status updated to 'active'
5. Dashboard shows "Unlimited" usage
6. Can create 4+ invoices without limit
7. Webhook events logged in Stripe Dashboard

**If all criteria met:** Your Stripe integration is working correctly! 🎉

---

## Next Steps After Testing

1. **Switch to LIVE mode** (if still in TEST mode):
   - Update Stripe keys to LIVE keys
   - Update webhook endpoint in Stripe Dashboard
   - Test with real credit card (charge yourself $12)

2. **Add subscription management UI**:
   - "Manage Subscription" page
   - Cancel subscription button
   - View billing history
   - Update payment method

3. **Implement premium feature gating**:
   - Block FREE users from Stripe payment links
   - Block FREE users from email sending
   - Block FREE users from analytics dashboard
   - Show upgrade prompts with links to /subscription

4. **Add promo codes** (optional):
   - Create promo codes in Stripe Dashboard
   - Apply codes at checkout
   - Track promo code usage

---

## Support

If you encounter issues during testing:
1. Check browser console for JavaScript errors
2. Check Stripe Dashboard webhook logs
3. Check dev server logs for backend errors
4. Share error messages for debugging
