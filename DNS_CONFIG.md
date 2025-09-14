# DNS Configuration for kloudops-ai.com

## Current DNS Status
Your domain currently points to GitHub Pages. We need to update it to point to Vercel.

## Required DNS Records for Vercel

### Record 1: Root Domain
```
Type: A
Name: @ (or leave blank)
Value: 76.76.19.61
TTL: 300 seconds (or default)
```

### Record 2: WWW Subdomain
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300 seconds (or default)
```

## Steps to Update in GoDaddy:

1. Login to GoDaddy.com
2. Go to "My Products" → "All Products and Services"
3. Find your domain "kloudops-ai.com" 
4. Click "DNS" button next to it
5. Delete existing A records pointing to GitHub Pages (185.199.x.x)
6. Add the new records above
7. Save changes

## Verification:
- DNS changes take 10-60 minutes to propagate
- Test with: https://dnschecker.org
- Your site should be live at https://kloudops-ai.com

## Backup: Current Records to Delete
These GitHub Pages IPs should be removed:
- 185.199.108.153
- 185.199.109.153  
- 185.199.110.153
- 185.199.111.153
