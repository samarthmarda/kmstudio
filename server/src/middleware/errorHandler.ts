import type { NextFunction, Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('[boss-api] unhandled error', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
