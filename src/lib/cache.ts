/**
 * In-Memory Cache Implementation
 * Can be upgraded to Redis for production
 * 
 * Features:
 * - TTL support (cache expiration)
 * - Type-safe caching
 * - Memory size tracking
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class MemoryCache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: Map<string, CacheEntry<any>> = new Map();
  private maxSize: number = 100; // Maximum cache entries
  private ttl: number = 5 * 60 * 1000; // Default 5 minutes

  /**
   * Get value from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  /**
   * Set value in cache
   */
  set<T>(key: string, value: T, ttl?: number): void {
    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + (ttl || this.ttl),
    });
  }

  /**
   * Delete from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size in bytes (approximate)
   */
  getSize(): number {
    let size = 0;
    for (const [key, entry] of this.cache) {
      size += key.length * 2; // UTF-16 encoding
      size += JSON.stringify(entry.value).length;
    }
    return size;
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    entries: number;
    approximateSizeKB: number;
    ttlMinutes: number;
  } {
    return {
      entries: this.cache.size,
      approximateSizeKB: Math.round(this.getSize() / 1024),
      ttlMinutes: Math.round(this.ttl / 60000),
    };
  }
}

// Export singleton instance
export const cache = new MemoryCache();

/**
 * Cache key generators for common queries
 */
export const cacheKeys = {
  userById: (id: string) => `user:${id}`,
  userByEmail: (email: string) => `user:email:${email}`,
  usersByType: (type: string, page: number) => `users:${type}:page:${page}`,
  allServices: () => `services:all`,
  userCount: () => `users:count`,
};

/**
 * Example usage in API route:
 *
 * import { cache, cacheKeys } from '@/lib/cache';
 *
 * export async function GET(req: Request) {
 *   const userId = '123';
 *   const cacheKey = cacheKeys.userById(userId);
 *
 *   // Check cache first
 *   let user = cache.get(cacheKey);
 *
 *   if (!user) {
 *     // Cache miss - fetch from database
 *     user = await User.findById(userId).lean();
 *
 *     // Cache for 10 minutes
 *     if (user) {
 *       cache.set(cacheKey, user, 10 * 60 * 1000);
 *     }
 *   }
 *
 *   return Response.json(user);
 * }
 *
 * // Clear cache when data changes
 * export async function POST(req: Request) {
 *   const user = await createUser(req.body);
 *   cache.delete(cacheKeys.userCount());
 *   return Response.json(user);
 * }
 */
