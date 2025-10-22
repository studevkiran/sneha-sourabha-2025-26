# 🚀 Quick Start: Admin Operations

## Initial Setup (Run Once)

### Step 1: Add Notification Columns
Visit this URL in your browser:
```
https://sneha-sourabha-2025-26.vercel.app/api/db/add-notification-columns
```

Expected response:
```json
{
  "success": true,
  "message": "Notification columns added successfully"
}
```

---

## Daily Admin Workflow

### 1️⃣ View Pending Registrations

**Browser Console Method:**
```javascript
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?payment_status=pending', {
  headers: { 'Authorization': 'Bearer sneha2026' }
})
.then(r => r.json())
.then(data => console.table(data.data));
```

**Copy the ID of the registration you want to process**

---

### 2️⃣ Approve Registration

**Browser Console Method:**
```javascript
// Replace ID with actual registration ID
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer sneha2026',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 1,  // ← CHANGE THIS
    payment_status: 'verified',
    verified_by: 'Admin Kiran',
    admin_notes: 'Payment verified in bank statement'
  })
})
.then(r => r.json())
.then(console.log);
```

---

### 3️⃣ Send Confirmation Email/SMS

**Browser Console Method:**
```javascript
// Replace registration_id with actual ID
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/send-notification', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sneha2026',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    registration_id: 1,  // ← CHANGE THIS
    notification_type: 'email_sms',
    status: 'verified'
  })
})
.then(r => r.json())
.then(console.log);
```

**Note**: Currently logs to Vercel console. Check: Vercel Dashboard → Logs

---

## Reject Registration

### If Payment Not Found

```javascript
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer sneha2026',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 1,  // ← CHANGE THIS
    payment_status: 'rejected',
    verified_by: 'Admin Kiran',
    admin_notes: 'Payment not found. Please contact support with correct transaction ID.'
  })
})
.then(r => r.json())
.then(console.log);

// Then send rejection notification
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/send-notification', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sneha2026',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    registration_id: 1,  // ← CHANGE THIS
    notification_type: 'email_sms',
    status: 'rejected'
  })
})
.then(r => r.json())
.then(console.log);
```

---

## View Statistics

```javascript
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/stats', {
  headers: { 'Authorization': 'Bearer sneha2026' }
})
.then(r => r.json())
.then(console.log);
```

---

## Search Specific Registration

### By Name
```javascript
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?search=John', {
  headers: { 'Authorization': 'Bearer sneha2026' }
})
.then(r => r.json())
.then(data => console.table(data.data));
```

### By Email
```javascript
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?search=john@example.com', {
  headers: { 'Authorization': 'Bearer sneha2026' }
})
.then(r => r.json())
.then(data => console.table(data.data));
```

### By Registration Number
```javascript
fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?search=SS2026-00001', {
  headers: { 'Authorization': 'Bearer sneha2026' }
})
.then(r => r.json())
.then(data => console.table(data.data));
```

---

## Batch Process Multiple Registrations

```javascript
// Get all pending
const response = await fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations?payment_status=pending', {
  headers: { 'Authorization': 'Bearer sneha2026' }
});
const { data } = await response.json();

// Process each one
for (const reg of data) {
  console.log(`Processing: ${reg.name} (ID: ${reg.id})`);
  
  // Verify manually, then approve
  const approved = confirm(`Approve ${reg.name}? (UPI: ${reg.upi_transaction_id})`);
  
  if (approved) {
    await fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/registrations', {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer sneha2026',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: reg.id,
        payment_status: 'verified',
        verified_by: 'Admin Kiran',
        admin_notes: 'Bulk verification'
      })
    });
    
    // Send notification
    await fetch('https://sneha-sourabha-2025-26.vercel.app/api/admin/send-notification', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sneha2026',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        registration_id: reg.id,
        notification_type: 'email_sms',
        status: 'verified'
      })
    });
    
    console.log(`✅ Approved: ${reg.name}`);
  }
}
```

---

## Notification Content Preview

### Approval Message
```
Subject: ✅ Registration Confirmed - Sneha Sourabha 2025-26

Dear [Name],

Your registration for Sneha Sourabha - District Conference 2025-26 has been CONFIRMED!

Registration Details:
• Registration Number: SS2026-00001
• Type: Rotarian
• Amount: ₹4500
• Payment Status: VERIFIED ✅

Your payment has been verified and your registration is now complete.

Thank you for registering!
```

### Rejection Message
```
Subject: ⚠️ Registration Payment Issue - Sneha Sourabha 2025-26

Dear [Name],

We encountered an issue with your registration payment.

Registration Number: SS2026-00001
Reason: [Admin notes shown here]

Please contact: snehasourabha2026@gmail.com
```

---

## Where to View Sent Notifications

Currently, notifications are logged to the Vercel console:

1. Go to: https://vercel.com/dashboard
2. Select your project: **sneha-sourabha-2025-26**
3. Click **Logs** tab
4. Look for entries with `=== NOTIFICATION TO SEND ===`

You'll see:
- Recipient email & mobile
- Subject line
- Full message content

---

## Security Reminders

- **Admin Password**: `sneha2026` (keep it secret!)
- **Authorization Header**: `Bearer sneha2026`
- **Use HTTPS only** (automatic on Vercel)
- **Don't share logs** (contain user data)

---

## Troubleshooting

### "Unauthorized" Error
✅ Check authorization header: `Authorization: Bearer sneha2026`

### "Registration not found"
✅ Verify the ID exists in the database

### Notifications not appearing
✅ Check Vercel logs (Dashboard → Project → Logs)

### Need real email/SMS?
✅ See `ADMIN_WORKFLOW_GUIDE.md` for integration instructions

---

## Next Steps: Enable Real Email/SMS

### Option 1: Resend (Email) - $0/month for 3,000 emails
1. Sign up: https://resend.com
2. Get API key
3. Add to Vercel env: `RESEND_API_KEY`
4. Update send-notification code (see guide)

### Option 2: MSG91 (SMS India) - Pay as you go
1. Sign up: https://msg91.com
2. Get API key
3. Add to Vercel env: `MSG91_API_KEY`
4. Update send-notification code (see guide)

---

**For full details, see: `ADMIN_WORKFLOW_GUIDE.md`**
