# Developer Implementation Guide

Quick reference for implementing optimizations in your code.

---

## 🔧 How to Use the Optimization Libraries

### 1. Using Pagination

#### Import
```typescript
import { parsePaginationParams, calculatePagination, formatPaginatedResponse } from '@/lib/pagination';
```

#### In Your API Route
```typescript
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Parse pagination from query params
  const { page, limit } = parsePaginationParams(
    searchParams.get('page'),
    searchParams.get('limit')
  );

  // Get total count
  const total = await User.countDocuments();
  
  // Calculate skip
  const { skip } = calculatePagination(page, limit, total);

  // Fetch paginated data
  const data = await User.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 });

  // Format response
  return Response.json(
    formatPaginatedResponse(data, page, limit, total)
  );
}
```

#### Client Usage
```javascript
// Get first page
fetch('/api/users?page=1&limit=20')

// Get specific page
fetch('/api/users?page=3&limit=50')

// Response includes pagination metadata
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

### 2. Using Cache

#### Import
```typescript
import { cache, cacheKeys } from '@/lib/cache';
```

#### Basic Caching
```typescript
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const cacheKey = cacheKeys.userById(id);

  // Try to get from cache
  let user = cache.get(cacheKey);

  if (!user) {
    // Cache miss - fetch from database
    user = await User.findById(id).lean();
    
    // Store in cache for 10 minutes
    if (user) {
      cache.set(cacheKey, user, 10 * 60 * 1000);
    }
  }

  return Response.json(user);
}
```

#### Cache Invalidation
```typescript
export async function POST(req: Request) {
  const body = await req.json();
  
  // Create user
  const user = await User.create(body);

  // Invalidate caches
  cache.delete(cacheKeys.userCount());
  cache.delete(cacheKeys.usersByType('all', 1));

  return Response.json(user);
}
```

#### Cache Pre-warming (Load cache proactively)
```typescript
export async function prewarmCache() {
  // Load frequently accessed data into cache on app startup
  const stats = await User.aggregate([
    { $group: { _id: '$userType', count: { $sum: 1 } } }
  ]);
  
  cache.set(cacheKeys.userCount(), stats.reduce((acc, s) => acc + s.count, 0));
}
```

---

### 3. Query Optimization Patterns

#### Pattern 1: Simple Lookup
```typescript
// ✅ Good
const user = await User.findOne({ email })
  .select('name email userType')
  .lean();
```

#### Pattern 2: Paginated List
```typescript
// ✅ Good
const users = await User.find({ userType: 'devops-user' })
  .select('-password')
  .skip(skip)
  .limit(limit)
  .lean()
  .sort({ createdAt: -1 });
```

#### Pattern 3: Batch Operations
```typescript
// ❌ Bad
for (const skill of skills) {
  await User.updateOne({ _id: id }, { $push: { skills: skill } });
}

// ✅ Good
await User.updateOne(
  { _id: id },
  { $push: { skills: { $each: skills } } }
);
```

#### Pattern 4: Parallel Queries
```typescript
// ❌ Bad
const user = await User.findById(id);
const count = await User.countDocuments();
const recentUsers = await User.find().limit(10).lean();

