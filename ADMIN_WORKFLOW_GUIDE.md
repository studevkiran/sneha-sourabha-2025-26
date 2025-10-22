# Admin Guide: Approve Registrations & Send Notifications

## Overview
This guide explains how to verify payment details, approve/reject registrations, and send confirmation emails/SMS to registrants.

---

## Step 1: View All Registrations

### API Endpoint
```
GET /api/admin/registrations
Authorization: Bearer sneha2026
```

### Using cURL
```bash
curl -X GET "https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations" \
  -H "Authorization: Bearer sneha2026"
```

### Filter Options
```bash
# Filter by payment status
curl -X GET "https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?payment_status=pending" \
  -H "Authorization: Bearer sneha2026"

# Filter by registration type
curl -X GET "https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?registration_type=rotarian" \
  -H "Authorization: Bearer sneha2026"

# Search by name, email, or mobile
curl -X GET "https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?search=john" \
  -H "Authorization: Bearer sneha2026"
```

### Response Example
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "registration_number": "SS2026-00001",
      "name": "John Doe",
      "email": "john@example.com",
      "mobile": "+919876543210",
      "club": "Rotary Club of Example",
      "registration_type": "rotarian",
      "registration_amount": 4500,
      "meal_preference": "Vegetarian",
      "spouse_name": null,
      "children_count": 0,
      "upi_transaction_id": "123456789012",
      "upi_id": "john@upi",
      "payment_status": "pending",
      "verified_by": null,
      "verified_at": null,
      "admin_notes": null,
      "notification_sent": false,
      "created_at": "2025-10-23T10:30:00.000Z"
    }
  ]
}
```

---

## Step 2: Verify Payment Details

### Manual Verification Process
1. **Check UPI Transaction ID**: Verify the transaction ID in your payment gateway/bank statement
2. **Check Amount**: Confirm the amount matches the registration type
3. **Check UPI ID**: Verify the sender's UPI ID
4. **Check Timing**: Ensure payment was made around the registration time

### Payment Status Options
- `pending` - Awaiting verification (default)
- `verified` - Payment confirmed, registration approved ✅
- `rejected` - Payment issue, registration denied ❌

---

## Step 3: Approve or Reject Registration

### API Endpoint
```
PATCH /api/admin/registrations
Authorization: Bearer sneha2026
```

### Approve Registration (Verify Payment)
```bash
curl -X PATCH "https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations" \
  -H "Authorization: Bearer sneha2026" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "payment_status": "verified",
    "verified_by": "Admin Name",
    "admin_notes": "Payment verified in bank statement"
  }'
```

### Reject Registration
```bash
curl -X PATCH "https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations" \
  -H "Authorization: Bearer sneha2026" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "payment_status": "rejected",
    "verified_by": "Admin Name",
    "admin_notes": "Payment not found in bank statement. Please contact support."
  }'
```

### Response Example
```json
{
  "success": true,
  "message": "Payment status updated to verified",
  "data": {
    "id": 1,
    "registration_number": "SS2026-00001",
    "payment_status": "verified",
    "verified_by": "Admin Name",
    "verified_at": "2025-10-23T11:00:00.000Z",
    "admin_notes": "Payment verified in bank statement"
  }
}
```

---

## Step 4: Send Confirmation Email/SMS

### API Endpoint
```
POST /api/admin/send-notification
Authorization: Bearer sneha2026
```

### Send Approval Notification
```bash
curl -X POST "https://sneha-sourabha-2025-26.vercel.app/api/admin/send-notification" \
  -H "Authorization: Bearer sneha2026" \
  -H "Content-Type: application/json" \
  -d '{
    "registration_id": 1,
    "notification_type": "email_sms",
    "status": "verified"
  }'
```

### Send Rejection Notification
```bash
curl -X POST "https://sneha-sourabha-2025-26.vercel.app/api/admin/send-notification" \
  -H "Authorization: Bearer sneha2026" \
  -H "Content-Type: application/json" \
  -d '{
    "registration_id": 1,
    "notification_type": "email_sms",
    "status": "rejected"
  }'
```

### Response Example
```json
{
  "success": true,
  "message": "Notification prepared (check server logs for content)",
  "notification": {
    "to": {
      "email": "john@example.com",
      "mobile": "+919876543210"
    },
    "subject": "✅ Registration Confirmed - Sneha Sourabha 2025-26",
    "preview": "Dear John Doe,\n\nYour registration for Sneha Sourabha - District Conference 2025-26 has been C..."
  }
}
```

---

## Complete Workflow Example

### Scenario: Approve a pending registration and send confirmation

```bash
# Step 1: Get pending registrations
curl -X GET "https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?payment_status=pending" \
  -H "Authorization: Bearer sneha2026"

