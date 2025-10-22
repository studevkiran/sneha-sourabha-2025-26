# 🚀 Complete Vercel Deployment & Database Setup Guide

## 📋 What You'll Do (25 Minutes Total)

1. ✅ **Push to GitHub** (Already Done!)
2. 🌐 **Deploy to Vercel** (5 minutes)
3. 💾 **Create Postgres Database** (3 minutes)
4. ⚙️ **Configure Environment Variables** (2 minutes)
5. 🔄 **Redeploy with Database** (2 minutes)
6. 🎯 **Initialize Database** (1 minute)
7. ✅ **Test Registration** (5 minutes)
8. 🎊 **Go Live!**

---

## PART 1: Deploy to Vercel (First Time)

### Step 1: Sign In to Vercel

1. Go to **[https://vercel.com](https://vercel.com)**
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### Step 2: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find **`sneha-sourabha-2025-26`** in the list
3. Click **"Import"**

### Step 3: Configure Build Settings

**Framework Preset:** Next.js (auto-detected) ✅  
**Root Directory:** `./` (leave as is) ✅  
**Build Command:** `next build` (auto-detected) ✅  
**Output Directory:** `.next` (auto-detected) ✅

### Step 4: Add Environment Variables

Before deploying, click **"Environment Variables"** and add:

```
NEXT_PUBLIC_UPI_VPA=gen-z@slc
NEXT_PUBLIC_UPI_NAME=Sneha Sourabha
ADMIN_PASSWORD=sneha2026
```

**Important:** Change `ADMIN_PASSWORD` to something secure later!

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes (Vercel will build your app)
3. When done, you'll see **"🎉 Congratulations!"**
4. Your site is live at: `https://your-project-name.vercel.app`

**Note:** Copy this URL - you'll need it!

---

## PART 2: Create Postgres Database

### Step 1: Go to Storage Tab

1. In your Vercel project dashboard
2. Click **"Storage"** tab (top menu)
3. Click **"Create Database"**

### Step 2: Select Postgres

1. Choose **"Postgres"** card
2. Click **"Continue"**

### Step 3: Configure Database

**Database Name:** `sneha-sourabha-db` (or any name you like)  
**Region:** Choose **closest to India** (Singapore or Mumbai if available)  
**Plan:** Select **"Hobby - FREE"** ✅

Click **"Create"**

### Step 4: Connect to Project

1. Vercel will ask: **"Connect to a project?"**
2. Select your project: **`sneha-sourabha-2025-26`**
3. Click **"Connect"**

**✅ Done!** Vercel automatically adds database environment variables to your project.

---

## PART 3: Redeploy with Database

### Step 1: Trigger New Deployment

1. Go to **"Deployments"** tab
2. Click **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Check ✅ **"Use existing Build Cache"** (faster)
5. Click **"Redeploy"**

Wait 1-2 minutes for build to complete.

**Why redeploy?** Database variables were added after first deployment. Redeploy picks them up.

---

## PART 4: Initialize Database Tables

### Step 1: Visit Init Endpoint

Open your browser and go to:

```
https://your-project-name.vercel.app/api/db/init
```

Replace `your-project-name` with your actual Vercel URL.

### Step 2: Verify Success

You should see:

```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

**✅ Database tables created!**

### Troubleshooting:

**If you see error:**
- Check if database is connected (Vercel → Storage → should show database)
- Make sure you redeployed after adding database
- Check Vercel → Settings → Environment Variables (should have POSTGRES_* vars)

---

## PART 5: Test Your Registration Flow

### Step 1: Open Your Website

Go to: `https://your-project-name.vercel.app`

### Step 2: Complete a Test Registration

1. Click **"Register Now"**
2. Select any registration type (e.g., "Rotarian")
3. Fill in test details:
   - Name: `Test User`
   - Email: `test@example.com`
   - Mobile: `9999999999`
   - Club: `Test Club`
   - Meal: `Veg`
4. Click **"Review Details"**
5. Click **"Pay Now"**
6. Enter dummy payment info:
   - Transaction ID: `TEST123456`
   - UPI ID: `test@paytm`
7. Click **"Submit Payment Details"**

### Step 3: Check Registration Number

You should see a receipt with:
- ✅ Registration Number: `SS2026-00001`
- ✅ All your details
- ✅ Download buttons

**✅ Registration saved to database!**

---

## PART 6: View Registrations in Database

### Method 1: Vercel Dashboard (Easy)

1. Go to **Vercel Dashboard**
2. Click your project
3. Click **"Storage"** tab
4. Click your database name
5. Click **"Data"** tab
6. Click **"Browse Data"**
7. Select **`registrations`** table
8. See all entries! 🎉

### Method 2: Run SQL Queries

In Vercel Dashboard → Storage → Query tab:

```sql
-- View all registrations
SELECT * FROM registrations ORDER BY created_at DESC;

-- Count registrations
SELECT COUNT(*) as total FROM registrations;

-- Count by payment status
SELECT payment_status, COUNT(*) as count 
FROM registrations 
GROUP BY payment_status;

-- Find specific registration
SELECT * FROM registrations 
WHERE email = 'test@example.com';
```

---

## PART 7: Manage Registrations

### View All Registrations via API

Open terminal or use Postman:

```bash
curl -H "Authorization: Bearer sneha2026" \
  https://your-project-name.vercel.app/api/admin/registrations
```

### Get Statistics

```bash
curl -H "Authorization: Bearer sneha2026" \
  https://your-project-name.vercel.app/api/admin/stats
```

### Verify a Payment

```bash
curl -X PATCH \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sneha2026" \
  -d '{"id":1,"payment_status":"verified","verified_by":"Admin Name"}' \
  https://your-project-name.vercel.app/api/admin/registrations
```

### Export to Excel

1. Go to Vercel → Storage → Query
2. Run this query:
```sql
SELECT 
  id as "Reg #",
  name as "Name",
  email as "Email",
  mobile as "Mobile",
  club as "Club",
  registration_type as "Type",
  registration_amount as "Amount",
  meal_preference as "Meal",
  payment_status as "Status",
  upi_transaction_id as "Transaction ID",
  created_at as "Date"
FROM registrations
ORDER BY created_at DESC;
```
3. Click **"Export"** → **"CSV"**
4. Open in Excel!

---

## PART 8: Custom Domain (Optional)

### Step 1: Buy Domain (Optional)

If you want: `register.snehasourabha.in` instead of `your-project.vercel.app`

Buy from: GoDaddy, Namecheap, or any registrar

### Step 2: Add to Vercel

1. Go to **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions
4. Wait 24-48 hours for propagation

---

## 🔐 IMPORTANT: Security Checklist

### Before Going Live:

#### 1. Change Admin Password

1. Go to Vercel → Project → Settings → Environment Variables
2. Find `ADMIN_PASSWORD`
3. Click **"Edit"**
4. Change to strong password (min 12 characters)
5. Click **"Save"**
6. Redeploy (Deployments → Redeploy)

**Good passwords:**
- `Sneha2026!Conf#Admin`
- `D3181-SecurePass!2026`
- `MySecureAdminKey@2026`

#### 2. Test Duplicate Prevention

Try registering twice with same email + mobile.
Should show: `"This email and mobile combination is already registered"`

#### 3. Test on Mobile

Open your website on phone and complete registration.

---

## 📊 Monitor Your Deployment

### Check Deployment Logs

1. Vercel → Deployments → Click latest
2. Click **"Building"** or **"Functions"** tab
3. See all logs

### Check Database Usage

1. Vercel → Storage → Your Database
2. See storage used, queries, connections

### Check Bandwidth Usage

1. Vercel → Analytics
2. See visits, bandwidth

**Free Tier Limits:**
- 100 GB bandwidth/month
- 256 MB database storage
- 1M function calls/month

**Your usage (5000 registrations):**
- ~25 GB bandwidth ✅
- ~2.5 MB database ✅
- ~5,000 function calls ✅

**Well within limits!** 🎉

---

## 🆘 Troubleshooting

### Issue: "Database connection failed"

**Solution:**
1. Check if database is created (Storage tab)
2. Check if database is connected to project
3. Redeploy after adding database
4. Check environment variables exist

### Issue: "Cannot find module '@vercel/postgres'"

**Solution:**
1. Check `package.json` has `@vercel/postgres` dependency
2. Redeploy (Vercel will install dependencies)

### Issue: "Table does not exist"

**Solution:**
1. Visit `/api/db/init` to create tables
2. Check database was initialized successfully

### Issue: "Unauthorized" when calling admin API

**Solution:**
1. Add header: `Authorization: Bearer your-password`
2. Check password matches `ADMIN_PASSWORD` env variable

### Issue: Deployment fails

**Solution:**
1. Check build logs (Deployments → Click deployment → View Logs)
2. Look for error messages
3. Common issues:
   - TypeScript errors (fix in code)
   - Missing dependencies (check package.json)
   - Environment variables missing

### Issue: Registration not saving

**Solution:**
1. Check browser console for errors (F12)
2. Check API endpoint works: `/api/register`
3. Check database initialization: `/api/db/init`
4. Check Vercel logs for API errors

---

## ✅ Final Checklist

Before launching to 91 clubs:

- [ ] ✅ Deployed to Vercel
- [ ] ✅ Database created and connected
- [ ] ✅ Environment variables added
- [ ] ✅ Database initialized (`/api/db/init` called)
- [ ] ✅ Test registration completed
- [ ] ✅ Data visible in database (Vercel → Storage → Data)
- [ ] ✅ Registration number generated (SS2026-00001)
- [ ] ✅ Receipt downloads work (PDF & PNG)
- [ ] ✅ Admin password changed to secure password
- [ ] ✅ Tested on mobile device
- [ ] ✅ Duplicate prevention works
- [ ] ✅ Can view registrations in Vercel dashboard
- [ ] ✅ Can export data to CSV/Excel
- [ ] ✅ Admin API works with correct password

**All checked?** → **🎊 GO LIVE!**

---

## 🚀 Launch Strategy

### Phase 1: Soft Launch (Days 1-3)

1. Share with 2-3 test clubs
2. Monitor first 20 registrations
3. Check for any issues
4. Verify payment tracking works

### Phase 2: Gradual Rollout (Days 4-7)

1. Share with 10-15 clubs
2. Monitor 100+ registrations
3. Export data daily for records
4. Respond to any support queries

### Phase 3: Full Launch (Day 8+)

1. Announce to all 91 clubs
2. Share registration link on social media
3. Monitor daily registrations
4. Export data weekly for reports

---

## 📞 Support & Resources

### Important URLs

**Your Website:** `https://your-project-name.vercel.app`  
**Database Init:** `https://your-project-name.vercel.app/api/db/init`  
**Admin API:** `https://your-project-name.vercel.app/api/admin/registrations`  
**Stats API:** `https://your-project-name.vercel.app/api/admin/stats`

### Documentation

- **`DATABASE_INTEGRATION_SUMMARY.md`** - Technical details
- **`INTEGRATION_COMPLETE.md`** - Quick reference
- **`.env.example`** - Environment variables reference

### Vercel Resources

- **Docs:** [https://vercel.com/docs](https://vercel.com/docs)
- **Support:** [https://vercel.com/support](https://vercel.com/support)
- **Status:** [https://vercel-status.com](https://vercel-status.com)

---

## 🎊 Congratulations!

You now have a **production-ready registration system** handling:

✅ **5,000+ registrations**  
✅ **Real-time payment tracking**  
✅ **Automated registration numbers**  
✅ **Professional receipts**  
✅ **Admin management APIs**  
✅ **Data export capabilities**  
✅ **Mobile-responsive design**  
✅ **FREE hosting forever**

**Your District 3181 Conference registration is LIVE!** 🎉

---

## 📝 Quick Command Reference

```bash
# Check git status
git status

# Push new changes
git add .
git commit -m "Your message"
git push origin main

# Install new package (if needed)
npm install package-name

# Run locally
npm run dev

# View Vercel logs
vercel logs

# List Vercel projects
vercel list
```

---

**Need help?** Check the troubleshooting section or review the documentation files!

**Ready to go live?** Share your registration link with the 91 clubs! 🚀
