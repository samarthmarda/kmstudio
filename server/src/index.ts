import { app } from './app';
import { env } from './config/env';
import { prisma } from './lib/prisma';

const server = app.listen(env.API_PORT, '0.0.0.0', () => {
  console.log(
    `[boss-api] listening on http://0.0.0.0:${env.API_PORT} (${env.NODE_ENV})`,
  );
});

async function shutdown(signal: string): Promise<void> {
  console.log(`[boss-api] received ${signal}, shutting down`);

  const forceExit = setTimeout(() => {
    console.error('[boss-api] shutdown timed out');
    process.exit(1);
  }, 10_000);
  forceExit.unref();

  server.close(async () => {
    await prisma.$disconnect();
    clearTimeout(forceExit);
    process.exit(0);
  });
}

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});
