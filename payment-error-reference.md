# MGS Communications — Payment Error Reference

Quick reference for troubleshooting payment page errors at mgscommunications.com/pay

---

## During Card Entry (orange border on field)

| What You See | What It Means |
|---|---|
| Orange border on Card Number | Card number failed format check — likely a typo or unsupported card type |
| Orange border on Expiration | Invalid or past expiration date |
| Orange border on CVV | CVV must be 3 digits (Visa/MC) or 4 digits (Amex) |

> **Note:** Orange borders are local validation only. They don't "remember" previous failed attempts. Each entry is checked independently.

---

## After Clicking Pay Now

| Error Message | What It Means | What to Tell the Client |
|---|---|---|
| **Authentication Failed** | API key misconfiguration (our side) | "We're experiencing a technical issue — please call us at (505) 888-2034" |
| **Payment Token does not exist** | Token expired or environment mismatch (our side) | "Please refresh the page and try again" |
| **Activity limit exceeded** | Too many attempts in a short period — NMI fraud controls | "Please wait 15-30 minutes and try again" |
| **Invalid Merchant ID** | Account-level issue at NMI/processor | Contact NMI support immediately — this blocks ALL payments |
| **DECLINE** | Card was declined by the issuing bank | "Please try a different card or contact your bank" |
| **Card restricted** | Corporate/prepaid card has spending restrictions | "Your card issuer has restrictions on this transaction type — contact them or use a different card" |
| **Insufficient funds** | Not enough balance on the card | "Please try a different card" |
| **Pick up card** | Bank flagged the card — possible fraud | "Please contact your card issuer" |
| **Do not honor** | Generic bank decline | "Please contact your bank or try a different card" |
| **Invalid card number** | Card number doesn't match any known bank | "Please double-check your card number" |
| **Expired card** | Card is past its expiration date | "This card is expired — please use a current card" |
| **Connection error** | Browser couldn't reach the payment function | "Please check your internet connection and try again" |
| **Connection timeout** | Collect.js took too long to load | "Please refresh the page and try again" |
| **Payment system failed to load** | Collect.js script blocked (ad blocker, firewall, etc.) | "Please disable ad blockers or try a different browser" |

---

## NMI Response Codes

| Code | Meaning |
|---|---|
| 1 | Approved |
| 2 | Declined |
| 3 | Error (configuration or system issue) |

---

## Troubleshooting Checklist

1. **Is it just one client or all clients?**
   - One client = card issue (have them try a different card or call their bank)
   - All clients = NMI account issue (check NMI portal, contact support)

2. **Is Test Mode on in NMI?**
   - Settings > Test Mode — should be OFF for real transactions
   - Test mode can cause "Payment Token does not exist" errors

3. **Is the NMI_SECURITY_KEY set in Netlify?**
   - Netlify > Site configuration > Environment variables
   - Must be the PRIVATE API key (not the public tokenization key)

4. **Did the client use www vs non-www?**
   - Both should work (www redirects to non-www automatically)
   - If redirect isn't working, check netlify.toml

5. **Are ad blockers interfering?**
   - Some ad blockers block payment scripts
   - Client should try disabling extensions or use incognito mode

---

## Key Contacts

- **NMI Support**: Check NMI portal for support contact
- **MGS Team**: team@mgscommunications.com / (505) 888-2034
- **Netlify Dashboard**: app.netlify.com (for environment variables, deploy logs)

---

*Last updated: March 5, 2026*
