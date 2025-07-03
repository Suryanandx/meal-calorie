import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export class ValidationMiddleware {
  static validateBody(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.errors.map((e) => e.message);
        res.status(400).json({ error: errors.join(", ") });
        return;
      }

      req.body = result.data;
      next();
    };
  }
}
