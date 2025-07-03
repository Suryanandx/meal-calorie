import rateLimit from 'express-rate-limit';
import { Request } from 'express';
import { logger } from '../utils/logger';

export class RateLimitMiddleware {
  static ipRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    handler: (req, res) => {
      logger.warn({ ip: req.ip }, 'IP rate limit exceeded');
      res.status(429).json({
        error: 'Too many requests from this IP, please try again after a minute.',
      });
    },
  });

  static userRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    keyGenerator: (req: Request): string => {
      const user = (req as any).user;
      const key = user?.userId || req.ip;
      logger.debug({ key }, 'Rate limit key generated');
      return key;
    },
    handler: (req, res) => {
      const key = (req as any).user?.userId || req.ip;
      logger.warn({ key }, 'User rate limit exceeded');
      res.status(429).json({
        error: 'Too many requests from your account, please wait a minute.',
      });
    },
  });
}
