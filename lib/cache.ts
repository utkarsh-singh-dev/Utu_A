// lib/cache.ts
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<unknown>>();

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

export const apiCache = new MemoryCache();

export const getCacheKey = (...parts: string[]): string => {
  return parts.join('::');
};

export const cachedFetch = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> => {
  const cached = apiCache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  const data = await fetchFn();
  apiCache.set(key, data, ttlSeconds);

  return data;
};