import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === 'development'
        ? ['warn', 'error']
        : env.NODE_ENV === 'test'
          ? []
          : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export interface DatabaseStatus {
  status: 'up';
  latencyMs: number;
}

export async function checkDatabase(): Promise<DatabaseStatus> {
  const startedAt = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  return { status: 'up', latencyMs: Date.now() - startedAt };
}
