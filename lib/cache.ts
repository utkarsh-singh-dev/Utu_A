// lib/cache.ts

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttlSeconds: number = 3600): void {
    const ttl = ttlSeconds * 1000;
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

// Create singleton instance
export const apiCache = new MemoryCache();

// Helper function to create cache keys
export const getCacheKey = (...parts: string[]): string => {
  return parts.join('::');
};

// Cached fetch wrapper
export const cachedFetch = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> => {
  // Check cache first
  const cached = apiCache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch and cache
  const data = await fetchFn();
  apiCache.set(key, data, ttlSeconds);
  
  return data;
};