// ✅ Good
const [user, count, recentUsers] = await Promise.all([
  User.findById(id).lean(),
  User.countDocuments(),
  User.find().limit(10).lean().sort({ createdAt: -1 })
]);
```

---

## 🎯 Common Implementation Scenarios

### Scenario 1: User Login
```typescript
import { cache, cacheKeys } from '@/lib/cache';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  await dbConnect();

  // Cache miss is OK for security (don't cache passwords)
  const user = await User.findOne({ email })
    .select('name email password userType')
    .lean();

  if (!user || !(await user.comparePassword(password))) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Cache user profile after successful login
  const cachedData = {
    id: user._id,
    name: user.name,
    email: user.email,
    userType: user.userType
  };
  cache.set(cacheKeys.userById(user._id), cachedData, 30 * 60 * 1000);

  return Response.json({ user: cachedData });
}
```

### Scenario 2: User Dashboard
```typescript
import { cache, cacheKeys } from '@/lib/cache';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const cacheKey = cacheKeys.userById(params.userId);

  // Try cache first
  let dashboard = cache.get(cacheKey);

  if (!dashboard) {
    // Fetch with optimized query
    const user = await User.findById(params.userId)
      .select('name email userType company skills bio avatar isVerified createdAt')
      .lean();

    dashboard = {
      user,
      stats: {
        registeredDate: user?.createdAt,
        verified: user?.isVerified,
        skillsCount: user?.skills?.length || 0
      }
    };

    // Cache for 15 minutes
    cache.set(cacheKey, dashboard, 15 * 60 * 1000);
  }

  return Response.json(dashboard);
}
```

### Scenario 3: Search with Filters
```typescript
import { parsePaginationParams, calculatePagination, formatPaginatedResponse } from '@/lib/pagination';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const { page, limit } = parsePaginationParams(
    searchParams.get('page'),
    searchParams.get('limit')
  );
  
  const userType = searchParams.get('userType');
  const skill = searchParams.get('skill');

  // Build query
  let query = {};
  if (userType) query = { ...query, userType };
  if (skill) query = { ...query, skills: skill };

  const total = await User.countDocuments(query);
  const { skip } = calculatePagination(page, limit, total);

  const users = await User.find(query)
    .select('name email userType company skills avatar')
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 });

  return Response.json(
    formatPaginatedResponse(users, page, limit, total)
  );
}
```

---

## 📊 Performance Checklist

Before deploying any API endpoint, verify:

- [ ] **Pagination**
  - [ ] Max 100 results per request
  - [ ] Default limit is 20
  - [ ] Total count included in response

- [ ] **Query Optimization**
  - [ ] Using .lean() for read-only queries
  - [ ] Only selecting needed fields
  - [ ] Indexes used on filter fields

- [ ] **Caching**
  - [ ] TTL set appropriate to data freshness needs
  - [ ] Cache invalidated on data updates
  - [ ] Cache hit rate > 50% for expensive queries

- [ ] **Error Handling**
  - [ ] Try-catch block present
  - [ ] Proper HTTP status codes
  - [ ] Error logged for debugging

- [ ] **Testing**
  - [ ] Tested with large datasets (1000+ records)
  - [ ] Response time < 500ms in production
  - [ ] Memory usage reasonable

---

## 🚀 Deployment Workflow

1. **Develop locally**
   ```bash
   npm run dev
   ```

2. **Test with sample data**
   ```bash
   # Create test users
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"test123","userType":"devops-user"}'
   ```

3. **Test pagination**
   ```bash
   curl "http://localhost:3000/api/users?page=1&limit=20"
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Push to GitHub** (auto-deploys to Vercel)
   ```bash
   git add .
   git commit -m "Add pagination and caching"
   git push origin main
   ```

6. **Monitor in production**
   - Check Vercel Analytics dashboard
   - Review MongoDB Atlas metrics
   - Monitor cache stats

---

## 🔗 API Endpoints Reference

| Endpoint | Method | Purpose | Pagination |
|----------|--------|---------|-----------|
| `/api/auth/register` | POST | Register user | N/A |
| `/api/auth/login` | POST | Login user | N/A |
| `/api/users` | GET | List users | ✅ Yes |
| `/api/users/:id` | GET | Get user by ID | N/A |
| `/api/users` | DELETE | Clear cache | N/A |
| `/api/services` | GET | List services | 🚧 Pending |

---

## 💡 Tips & Best Practices

1. **Always use pagination** for list endpoints
2. **Cache read-heavy operations** (user profiles, services)
3. **Use .lean()** when you don't need Mongoose methods
4. **Run parallel queries** with Promise.all()
5. **Monitor slow queries** via MongoDB Atlas
6. **Index frequently searched fields** (email, userType)
7. **Invalidate cache** when data is modified
8. **Test with production-like data volume** before deploying
9. **Set up alerts** for performance degradation
10. **Document your cache strategy** for team members

---

## 📞 Need Help?

- Pagination issue? Check: [src/lib/pagination.ts](src/lib/pagination.ts)
- Cache issue? Check: [src/lib/cache.ts](src/lib/cache.ts)
- Query issue? Check: [src/lib/queryOptimization.ts](src/lib/queryOptimization.ts)
- Scaling plan? Check: [SCALING_CHECKLIST.md](SCALING_CHECKLIST.md)
