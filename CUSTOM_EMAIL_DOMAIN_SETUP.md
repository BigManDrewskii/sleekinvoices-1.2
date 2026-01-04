# Custom Email Domain Setup Guide

## Overview

This guide walks you through setting up a custom email domain for SleekInvoices so your invoice emails come from `invoices@sleekinvoices.com` instead of the generic `onboarding@resend.dev`.

**Benefits:**
- Professional branding (emails from your domain)
- Better deliverability (less likely to be marked as spam)
- Increased trust from customers
- Consistent brand experience

**Time Required:** 30-45 minutes (mostly waiting for DNS propagation)

---

## Prerequisites

- Access to your domain's DNS settings (sleekinvoices.com)
- Resend account (free tier is sufficient to start)

---

## Step 1: Create Resend Account

1. **Sign up for Resend**
   - Go to [resend.com](https://resend.com)
   - Click "Sign Up" or "Get Started"
   - Use your email to create an account
   - Verify your email address

2. **Access Dashboard**
   - Log in to [resend.com/dashboard](https://resend.com/dashboard)
   - You'll see the main dashboard

---

## Step 2: Add Your Domain to Resend

1. **Navigate to Domains**
   - In the Resend dashboard, click "Domains" in the left sidebar
   - Click "Add Domain" button

2. **Enter Your Domain**
   - Domain: `sleekinvoices.com`
   - Region: Select closest to your users (e.g., US East, EU West)
   - Click "Add"

3. **Copy DNS Records**
   - Resend will show you 3 DNS records to add:
     * **SPF Record** (TXT) - Authorizes Resend to send emails
     * **DKIM Record** (TXT) - Cryptographic signature for authenticity
     * **DMARC Record** (TXT) - Email authentication policy

   Example records (yours will be different):
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all
   
   Type: TXT
   Name: resend._domainkey
   Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
   
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@sleekinvoices.com
   ```

---

## Step 3: Configure DNS Records

### If using Cloudflare:

1. **Log in to Cloudflare**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Select your domain (sleekinvoices.com)

2. **Add SPF Record**
   - Click "DNS" in the left sidebar
   - Click "Add record"
   - Type: `TXT`
   - Name: `@` (represents root domain)
   - Content: Copy the SPF value from Resend
   - TTL: Auto
   - Proxy status: DNS only (gray cloud)
   - Click "Save"

3. **Add DKIM Record**
   - Click "Add record"
   - Type: `TXT`
   - Name: `resend._domainkey` (or whatever Resend shows)
   - Content: Copy the DKIM value from Resend
   - TTL: Auto
   - Proxy status: DNS only (gray cloud)
   - Click "Save"

4. **Add DMARC Record**
   - Click "Add record"
   - Type: `TXT`
   - Name: `_dmarc`
   - Content: Copy the DMARC value from Resend
   - TTL: Auto
   - Proxy status: DNS only (gray cloud)
   - Click "Save"

### If using another DNS provider:

The process is similar - add the 3 TXT records to your DNS zone. Consult your DNS provider's documentation:
- **Namecheap:** DNS Management → Advanced DNS → Add New Record
- **GoDaddy:** DNS Management → Add → TXT
- **Google Domains:** DNS → Custom records → Create new record
- **AWS Route 53:** Hosted zones → Create record → Type TXT

---

## Step 4: Verify Domain in Resend

1. **Wait for DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually completes within 15-30 minutes
   - Check status: [dnschecker.org](https://dnschecker.org)

2. **Verify in Resend**
   - Return to Resend dashboard → Domains
   - Click "Verify" next to your domain
   - If successful, status changes to "Verified" ✅
   - If failed, double-check DNS records and wait longer

3. **Troubleshooting**
   - If verification fails after 1 hour:
     * Check DNS records are exactly as shown in Resend
     * Ensure no extra spaces or quotes in TXT values
     * Verify TTL is set correctly
     * Try using a different DNS checker tool

---

## Step 5: Get Resend API Key

1. **Create API Key**
   - In Resend dashboard, click "API Keys" in sidebar
   - Click "Create API Key"
   - Name: `SleekInvoices Production`
   - Permission: `Sending access`
   - Click "Create"

2. **Copy API Key**
   - Copy the key immediately (shown only once)
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Store securely

3. **Add to Environment Variables**
   - Go to your Manus project settings
   - Navigate to Settings → Secrets (in Management UI)
   - Add new secret:
     * Key: `RESEND_API_KEY`
     * Value: Paste your API key
   - Click "Save"

---

## Step 6: Update Code Configuration

Now I'll update the code to use your custom domain:

### Update 1: Email Sender Address

**File:** `server/email.ts`

**Change FROM:**
```typescript
from: `${user.name || user.companyName || 'Invoice'} <onboarding@resend.dev>`
```

**Change TO:**
```typescript
from: `${user.name || user.companyName || 'SleekInvoices'} <invoices@sleekinvoices.com>`
```

### Update 2: Reply-To Address (Optional but Recommended)

Add a reply-to address so customers can respond:

```typescript
replyTo: user.email || 'support@sleekinvoices.com'
```

### Update 3: Support Email in Templates

Update any hardcoded support emails in your email templates to use your domain.

---

## Step 7: Test Email Delivery

After code updates and deployment:

1. **Send Test Invoice**
   - Create a test invoice in your app
   - Send it to your own email
   - Check inbox (and spam folder)

2. **Verify Email Headers**
   - Open the received email
   - View email source/headers
   - Confirm:
     * FROM: `invoices@sleekinvoices.com`
     * SPF: PASS
     * DKIM: PASS
     * DMARC: PASS

3. **Test Spam Score**
   - Use [mail-tester.com](https://www.mail-tester.com)
   - Send a test email to the address they provide
   - Check your spam score (aim for 8+/10)

4. **Test Multiple Email Providers**
   - Gmail
   - Outlook/Hotmail
   - Yahoo Mail
   - Verify none go to spam

---

## Step 8: Configure Additional Email Addresses (Optional)

You can create multiple email addresses for different purposes:

- `invoices@sleekinvoices.com` - Invoice delivery
- `reminders@sleekinvoices.com` - Payment reminders
- `support@sleekinvoices.com` - Customer support
- `noreply@sleekinvoices.com` - Automated notifications

**Note:** With Resend, you don't need to create mailboxes. These are send-only addresses.

---

## Pricing & Limits

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day
- All features included
- Perfect for starting out

**Resend Pro ($20/month):**
- 50,000 emails/month
- Unlimited daily sending
- Priority support
- Custom domains: unlimited

**Recommendation:** Start with free tier, upgrade when you hit limits.

---

## Troubleshooting Common Issues

### Emails Going to Spam

**Causes:**
- DNS records not fully propagated
- Missing or incorrect SPF/DKIM/DMARC
- Sending too many emails too quickly (warm up your domain)
- Poor email content (too many links, spammy words)

**Solutions:**
1. Verify all DNS records are correct
2. Use [mail-tester.com](https://www.mail-tester.com) to check score
3. Start with low volume, gradually increase
4. Improve email content quality
5. Add unsubscribe link (required by law)

### Domain Verification Failing

**Causes:**
- DNS not propagated yet
- Incorrect DNS records
- Cloudflare proxy enabled (should be DNS only)

**Solutions:**
1. Wait 1-2 hours for DNS propagation
2. Double-check records match exactly
3. Disable Cloudflare proxy for email records
4. Use [dnschecker.org](https://dnschecker.org) to verify records are live

### API Key Not Working

**Causes:**
- Wrong API key copied
- API key not added to environment variables
- Server not restarted after adding key

**Solutions:**
1. Regenerate API key in Resend
2. Verify key is in Manus Settings → Secrets
3. Restart your application (publish new checkpoint)

---

## Security Best Practices

1. **Never commit API keys to code**
   - Always use environment variables
   - API key is already in Manus Secrets ✅

2. **Use SPF, DKIM, and DMARC**
   - Prevents email spoofing
   - Improves deliverability
   - Required for production ✅

3. **Monitor email bounces**
   - Check Resend dashboard for bounce rates
   - Remove invalid email addresses
   - Keep bounce rate < 5%

4. **Implement unsubscribe**
   - Required by CAN-SPAM Act (US)
   - Required by GDPR (EU)
   - Add unsubscribe link to all marketing emails

---

## Post-Setup Checklist

- [ ] Domain verified in Resend dashboard
- [ ] All 3 DNS records (SPF, DKIM, DMARC) configured
- [ ] API key added to Manus Secrets
- [ ] Code updated to use custom domain
- [ ] Test email sent and received successfully
- [ ] Email headers show PASS for SPF/DKIM/DMARC
- [ ] Spam score checked (8+/10)
- [ ] Tested on multiple email providers (Gmail, Outlook, Yahoo)
- [ ] Reply-to address configured
- [ ] Monitoring set up in Resend dashboard

---

## Next Steps After Setup

1. **Monitor Email Delivery**
   - Check Resend dashboard daily for first week
   - Watch bounce rates and spam complaints
   - Adjust sending patterns if needed

2. **Warm Up Your Domain**
   - Start with low volume (10-20 emails/day)
   - Gradually increase over 2-4 weeks
   - Helps establish sender reputation

3. **Set Up Email Templates**
   - Create branded HTML templates
   - Include company logo
   - Consistent styling across all emails

4. **Add Email Analytics**
   - Track open rates
   - Track click rates
   - Monitor which emails perform best

---

## Support Resources

- **Resend Documentation:** [resend.com/docs](https://resend.com/docs)
- **Resend Support:** support@resend.com
- **DNS Checker:** [dnschecker.org](https://dnschecker.org)
- **Email Tester:** [mail-tester.com](https://www.mail-tester.com)
- **SPF Record Checker:** [mxtoolbox.com/spf.aspx](https://mxtoolbox.com/spf.aspx)

---

## Estimated Timeline

| Step | Time Required |
|------|---------------|
| Create Resend account | 5 minutes |
| Add domain to Resend | 2 minutes |
| Configure DNS records | 5 minutes |
| Wait for DNS propagation | 15-60 minutes |
| Verify domain | 1 minute |
| Get API key | 2 minutes |
| Update code | 5 minutes |
| Deploy changes | 5 minutes |
| Test email delivery | 10 minutes |
| **Total** | **30-90 minutes** |

Most of the time is waiting for DNS propagation, which you can do in the background.

---

## Ready to Proceed?

Once you've completed Steps 1-5 (Resend setup and DNS configuration), let me know and I'll update the code for you. I'll need:

1. Confirmation that your domain is verified in Resend ✅
2. The API key added to Manus Secrets ✅
3. Your preferred sender email format (e.g., `invoices@sleekinvoices.com`)

Then I'll update the code, test it, and create a checkpoint for you to publish.
