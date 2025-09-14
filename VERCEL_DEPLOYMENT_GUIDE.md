# 🚀 Deploy kloudops-ai.com to Vercel - Step by Step Guide

## Step 1: Push Code to GitHub (if not done already)

1. Open terminal in your project folder
2. Run these commands:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Deploy to Vercel

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com)

2. **Sign Up/Login**: 
   - Click "Continue with GitHub"
   - Authorize Vercel to access your repositories

3. **Import Repository**:
   - Click "Add New..." → "Project"
   - Find and select "KloudopsAI" repository
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

5. **Environment Variables** (Important!):
   Click "Environment Variables" and add:
   ```
   NEXTAUTH_URL = https://kloudops-ai.com
   NEXTAUTH_SECRET = your-super-secret-key-here-min-32-chars
   MONGODB_URI = your-mongodb-connection-string
   ```

6. **Deploy**: Click "Deploy"

## Step 3: Add Custom Domain

1. **After deployment**: Go to your project dashboard
2. **Go to Settings**: Click "Settings" tab
3. **Domains Section**: Click "Domains" in sidebar
4. **Add Domain**: 
   - Enter: `kloudops-ai.com`
   - Click "Add"
   - Also add: `www.kloudops-ai.com`

## Step 4: Update DNS in GoDaddy

1. **Login to GoDaddy**: Go to [godaddy.com](https://godaddy.com)
2. **My Products**: Click "DNS" next to kloudops-ai.com
3. **Delete existing records** pointing to GitHub Pages
4. **Add these new records**:

   **Record 1:**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   TTL: 600 seconds (default)
   ```

   **Record 2:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600 seconds (default)
   ```

5. **Save Changes**

## Step 5: Verify Domain in Vercel

1. **Back to Vercel**: Return to your project → Settings → Domains
2. **Check Status**: Should show "Valid Configuration" (may take 5-10 minutes)
3. **If showing invalid**: Wait and refresh, DNS propagation takes time

## Step 6: Test Your Website

1. **Wait 10-30 minutes** for DNS propagation
2. **Visit**: https://kloudops-ai.com
3. **Test features**:
   - Registration/Login
   - Dashboard
   - Services page

## Step 7: Setup Automatic Deployments

✅ **Already configured!** 
- Every push to `main` branch automatically deploys
- Preview deployments for pull requests
- Instant rollbacks available

## 🎉 You're Live!

Your website should now be accessible at:
- https://kloudops-ai.com
- https://www.kloudops-ai.com

## Troubleshooting

**DNS not propagating?**
- Check with: https://dnschecker.org
- Can take up to 48 hours (usually 30 minutes)

**Build failing?**
- Check Vercel deployment logs
- Ensure environment variables are set

**Domain not working?**
- Verify DNS records in GoDaddy
- Check domain status in Vercel

**Need help?**
- Vercel docs: https://vercel.com/docs
- DNS propagation checker: https://dnschecker.org

---

## What You Get with Vercel:

✅ **Global CDN** - Fast worldwide loading  
✅ **Automatic HTTPS** - SSL certificate included  
✅ **Automatic deployments** - Push code, auto-deploy  
✅ **Preview deployments** - Test before going live  
✅ **Zero configuration** - Next.js optimized  
✅ **Free tier** - No cost for small projects  

Your kloudops-ai.com is now enterprise-ready! 🚀
