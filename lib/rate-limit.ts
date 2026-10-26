interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up expired keys every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Basic in-memory rate limiter
 * @param identifier IP or user key
 * @param limit Max requests allowed
 * @param windowMs Window in milliseconds
 */
export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const record = store[identifier];

  if (!record || record.resetTime < now) {
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true, remaining: limit - 1, reset: store[identifier].resetTime };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, reset: record.resetTime };
}
