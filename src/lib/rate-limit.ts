import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per 60 seconds per IP
});

export async function applyRateLimit(ip: string): Promise<boolean> {
  try {
    await rateLimiter.consume(ip);
    return true;
  } catch {
    return false;
  }
}
