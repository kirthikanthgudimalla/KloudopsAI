/**
 * Pagination Utilities for MongoDB Queries
 * Implements offset-based pagination for API responses
 */

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Parse pagination parameters from query
 */
export function parsePaginationParams(
  page?: string | number,
  limit?: string | number
): { page: number; limit: number } {
  const pageNum = Math.max(1, parseInt(page as string) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string) || 20));

  return { page: pageNum, limit: limitNum };
}

/**
 * Calculate skip and pagination metadata
 */
export function calculatePagination(
  page: number,
  limit: number,
  total: number
): PaginationParams & { skip: number; totalPages: number } {
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    skip,
    totalPages,
  };
}

/**
 * Format paginated query response
 */
export function formatPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Example usage in API route:
 *
 * export async function GET(req: Request) {
 *   const { searchParams } = new URL(req.url);
 *   const { page, limit } = parsePaginationParams(
 *     searchParams.get('page'),
 *     searchParams.get('limit')
 *   );
 *
 *   const total = await User.countDocuments();
 *   const { skip } = calculatePagination(page, limit, total);
 *
 *   const users = await User.find()
 *     .skip(skip)
 *     .limit(limit)
 *     .lean(); // 15-25% faster for read-only queries
 *
 *   return Response.json(formatPaginatedResponse(users, page, limit, total));
 * }
 */