# Step 2: Review the payment details manually
# Check UPI transaction ID: 123456789012
# Verify in bank statement: ✅ Found

# Step 3: Approve the registration
curl -X PATCH "https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations" \
  -H "Authorization: Bearer sneha2026" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "payment_status": "verified",
    "verified_by": "Admin Kiran",
    "admin_notes": "UPI txn verified: 123456789012. Amount: ₹4500"
  }'

# Step 4: Send confirmation notification
curl -X POST "https://sneha-sourabha-2025-26.vercel.app/api/admin/send-notification" \
  -H "Authorization: Bearer sneha2026" \
  -H "Content-Type: application/json" \
  -d '{
    "registration_id": 1,
    "notification_type": "email_sms",
    "status": "verified"
  }'
```

---

## Notification Templates

### Approval Email/SMS Template
```
Subject: ✅ Registration Confirmed - Sneha Sourabha 2025-26

Dear [Name],

Your registration for Sneha Sourabha - District Conference 2025-26 has been CONFIRMED!

Registration Details:
• Registration Number: [Registration Number]
• Type: [Registration Type]
• Amount: ₹[Amount]
• Payment Status: VERIFIED ✅

Your payment has been verified and your registration is now complete. You will receive further details about the event shortly.

Thank you for registering!

Best regards,
Sneha Sourabha Organizing Committee
```

### Rejection Email/SMS Template
```
Subject: ⚠️ Registration Payment Issue - Sneha Sourabha 2025-26

Dear [Name],

We encountered an issue with your registration payment for Sneha Sourabha - District Conference 2025-26.

Registration Number: [Registration Number]
Reason: [Admin Notes]

Please contact the organizing committee to resolve this issue:
• Email: snehasourabha2026@gmail.com
• Phone: +91-XXXXXXXXXX

We're here to help!

Best regards,
Sneha Sourabha Organizing Committee
```

---

## Setting Up Email/SMS Integration (Future)

### Currently
The system **logs notifications to the console** on Vercel. You can view them in:
- Vercel Dashboard → Your Project → Logs
- Real-time logs during API calls

### To Enable Real Email/SMS (Phase 2)

#### Option 1: Email via Resend (Recommended)
```bash
npm install resend
```

Add to `.env`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Update `send-notification/route.ts`:
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Sneha Sourabha <noreply@snehasourabha.com>',
  to: registration.email,
  subject: subject,
  text: message,
});
```

#### Option 2: SMS via Twilio
```bash
npm install twilio
```

Add to `.env`:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

Update `send-notification/route.ts`:
```typescript
import twilio from 'twilio';
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

await client.messages.create({
  body: message,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: registration.mobile,
});
```

#### Option 3: Indian SMS Services (MSG91, 2Factor, etc.)
For SMS in India, consider:
- **MSG91**: https://msg91.com
- **2Factor**: https://2factor.in
- **Kaleyra**: https://www.kaleyra.com

---

## Database Schema Updates

### Add notification columns (already included in schema)
```sql
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS notification_sent_at TIMESTAMP;
```

---

## Security Notes

1. **Never expose the admin password** (`sneha2026`) in client-side code
2. **Always use HTTPS** for API calls (Vercel provides this automatically)
3. **Keep server logs private** (they contain user data)
4. **Consider IP whitelisting** for admin endpoints in production
5. **Rotate admin password** periodically

---

## Quick Reference

### API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/registrations` | List all registrations |
| PATCH | `/api/admin/registrations` | Update payment status |
| POST | `/api/admin/send-notification` | Send email/SMS |
| GET | `/api/admin/stats` | Get statistics |

### Payment Status Values
- `pending` - Default, awaiting verification
- `verified` - Approved ✅
- `rejected` - Denied ❌

### Authorization Header
```
Authorization: Bearer sneha2026
```

---

## Testing in Browser Console

You can also test the API directly from your browser console:

```javascript
// View pending registrations
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?payment_status=pending', {
  headers: { 'Authorization': 'Bearer sneha2026' }
})
.then(r => r.json())
.then(console.log);

// Approve a registration
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer sneha2026',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 1,
    payment_status: 'verified',
    verified_by: 'Admin',
    admin_notes: 'Payment verified'
  })
})
.then(r => r.json())
.then(console.log);

// Send notification
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/send-notification', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sneha2026',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    registration_id: 1,
    notification_type: 'email_sms',
    status: 'verified'
  })
})
.then(r => r.json())
.then(console.log);
```

---

## Support

For technical issues or questions:
- Check Vercel deployment logs
- Review database queries in Vercel Postgres dashboard
- Test API endpoints using the examples above

---

**Last Updated**: October 23, 2025
