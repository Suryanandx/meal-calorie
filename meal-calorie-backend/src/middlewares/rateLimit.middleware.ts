import rateLimit from 'express-rate-limit';
import { Request } from 'express';

// IP-based limiter: For login/register routes
export const ipRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: 'Too many requests from this IP, please try again after a minute.',
});

// Authenticated user-based limiter: For /get-calories
export const userRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  keyGenerator: (req: Request): string => {
    const user = (req as any).user;
    return user?.userId || req.ip; // fallback to IP if user not present
  },
  message: 'Too many requests from your account, please wait a minute.',
});
