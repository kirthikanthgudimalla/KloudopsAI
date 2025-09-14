# Deployment Guide for kloudops-ai.com

## Prerequisites
- Node.js 18+ installed on your server
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt recommended)

## Server Setup Steps

### 1. Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### 2. Clone and Build Project
```bash
# Clone your repository
git clone https://github.com/kirthikanthgudimalla/KloudopsAI.git
cd KloudopsAI

# Install dependencies
npm install

# Build the project
npm run build
```

### 3. PM2 Configuration
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'kloudops-ai',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### 4. Nginx Configuration
Create `/etc/nginx/sites-available/kloudops-ai.com`:
```nginx
server {
    listen 80;
    server_name kloudops-ai.com www.kloudops-ai.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. Enable Site and SSL
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/kloudops-ai.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install SSL certificate
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d kloudops-ai.com -d www.kloudops-ai.com
```

### 6. Start Application
```bash
# Start with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

## DNS Records for VPS Hosting
Point these records to your server's IP address in GoDaddy:

```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A
Name: www
Value: YOUR_SERVER_IP
```

## Environment Variables
Make sure to set up your environment variables:
```bash
# Create .env.local file
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://kloudops-ai.com
```
