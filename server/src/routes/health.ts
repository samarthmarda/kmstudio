import { Router } from 'express';
import { checkDatabase } from '../lib/prisma';
import { env } from '../config/env';

export const healthRouter = Router();

healthRouter.get('/health', async (_req, res) => {
  const startedAt = Date.now();

  try {
    const database = await checkDatabase();

    res.status(200).json({
      status: 'ok',
      service: 'kmstudio-boss-api',
      version: process.env.npm_package_version ?? '0.1.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      database,
    });
  } catch (error) {
    res.status(503).json({
      status: 'degraded',
      service: 'kmstudio-boss-api',
      version: process.env.npm_package_version ?? '0.1.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      database: {
        status: 'down',
        latencyMs: Date.now() - startedAt,
        error:
          env.NODE_ENV === 'production'
            ? 'Database connectivity check failed'
            : error instanceof Error
              ? error.message
              : 'Unknown database error',
      },
    });
  }
});
