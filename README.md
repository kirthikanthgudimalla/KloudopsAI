# KloudOps AI - DevOps Services Platform

A comprehensive Next.js application for DevOps services where professionals, job seekers, and freelancers can register, login, and access various DevOps solutions.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **Multi-User Types**: Support for DevOps users, job seekers, and freelancers
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Dashboard**: Personalized dashboard for each user type
- **Services Catalog**: Comprehensive DevOps services listing
- **Database Integration**: MongoDB with Mongoose ODM
- **API Routes**: RESTful API endpoints for user management

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with HTTP-only cookies
- **Icons**: Lucide React
- **Password Hashing**: bcryptjs

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd kloudops-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=mongodb://localhost:27017/kloudops-ai
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   JWT_SECRET=your-jwt-secret-key-here
   ```

4. **Set up MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env.local` file

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 User Types

### DevOps Users
- Businesses seeking DevOps services
- Access to service catalog
- Project management dashboard
- Team collaboration features

### Job Seekers
- DevOps professionals looking for opportunities
- Job application tracking
- Skill showcase profiles
- Interview management

### Freelancers
- Independent DevOps consultants
- Service offering management
- Client project tracking
- Revenue analytics

## 📁 Project Structure

```
kloudops-ai/
├── src/
│   ├── app/
│   │   ├── api/auth/          # Authentication API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── services/          # Services catalog
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── lib/
│   │   ├── mongodb.ts         # Database connection
│   │   └── utils.ts           # Utility functions
│   └── models/
│       └── User.ts            # User data model
├── .env.local                 # Environment variables
├── package.json               # Dependencies
└── README.md                  # Project documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application uses JWT-based authentication with HTTP-only cookies for security. Users can register with different account types and access role-specific features.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## 🎨 UI Components

The application features a modern, responsive design with:
- Clean navigation bar
- Hero sections with call-to-actions
- Service cards with feature listings
- User dashboard with statistics
- Form components with validation
- Mobile-first responsive design

## 🚀 Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform:**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS
   - Digital Ocean

3. **Update environment variables:**
   Set production environment variables on your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@kloudops-ai.com or create an issue in this repository.
