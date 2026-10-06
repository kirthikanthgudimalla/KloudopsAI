/**
 * MongoDB Query Optimization Patterns
 * Best practices for efficient database queries in KloudOps AI
 */

import User from '@/models/User';

// ============================================================================
// 1. LEAN QUERIES (15-25% faster for read-only operations)
// ============================================================================

// ❌ SLOWER - Returns full Mongoose documents with methods
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getUSERsSlow() {
  return await User.find({ userType: 'devops-user' });
  // Each doc: ~50-100 bytes overhead
}

// ✅ FASTER - Returns plain JavaScript objects
async function getUsersFast() {
  return await User.find({ userType: 'devops-user' }).lean();
  // Each doc: No Mongoose overhead
}

// ============================================================================
// 2. FIELD SELECTION (Reduce payload size)
// ============================================================================

// ❌ SLOWER - Returns all fields (including password hash)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getAllFieldsSlow(email: string) {
  return await User.findOne({ email });
  // Returns: name, email, password, userType, company, skills, bio, avatar, etc.
}

// ✅ FASTER - Returns only needed fields
async function getSelectedFieldsFast(email: string) {
  return await User.findOne({ email })
    .select('name email userType company -_id') // Include specific fields
    .lean();
  // Returns: only name, email, userType, company
  // Reduces payload by 60-70%
}

// ❌ Also slower - Returns all but password (still returns other sensitive data)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getAllButPasswordSlow(email: string) {
  return await User.findOne({ email }).select('-password');
}

// ============================================================================
// 3. PAGINATION (Essential for large datasets)
// ============================================================================

// ❌ DANGEROUS - Returns ALL users (memory overflow with 100K+ users)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getAllUsersDangerous() {
  return await User.find().lean();
  // With 100K users, this loads ~100-200MB into memory
}

// ✅ SAFE - Paginated query
async function getUsersPaginated(page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;
  const total = await User.countDocuments();

  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 });

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
  // Returns: only 20 users per request (~20KB)
}

// ============================================================================
// 4. INDEXING & QUERY OPTIMIZATION
// ============================================================================

// ✅ INDEXED - Email lookups are optimized (index exists)
async function findByEmailFast(email: string) {
  return await User.findOne({ email }).lean();
  // Index: { email: 1 }
  // Performance: ~1-5ms
}

// ✅ INDEXED - UserType filtering is optimized
async function findByUserTypeFast(userType: string, page: number = 1) {
  const skip = (page - 1) * 20;
  return await User.find({ userType })
    .skip(skip)
    .limit(20)
    .lean();
  // Index: { userType: 1 }
  // Performance: ~5-10ms
}

// ✅ INDEXED - Recent users sorting is optimized
async function getRecentUsers(limit: number = 20) {
  return await User.find()
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 });
  // Index: { createdAt: -1 }
  // Performance: ~5-15ms
}

// ============================================================================
// 5. AGGREGATION PIPELINE (Complex queries)
// ============================================================================

// ✅ Efficient aggregation for statistics
async function getUserStatistics() {
  return await User.aggregate([
    {
      $group: {
        _id: '$userType',
        count: { $sum: 1 },
        avgCreatedAt: { $avg: '$createdAt' },
      },
    },
    { $sort: { count: -1 } },
  ]);
  // Single database operation vs multiple queries
  // Much more efficient than client-side grouping
}

// ============================================================================
// 6. BATCH OPERATIONS (Insert/Update multiple)
// ============================================================================

// ❌ SLOW - Individual operations (N+1 problem)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function addSkillsSlow(userId: string, newSkills: string[]) {
  for (const skill of newSkills) {
    await User.updateOne(
      { _id: userId },
      { $push: { skills: skill } }
    );
  }
  // Multiple database round-trips
  // Performance: 1-10ms per operation
}

// ✅ FAST - Single batch operation
async function addSkillsFast(userId: string, newSkills: string[]) {
  return await User.updateOne(
    { _id: userId },
    { $push: { skills: { $each: newSkills } } }
  );
  // Single database operation
  // Performance: 1-5ms total
}

// ============================================================================
// 7. BULK OPERATIONS (Update many)
// ============================================================================

// ✅ Efficient bulk update
async function markUsersAsVerified(userIds: string[]) {
  return await User.updateMany(
    { _id: { $in: userIds } },
    { $set: { isVerified: true } }
  );
  // Single batch operation for all users
  // Performance: 10-50ms for 1000 users
}

