import { afterAll, describe, expect, it } from 'vitest';
import { prisma } from '../src/lib/prisma';

describe('database connectivity', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('connects to PostgreSQL and executes a query', async () => {
    const rows = await prisma.$queryRaw<Array<{ result: number }>>`
      SELECT 1::int AS result
    `;

    expect(rows[0]?.result).toBe(1);
  });

  it('has at least one applied Prisma migration', async () => {
    const rows = await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*)::bigint AS count
      FROM "_prisma_migrations"
      WHERE finished_at IS NOT NULL
    `;

    expect(Number(rows[0]?.count ?? 0)).toBeGreaterThan(0);
  });
});
