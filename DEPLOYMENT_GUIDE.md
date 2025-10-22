# 🚀 Deployment Guide - Sneha Sourabha 2025-26

## Complete guide to deploy your registration system to Vercel with Postgres database

---

## 📋 Prerequisites

1. **GitHub Account** (free)
2. **Vercel Account** (free) - Sign up at [vercel.com](https://vercel.com)
3. **Your project code** pushed to GitHub

---

## 🎯 Step 1: Push Code to GitHub

```bash
cd /Applications/projects/sneha-sourabha-2025-26

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Sneha Sourabha registration system"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/sneha-sourabha-2025-26.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `sneha-sourabha-2025-26` repository
5. Click **"Import"**
6. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build` (leave default)
   - Output Directory: `.next` (leave default)

7. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_UPI_VPA=gen-z@slc
   NEXT_PUBLIC_UPI_NAME=Sneha Sourabha
   ```

8. Click **"Deploy"**
9. Wait 2-3 minutes for deployment to complete

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Applications/projects/sneha-sourabha-2025-26
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (Your username)
# - Link to existing project? No
# - Project name: sneha-sourabha-2025-26
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_UPI_VPA
# Enter value: gen-z@slc

vercel env add NEXT_PUBLIC_UPI_NAME
# Enter value: Sneha Sourabha

# Deploy to production
vercel --prod
```

---

## 🗄️ Step 3: Set Up Vercel Postgres Database

### 1. Create Database

1. Go to your project in Vercel Dashboard
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Choose **"Hobby (Free)"** plan
6. Database name: `sneha-sourabha-db`
7. Region: Choose closest to India (e.g., Singapore)
8. Click **"Create"**

### 2. Connect Database to Project

1. Vercel will automatically add these environment variables:
   ```
   POSTGRES_URL
   POSTGRES_PRISMA_URL
   POSTGRES_URL_NON_POOLING
   POSTGRES_USER
   POSTGRES_HOST
   POSTGRES_PASSWORD
   POSTGRES_DATABASE
   ```

2. Click **"Deployments"** tab
3. Click **"Redeploy"** to apply database connection

### 3. Initialize Database Tables

After deployment completes:

1. Go to your deployed site: `https://YOUR_PROJECT.vercel.app`
2. Open this URL in browser:
   ```
   https://YOUR_PROJECT.vercel.app/api/db/init
   ```
3. You should see:
   ```json
   {"success":true,"message":"Database initialized successfully"}
   ```

**This creates all necessary tables!** ✅

---

## ✅ Step 4: Test Your System

### Test Registration Flow

1. Go to `https://YOUR_PROJECT.vercel.app`
2. Click **"Register Now"**
3. Select a registration type
4. Fill in details form
5. Click **"Review Details"**
6. Click **"Pay Now"** - QR code modal appears
7. Enter dummy transaction details:
   - UPI Transaction ID: `TEST123456789`
   - UPI ID: `test@okaxis`
8. Click **"Submit Payment Details"**
9. You should see a receipt with **Registration Number** (e.g., SS2026-00001)

### Verify Database Entry

1. Go to Vercel Dashboard → Your Project → Storage → `sneha-sourabha-db`
2. Click **"Data"** tab
3. Click **"Browse Data"** → `registrations` table
4. You should see your test registration! 🎉

---

## 📊 Step 5: Access Admin Dashboard (Coming Soon)

The admin dashboard to view/manage registrations will be at:
```
https://YOUR_PROJECT.vercel.app/admin
```

*(Admin dashboard implementation in progress)*

---

## 🔒 Step 6: Secure Your Database

### Change Default Credentials

The database is automatically secured by Vercel. Only your Vercel project can access it.

### Optional: Add Admin Authentication

We'll add password-protected admin access in the next update.

---

## 📱 Step 7: Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel Dashboard → Your Project → **Settings**
2. Click **"Domains"**
3. Enter your domain (e.g., `register.snehasourabha.in`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic, ~10 minutes)

---

## 🎯 What You Get (FREE Tier Limits)

### Vercel Hobby Plan (FREE)
- ✅ **Bandwidth**: 100 GB/month (enough for 5,000+ registrations)
- ✅ **Serverless Functions**: 1M invocations/month
- ✅ **Deployments**: Unlimited
- ✅ **SSL**: Automatic HTTPS
- ✅ **CDN**: Global edge network

### Vercel Postgres (FREE)
- ✅ **Storage**: 256 MB (holds 50,000+ registrations)
- ✅ **Compute**: 60 hours/month
- ✅ **Rows**: Unlimited
- ✅ **Queries**: Unlimited

**For 5,000 registrations, you'll use less than 10% of free limits!** 🚀

---

## 🛠️ Maintenance & Updates

### Update Your Deployed Site

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main

# Vercel automatically deploys!
```

### View Deployment Logs

1. Go to Vercel Dashboard → Your Project
2. Click **"Deployments"** tab
3. Click on any deployment to see logs

### Monitor Database

1. Go to Vercel Dashboard → Storage → `sneha-sourabha-db`
2. Click **"Insights"** to see:
   - Total registrations
   - Storage used
   - Query performance

---

## 🆘 Troubleshooting

### Issue: "Database connection failed"

**Solution:**
1. Check environment variables are set correctly
2. Redeploy project from Vercel Dashboard
3. Wait 1-2 minutes for database to activate

### Issue: "Registration submission failed"

**Solution:**
1. Check browser console for errors
2. Verify `/api/db/init` was called successfully
3. Check Vercel function logs in Dashboard

### Issue: "Duplicate registration error"

**Solution:**
This is expected! Same email+mobile can't register twice (prevents duplicate entries)

---

## 📞 Support

### Check Status
- Registration count: View in Vercel Dashboard → Storage → Data
- Error logs: Vercel Dashboard → Deployments → Function Logs

### Database Queries (Advanced)

Go to Vercel Dashboard → Storage → `sneha-sourabha-db` → **Query** tab:

```sql
-- Count total registrations
SELECT COUNT(*) FROM registrations;

-- Count by payment status
SELECT payment_status, COUNT(*) 
FROM registrations 
GROUP BY payment_status;

-- View recent registrations
SELECT * FROM registrations 
ORDER BY created_at DESC 
LIMIT 10;

-- Total amount (verified only)
SELECT SUM(registration_amount) 
FROM registrations 
WHERE payment_status = 'verified';
```

---

## 🎉 You're Live!

Your registration system is now:
- ✅ Live at `https://YOUR_PROJECT.vercel.app`
- ✅ Connected to Postgres database
- ✅ Accepting registrations 24/7
- ✅ Saving payment details
- ✅ Ready for 5,000+ participants
- ✅ Costing you ₹0

**Share the link with your 91 clubs!** 🎊

---

## 📝 Next Steps

1. **Test thoroughly** with dummy registrations
2. **Share link** with a small test group first
3. **Monitor** first 10-20 registrations
4. **Launch publicly** to all 91 clubs
5. **Use admin dashboard** (coming soon) to verify payments

---

## 📊 Expected Usage (5,000 Registrations)

| Resource | Used | Available | Usage % |
|----------|------|-----------|---------|
| Database Storage | ~2.5 MB | 256 MB | 1% |
| Bandwidth | ~25 GB | 100 GB | 25% |
| Function Calls | ~25,000 | 1,000,000 | 2.5% |

**All well within FREE tier limits!** ✅