// ============================================================================
// 8. CONNECTION POOLING & CACHING
// ============================================================================

/**
 * Current pooling configuration:
 * - Default: 10 connections
 * - Recommended for production: 50-100 connections
 * - Set via MONGODB_POOL_SIZE environment variable
 *
 * Connection pooling benefits:
 * - Reuses database connections
 * - Reduces connection overhead (10-50ms per new connection)
 * - Improves concurrent request handling
 */

// ============================================================================
// 9. REAL-WORLD QUERY EXAMPLES
// ============================================================================

// Example 1: Get single user by email (login)
async function getUserForLogin(email: string) {
  return await User.findOne({ email })
    .select('name email password userType isVerified')
    .lean();
  // Optimizations:
  // - Indexed email field
  // - Only select needed fields
  // - Lean query for speed
  // Performance: ~1-5ms
}

// Example 2: Get user dashboard data
async function getUserDashboard(userId: string) {
  return await User.findById(userId)
    .select('name email userType company skills bio avatar isVerified createdAt')
    .lean();
  // Optimizations:
  // - Indexed _id (default)
  // - Select specific fields
  // - Lean query
  // Performance: ~1-2ms
}

// Example 3: Search freelancers with skills
async function searchFreelancers(skillFilter?: string, page: number = 1) {
  const skip = (page - 1) * 20;
  
  const query = skillFilter
    ? { userType: 'freelancer', skills: { $in: [skillFilter] } }
    : { userType: 'freelancer' };

  const [users, total] = await Promise.all([
    User.find(query)
      .select('name email company skills bio avatar')
      .skip(skip)
      .limit(20)
      .lean()
      .sort({ createdAt: -1 }),
    User.countDocuments(query),
  ]);

  return { users, total, page, totalPages: Math.ceil(total / 20) };
  // Optimizations:
  // - Query index on userType
  // - Lean queries
  // - Parallel count query
  // - Pagination to limit results
}

// ============================================================================
// 10. PERFORMANCE BENCHMARKS (Expected times)
// ============================================================================

/**
 * Query Performance Benchmarks
 * (Based on MongoDB on M5 tier with 100K users, 50-connection pool)
 *
 * Operation                          | Time    | Notes
 * -----------------------------------|---------|----------------------------------
 * Find by indexed field (email)      | 1-5ms   | Lean query, indexed
 * Find by userType (paginated)       | 5-10ms  | Lean query, indexed, skip/limit
 * Count documents                    | 5-10ms  | Fast aggregation
 * Insert single user                 | 10-20ms | Password hashing time included
 * Update single field                | 5-15ms  | Simple $set operation
 * Batch insert (100 users)           | 100-200ms | insertMany operation
 * Bulk update (1000 users)           | 50-100ms | updateMany operation
 * Aggregation (group by userType)    | 50-100ms | Pipeline operation
 * Search with filter & pagination    | 10-30ms | Multiple indexes used
 *
 * Query Times INCREASE when:
 * - Not using pagination (returns 1000+ documents)
 * - Missing indexes on query fields
 * - Returning all fields (including large arrays/strings)
 * - Using Mongoose methods instead of .lean()
 * - Complex aggregation pipelines
 * - Connection pool exhausted
 */

// ============================================================================
// 11. MONITORING QUERIES IN PRODUCTION
// ============================================================================

/**
 * Enable MongoDB Profiling to identify slow queries:
 *
 * 1. In MongoDB Atlas:
 *    - Go to Cluster → Logs
 *    - Look for queries with executionStats.executionTime > 1000ms
 *
 * 2. Add logging to your app:
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function logSlowQueries(operation: string, startTime: number) {
  const duration = Date.now() - startTime;
  if (duration > 1000) {
    console.warn(`[SLOW QUERY] ${operation} took ${duration}ms`);
  }
}

/**
 * 3. Monitor connection pool:
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function logConnectionPoolStats() {
  // Add this to your monitoring/health check endpoint
  const poolStats = {
    timestamp: new Date().toISOString(),
    // Connection pool stats would be accessed through MongoDB client
  };
  console.log('[POOL STATS]', poolStats);
}

export {
  getUsersFast,
  getSelectedFieldsFast,
  getUsersPaginated,
  findByEmailFast,
  findByUserTypeFast,
  getRecentUsers,
  getUserStatistics,
  addSkillsFast,
  markUsersAsVerified,
  getUserForLogin,
  getUserDashboard,
  searchFreelancers,
};
