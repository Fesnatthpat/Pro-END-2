interface RateLimitInfo {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// Note: For multi-server production, use Redis instead.
const rateLimitStore = new Map<string, RateLimitInfo>();

export const checkLoginRateLimit = (identifier: string, maxAttempts = 5, windowMinutes = 15) => {
  const now = Date.now();
  const info = rateLimitStore.get(identifier);

  if (info) {
    if (now > info.resetTime) {
      // Time expired, reset the counter
      rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMinutes * 60 * 1000 });
      return { allowed: true, remaining: maxAttempts - 1, resetTime: info.resetTime };
    }

    if (info.count >= maxAttempts) {
      return { allowed: false, remaining: 0, resetTime: info.resetTime };
    }

    // Increment count
    info.count++;
    return { allowed: true, remaining: maxAttempts - info.count, resetTime: info.resetTime };
  } else {
    // First attempt
    const resetTime = now + windowMinutes * 60 * 1000;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxAttempts - 1, resetTime };
  }
};

export const resetLoginRateLimit = (identifier: string) => {
  rateLimitStore.delete(identifier);
};
