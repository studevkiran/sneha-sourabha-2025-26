# Payment Flow Guide - Sneha Sourabha Registration

## Overview
The registration payment flow has been redesigned to provide a professional, step-by-step experience with proper review, payment, and receipt generation.

## Flow Steps

### 1. Registration Details (`/register/details`)
- User fills in all required information
- Form validates all fields
- On submit, redirects to Review and Pay page

### 2. Review and Pay (`/register/confirm`)
**Initial View:**
- Shows "Review and Pay" heading
- Displays all registration details for review:
  - Registration type and amount
  - Personal information (name, mobile, email, club)
  - Meal preference
  - Spouse/children (if applicable)
- **Pay Now** button prominently displayed

### 3. QR Code Payment Modal
**When user clicks "Pay Now":**
- Modal popup appears with:
  - UPI QR code (scannable, with amount and details pre-filled)
  - UPI ID displayed (gen-z@slc)
  - Amount shown prominently
  - "Open in UPI App" button for mobile users
  - Payment form with two required fields:
    - **UPI Transaction ID** (from user's payment app after completing payment)
    - **UPI ID** (user's own UPI identifier)
  - Submit button to confirm payment details

### 4. Final Receipt View
**After submitting payment details:**
- Modal closes
- Page heading changes to "Payment Confirmation"
- Professional receipt displayed with:
  
  **Header Section:**
  - Sneha Sourabha logo
  - "District Conference 2025-26" title
  - Receipt ID (auto-generated)
  - Download date and time
  
  **Registration Details:**
  - All participant information
  - Registration type and benefits
  - Amount paid
  
  **Payment Information:**
  - UPI Transaction ID (as entered by user)
  - UPI ID (as entered by user)
  
  **Footer:**
  - Thank you message
  - Contact information

### 5. Download Options
Three download methods available:
1. **Download PDF** - Creates a PDF document of the receipt
2. **Download Image** - Saves receipt as PNG image
3. **Print Receipt** - Opens browser print dialog

## Technical Details

### Environment Variables Required
```env
NEXT_PUBLIC_UPI_VPA=gen-z@slc
NEXT_PUBLIC_UPI_NAME=Sneha Sourabha
```

### Key Features
- ✅ Clean, step-by-step flow
- ✅ Payment details captured before showing receipt
- ✅ Professional receipt with header/logo
- ✅ Download timestamp automatically added
- ✅ Multiple download formats (PDF, PNG, Print)
- ✅ Mobile-responsive design
- ✅ QR code with UPI deeplink for instant payment
- ✅ Validation on all payment fields

### Receipt Design
- White background for printing
- Professional header with logo and conference branding
- Grid layout for easy reading
- Color-coded sections (green for amount, gray for labels)
- Print-friendly styling

## User Journey Example

1. User fills registration form → clicks "Submit"
2. Sees review page with all details → clicks "Pay Now"
3. QR modal opens → scans QR or clicks "Open in UPI App"
4. Completes payment in UPI app (gets transaction ID)
5. Returns to browser → enters transaction ID and UPI ID
6. Clicks "Submit Payment Details"
7. Modal closes → sees complete receipt with all info
8. Downloads PDF/image or prints receipt
9. Registration complete!

## Server Info
- Dev server: http://127.0.0.1:3002
- Main route: /register/confirm
- Compiled and ready to test

## Next Steps (Optional Backend Integration)
- Save payment details to database
- Send confirmation email with receipt
- Admin dashboard to verify payments
- Payment status tracking
