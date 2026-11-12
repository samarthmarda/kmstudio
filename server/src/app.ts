import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health';

const SERVICE_NAME = 'kmstudio-boss-api';
const SERVICE_VERSION = process.env.npm_package_version ?? '0.1.0';

export function createApp(): express.Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(
    cors({
      origin:
        env.CORS_ORIGIN === '*'
          ? '*'
          : env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/', (_req, res) => {
    res.json({
      service: SERVICE_NAME,
      version: SERVICE_VERSION,
      health: '/api/v1/health',
    });
  });

  app.use('/api/v1', healthRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export const app = createApp();
