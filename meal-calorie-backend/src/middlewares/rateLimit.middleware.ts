import rateLimit from "express-rate-limit";
import { Request } from "express";

export class RateLimitMiddleware {
  static ipRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again after a minute.",
  });

  static userRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    keyGenerator: (req: Request): string => {
      const user = (req as any).user;
      return user?.userId || req.ip;
    },
    message: "Too many requests from your account, please wait a minute.",
  });
}
