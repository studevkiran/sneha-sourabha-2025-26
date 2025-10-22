# 🗄️ Vercel Postgres Database Setup Guide

## Step 1: Create Database in Vercel

1. **Go to your Vercel Project Dashboard**
   - URL: `https://vercel.com/[your-username]/[project-name]`

2. **Click on the "Storage" tab** (top navigation)

3. **Click "Create Database"**

4. **Select "Postgres"**
   - It will show: **Vercel Postgres** (Powered by Neon)

5. **Choose your database location**
   - **Recommended**: Select **nearest region** (e.g., Mumbai for India, Singapore for Asia)
   - This affects latency

6. **Database name**: Use the default or name it `sneha_sourabha_db`

7. **Click "Create"**
   - Wait 30-60 seconds for provisioning

---

## Step 2: Connect Database to Your Project

After database creation, you'll see:

### ✅ Automatic Connection
Vercel will show a message like:
```
✓ Database created successfully
✓ Environment variables automatically added to your project
```

The following environment variables are **automatically added**:
- `POSTGRES_URL` ← Main connection string
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 🔍 Verify Environment Variables

1. Go to **Settings** → **Environment Variables**
2. You should see all `POSTGRES_*` variables listed
3. **DO NOT modify or delete these** - they're auto-managed

---

## Step 3: Redeploy Your Application

After database is connected:

### Option A: Automatic Redeploy
- Vercel usually triggers an automatic redeployment
- Check **Deployments** tab - you should see a new deployment starting

### Option B: Manual Redeploy (if needed)
1. Go to **Deployments** tab
2. Click on the latest deployment (with 3 dots menu)
3. Click **"Redeploy"**
4. Select **"Use existing Build Cache"** ✅
5. Click **"Redeploy"**

---

## Step 4: Initialize Database Tables

Once deployment succeeds:

1. **Visit this URL** in your browser:
   ```
   https://your-domain.vercel.app/api/db/init
   ```

2. **You should see**:
   ```json
   {
     "success": true,
     "message": "Database initialized successfully"
   }
   ```

3. **This creates the `registrations` table** with all necessary columns

---

## Step 5: Test Registration Flow

1. Go to your live site: `https://your-domain.vercel.app`
2. Click **"Register"**
3. Fill in a test registration
4. Complete payment (test with small amount)
5. Check if registration number is generated (e.g., `SS2026-00001`)

---

## 🔍 Troubleshooting

### Error: "missing_connection_string"
**Cause**: Database not connected or env vars not set

**Fix**:
1. Go to Storage tab → Click your database
2. Click **"Connect Project"**
3. Select your project from dropdown
4. Click **"Connect"**
5. Redeploy

### Error: "relation 'registrations' does not exist"
**Cause**: Database tables not initialized

**Fix**:
1. Visit `/api/db/init` endpoint (Step 4 above)
2. Refresh and try again

### Error: "Database connection failed"
**Cause**: Wrong region or connection issue

**Fix**:
1. Check database region matches your deployment region
2. Try redeploying
3. Check Vercel logs for detailed error

---

## 📊 View Database Data

### Option 1: Vercel Dashboard (Easiest)
1. Go to **Storage** tab
2. Click on your database
3. Click **"Data"** tab
4. Browse tables and records

### Option 2: Using SQL Query
1. Go to **Storage** → Your Database → **Query** tab
2. Run SQL:
   ```sql
   SELECT * FROM registrations ORDER BY created_at DESC LIMIT 10;
   ```

---

## 🔐 Security Notes

✅ **Good practices**:
- Database credentials are auto-managed by Vercel
- Connection string never exposed in code
- Use environment variables for all sensitive data
- Vercel encrypts all database connections

❌ **Don't**:
- Don't share `POSTGRES_URL` publicly
- Don't commit database credentials to Git
- Don't use production DB for testing (create separate DB for testing)

---

## ✅ Success Checklist

- [ ] Database created in Vercel Storage
- [ ] Environment variables automatically added
- [ ] Application redeployed successfully
- [ ] `/api/db/init` returns success
- [ ] Test registration works
- [ ] Registration number generated correctly
- [ ] Data visible in Vercel dashboard

---

## 🎯 Quick Summary

```bash
1. Vercel Dashboard → Storage → Create Database (Postgres)
2. Wait 60 seconds → Auto-connects to project
3. Deployments → Redeploy (or auto-redeploys)
4. Visit: https://your-domain.vercel.app/api/db/init
5. Test registration flow
6. View data in Storage → Data tab
```

---

## 📞 Need Help?

If you see errors during any step, check:
1. **Vercel Logs**: Deployments → Click deployment → View Function Logs
2. **Browser Console**: F12 → Console tab (for frontend errors)
3. **Database Logs**: Storage → Database → Logs tab

Common error keywords to search:
- "missing_connection_string" → Database not connected
- "relation does not exist" → Tables not initialized
- "connection timeout" → Region mismatch or network issue
