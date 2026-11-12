import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import { env } from '../src/config/env';
import { prisma } from '../src/lib/prisma';

const schemaName = `test_migration_${randomUUID().replace(/-/g, '')}`;
const schemaUrl = (() => {
  const url = new URL(env.DATABASE_URL);
  url.searchParams.set('schema', schemaName);
  return url.toString();
})();

const requiredTables = [
  'organisations',
  'users',
  'organisation_members',
  'companies',
  'branches',
  'parties',
  'party_role_assignments',
  'financial_years',
  'accounting_configurations',
  'ledger_accounts',
  'journal_entries',
  'journal_lines',
  'products',
  'stock_movements',
  'stock_balances',
  'clients',
  'inventory_items',
  'sales_orders',
  'invoices',
  'purchase_orders',
  'activity_logs',
];

describe('clean database migration', () => {
  it('applies every migration to an empty PostgreSQL schema', async () => {
    await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
    let client: PrismaClient | undefined;

    try {
      execFileSync(
        process.platform === 'win32' ? 'npx.cmd' : 'npx',
        ['prisma', 'migrate', 'deploy'],
        {
          cwd: process.cwd(),
          env: { ...process.env, DATABASE_URL: schemaUrl },
          stdio: 'pipe',
          timeout: 120_000,
        },
      );

      client = new PrismaClient({ datasources: { db: { url: schemaUrl } } });

      const tables = await client.$queryRaw<Array<{ table_name: string }>>`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = ${schemaName}
      `;
      const tableNames = tables.map((row) => row.table_name);
      expect(tableNames).toEqual(expect.arrayContaining(requiredTables));

      const migrations = await client.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*)::bigint AS count
        FROM "_prisma_migrations"
        WHERE finished_at IS NOT NULL
      `;
      expect(Number(migrations[0]?.count ?? 0)).toBeGreaterThanOrEqual(2);

      const checks = await client.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*)::bigint AS count
        FROM information_schema.table_constraints
        WHERE constraint_schema = ${schemaName}
          AND constraint_type = 'CHECK'
      `;
      expect(Number(checks[0]?.count ?? 0)).toBeGreaterThanOrEqual(5);
    } finally {
      await client?.$disconnect();
      await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
    }
  }, 120_000);
});
