import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message);
      res.status(400).json({ error: errors.join(', ') });
      return;
    }

    req.body = result.data; // ✅ validated and typed
    next();
  };
