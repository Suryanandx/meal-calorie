import { Request, Response } from 'express';

export const getStatus = (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'API endpoint is live 🚀',
    status: 'ok',
  });
};
