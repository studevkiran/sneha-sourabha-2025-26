# 🎉 Sneha Sourabha 2025-26
## Rotary District 3181 Conference Registration Website

A premium, celebration-worthy registration platform for high-value Rotary delegates.

### Event Details
- **Event:** Sneha Sourabha - Rotary District 3181 Conference
- **Dates:** 30th & 31st January, 01st February 2026
- **Venue:** Silent Shores Convention Hall, Hebbal, Mysore

### Features
✨ Premium UI/UX with smooth animations  
🎨 Rotary-themed colors (Blue, Gold, White)  
💳 UPI QR code payment integration  
📊 Comprehensive admin dashboard  
📧 Automated email confirmations  
📱 Fully responsive design  
🔐 Secure admin authentication  
☁️ Cloud-based data storage (Vercel KV)  

### Tech Stack
- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom animations
- **Icons:** Lucide React
- **Database:** Vercel KV (Redis)
- **Hosting:** Vercel
- **Version Control:** GitHub

### Getting Started

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

#### 3. Run Development Server
```bash
npm run dev
```

#### 4. Open Browser
Visit [http://localhost:3000](http://localhost:3000)

### Project Structure
```
sneha-sourabha-2025-26/
├── app/
│   ├── page.tsx                    # Homepage with hero
│   ├── register/
│   │   └── page.tsx                # Registration flow
│   ├── payment/
│   │   └── page.tsx                # Payment submission
│   ├── success/
│   │   └── page.tsx                # Confirmation page
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx            # Admin authentication
│   │   └── dashboard/
│   │       └── page.tsx            # Registration management
│   └── api/
│       ├── register/
│       │   └── route.ts            # Registration submission
│       ├── verify-payment/
│       │   └── route.ts            # Payment verification
│       └── admin/
│           ├── auth/
│           │   └── route.ts        # Admin authentication
│           └── registrations/
│               └── route.ts        # Get all registrations
├── components/
│   ├── Hero.tsx                    # Premium hero section
│   ├── RegistrationTypeSelector.tsx # Registration type cards
│   ├── RegistrationForm.tsx        # Personal details form
│   ├── PaymentUpload.tsx           # Payment proof upload
│   └── AdminDashboard.tsx          # Admin panel
└── lib/
    ├── types.ts                    # TypeScript interfaces
    ├── constants.ts                # Registration types, clubs
    └── utils.ts                    # Helper functions
```

### Registration Types
1. Rotarian - ₹4,500
2. Rotarian with Spouse - ₹7,500
3. Ann - ₹3,500
4. Annet - ₹2,000
5. Guest - ₹4,500
6. Silver Donor - ₹20,000
7. Silver Sponsor - ₹25,000
8. Gold Sponsor - ₹50,000
9. Platinum Sponsor - ₹75,000
10. Patron Sponsor - ₹1,00,000

### Deployment

#### Deploy to Vercel
1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Import to Vercel
- Go to [vercel.com](https://vercel.com)
- Import GitHub repository
- Configure environment variables
- Deploy!

### Environment Variables (Production)
```
NEXT_PUBLIC_UPI_ID=Vyapar.173031740517@hdfcbank
NEXT_PUBLIC_BUSINESS_NAME=Rotary District 3181
ADMIN_PASSWORD=your_strong_password
KV_URL=your_vercel_kv_url
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_api_token
```

### Admin Dashboard Access
- URL: `/admin/login`
- Password: Set in environment variables

### Support
For technical assistance or questions:
- GitHub Issues
- Email: support@example.com

---

**Built with ❤️ for Rotary District 3181**  
*Service Above Self*

---

**Version:** 1.0.0  
**Last Updated:** October 22, 2025