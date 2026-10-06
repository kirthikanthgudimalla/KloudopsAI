/**
 * Example Optimized Users API Route with Pagination & Caching
 * GET /api/users - List all users with pagination
 * 
 * Query parameters:
 * - page: number (default: 1)
 * - limit: number (default: 20, max: 100)
 * - userType: string (devops-user, job-seeker, freelancer) - optional filter
 */

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { parsePaginationParams, calculatePagination, formatPaginatedResponse } from '@/lib/pagination';
import { cache, cacheKeys } from '@/lib/cache';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const userType = searchParams.get('userType');

    // Parse pagination params
    const { page: pageNum, limit: limitNum } = parsePaginationParams(page, limit);

    // Generate cache key
    const cacheKey = cacheKeys.usersByType(userType || 'all', pageNum);

    // Check cache first
    let cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return NextResponse.json({
        ...cachedResult,
        fromCache: true,
      });
    }

    // Build query
    let query = {};
    if (userType) {
      const validTypes = ['devops-user', 'job-seeker', 'freelancer'];
      if (!validTypes.includes(userType)) {
        return NextResponse.json(
          { error: 'Invalid userType' },
          { status: 400 }
        );
      }
      query = { userType };
    }

    // Get total count
    const total = await User.countDocuments(query);

    // Calculate pagination
    const { skip } = calculatePagination(pageNum, limitNum, total);

    // Fetch users with optimizations
    const users = await User.find(query)
      .select('-password') // Exclude password field
      .skip(skip)
      .limit(limitNum)
      .lean() // 15-25% faster for read-only queries
      .sort({ createdAt: -1 }); // Most recent first

    // Format response
    const response = formatPaginatedResponse(users, pageNum, limitNum, total);

    // Cache the result for 5 minutes
    cache.set(cacheKey, response, 5 * 60 * 1000);

    return NextResponse.json({
      ...response,
      fromCache: false,
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/cache - Clear users cache
 * Admin only endpoint
 */
export async function DELETE(req: NextRequest) {
  try {
    // TODO: Add authentication check for admin only
    
    // Clear all user-related cache entries
    cache.clear();

    return NextResponse.json({
      message: 'Cache cleared successfully',
      stats: cache.getStats(),
    });

  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}

/**
 * USAGE EXAMPLES:
 *
 * 1. Get first page of all users:
 *    GET /api/users
 *
 * 2. Get page 2 with 30 users per page:
 *    GET /api/users?page=2&limit=30
 *
 * 3. Get job seekers only:
 *    GET /api/users?userType=job-seeker
 *
 * 4. Get freelancers on page 3:
 *    GET /api/users?userType=freelancer&page=3&limit=20
 *
 * RESPONSE EXAMPLE:
 * {
 *   "data": [
 *     {
 *       "_id": "507f1f77bcf86cd799439011",
 *       "name": "John Doe",
 *       "email": "john@example.com",
 *       "userType": "devops-user",
 *       "isVerified": true,
 *       "createdAt": "2024-01-15T10:30:00Z",
 *       "updatedAt": "2024-01-15T10:30:00Z"
 *     }
 *   ],
 *   "pagination": {
 *     "page": 1,
 *     "limit": 20,
 *     "total": 150,
 *     "totalPages": 8,
 *     "hasNextPage": true,
 *     "hasPreviousPage": false
 *   },
 *   "fromCache": false
 * }
 */
