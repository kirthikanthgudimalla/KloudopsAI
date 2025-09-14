# Netlify DNS Configuration for kloudops-ai.com

## Step 1: Get Netlify Site URL
After deployment, you'll get a URL like: `amazing-site-name-123.netlify.app`

## Step 2: DNS Records for GoDaddy

### For Root Domain (kloudops-ai.com):
```
Type: CNAME
Name: @
Value: amazing-site-name-123.netlify.app
TTL: 300 seconds
```

### For WWW Subdomain:
```
Type: CNAME  
Name: www
Value: amazing-site-name-123.netlify.app
TTL: 300 seconds
```

## Alternative Method (A Records):
If CNAME doesn't work for root domain:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www  
Value: amazing-site-name-123.netlify.app
```

## Steps to Update in GoDaddy:
1. Login to GoDaddy → DNS Management
2. Delete existing GitHub Pages records (185.199.x.x)
3. Add the new records above
4. Save changes

## After DNS Update:
1. Go to Netlify site settings
2. Add custom domain: kloudops-ai.com
3. Netlify will automatically handle SSL certificate

⏱️ DNS propagation: 10-60 minutes
