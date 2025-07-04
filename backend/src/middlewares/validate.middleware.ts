import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { logger } from '../utils/logger';

export class ValidationMiddleware {
  static validateBody(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.errors.map((e) => e.message);
        
        logger.warn({
          path: req.path,
          method: req.method,
          errors,
          body: req.body,
        }, 'Validation failed for request body');

        res.status(400).json({ error: errors.join(', ') });
        return;
      }

      logger.debug({
        path: req.path,
        method: req.method,
      }, 'Validation passed');

      req.body = result.data;
      next();
    };
  }
}
