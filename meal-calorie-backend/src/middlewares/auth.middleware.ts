import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { logger } from '../utils/logger';

export class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn({ ip: req.ip }, 'Unauthorized access: Missing or invalid auth header');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      (req as any).user = decoded;
      logger.info({ user: decoded, ip: req.ip }, 'Authenticated user');
      next();
    } catch (err) {
      logger.error({ err, ip: req.ip }, 'JWT verification failed');
      res.status(401).json({ error: 'Invalid token' });
    }
  }
}
