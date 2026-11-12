import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '../src/lib/prisma';

const suffix = randomUUID();
const companyIds: string[] = [];
const organisationIds: string[] = [];
const userIds: string[] = [];

let orgAId: string;
let orgBId: string;
let companyAId: string;
let companyBId: string;
let branchAId: string;
let branchBId: string;
let partyAId: string;
let partyBId: string;
let productAId: string;
let productBId: string;
let financialYearAId: string;
let financialYearBId: string;
let ledgerAccountAId: string;
let ledgerAccountBId: string;
let journalEntryAId: string;
let userAId: string;

beforeAll(async () => {
  const orgA = await prisma.organisation.create({
    data: { name: 'Isolation Org A', slug: `isolation-org-a-${suffix}` },
  });
  const orgB = await prisma.organisation.create({
    data: { name: 'Isolation Org B', slug: `isolation-org-b-${suffix}` },
  });
  orgAId = orgA.id;
  orgBId = orgB.id;
  organisationIds.push(orgA.id, orgB.id);

  const userA = await prisma.user.create({
    data: { email: `owner-${suffix}@example.test`, name: 'Isolation Owner' },
  });
  userAId = userA.id;
  userIds.push(userA.id);

  await prisma.organisationMember.create({
    data: { organisationId: orgA.id, userId: userA.id, role: 'OWNER' },
  });

  const companyA = await prisma.company.create({
    data: { organisationId: orgA.id, name: 'Company A', slug: `company-a-${suffix}` },
  });
  const companyB = await prisma.company.create({
    data: { organisationId: orgB.id, name: 'Company B', slug: `company-b-${suffix}` },
  });
  companyAId = companyA.id;
  companyBId = companyB.id;
  companyIds.push(companyA.id, companyB.id);

  const branchA = await prisma.branch.create({
    data: { companyId: companyA.id, name: 'Head Office', code: `HO-${suffix}`, isPrimary: true },
  });
  const branchB = await prisma.branch.create({
    data: { companyId: companyB.id, name: 'Head Office', code: `HO-${suffix}`, isPrimary: true },
  });
  branchAId = branchA.id;
  branchBId = branchB.id;

  const partyA = await prisma.party.create({
    data: { companyId: companyA.id, code: `PARTY-${suffix}`, name: 'Party A' },
  });
  const partyB = await prisma.party.create({
    data: { companyId: companyB.id, code: `PARTY-${suffix}`, name: 'Party B' },
  });
  partyAId = partyA.id;
  partyBId = partyB.id;

  await prisma.partyRoleAssignment.create({
    data: { companyId: companyA.id, partyId: partyA.id, role: 'CUSTOMER', isPrimary: true },
  });
  await prisma.partyRoleAssignment.create({
    data: { companyId: companyB.id, partyId: partyB.id, role: 'CUSTOMER', isPrimary: true },
  });

  const productA = await prisma.product.create({
    data: { companyId: companyA.id, sku: `SKU-${suffix}`, name: 'Product A' },
  });
  const productB = await prisma.product.create({
    data: { companyId: companyB.id, sku: `SKU-${suffix}`, name: 'Product B' },
  });
  productAId = productA.id;
  productBId = productB.id;

  const financialYearA = await prisma.financialYear.create({
    data: {
      companyId: companyA.id,
      name: `FY-${suffix}`,
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isActive: true,
    },
  });
  const financialYearB = await prisma.financialYear.create({
    data: {
      companyId: companyB.id,
      name: `FY-${suffix}`,
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isActive: true,
    },
  });
  financialYearAId = financialYearA.id;
  financialYearBId = financialYearB.id;

  await prisma.accountingConfiguration.create({
    data: { companyId: companyA.id, baseCurrency: 'INR' },
  });
  await prisma.accountingConfiguration.create({
    data: { companyId: companyB.id, baseCurrency: 'INR' },
  });

  const ledgerAccountA = await prisma.ledgerAccount.create({
    data: {
      companyId: companyA.id,
      code: `ACC-A-${suffix}`,
      name: 'Cash',
      category: 'ASSET',
      type: 'CASH',
    },
  });
  const ledgerAccountB = await prisma.ledgerAccount.create({
    data: {
      companyId: companyB.id,
      code: `ACC-B-${suffix}`,
      name: 'Cash',
      category: 'ASSET',
      type: 'CASH',
    },
  });
  ledgerAccountAId = ledgerAccountA.id;
  ledgerAccountBId = ledgerAccountB.id;

  const journalEntryA = await prisma.journalEntry.create({
    data: {
      companyId: companyA.id,
      financialYearId: financialYearA.id,
      branchId: branchA.id,
      entryNumber: `JE-${suffix}`,
      entryDate: new Date('2026-04-15'),
      narration: 'Opening entry',
      createdById: userA.id,
    },
  });
  journalEntryAId = journalEntryA.id;

  await prisma.journalLine.createMany({
    data: [
      {
        companyId: companyA.id,
        journalEntryId: journalEntryA.id,
        ledgerAccountId: ledgerAccountA.id,
        lineNumber: 1,
        debit: 100,
        credit: 0,
      },
      {
        companyId: companyA.id,
        journalEntryId: journalEntryA.id,
        ledgerAccountId: ledgerAccountA.id,
        lineNumber: 2,
        debit: 0,
        credit: 100,
      },
    ],
  });

  await prisma.stockBalance.create({
    data: { companyId: companyA.id, productId: productA.id, branchId: branchA.id, quantity: 10 },
  });
  await prisma.stockBalance.create({
    data: { companyId: companyB.id, productId: productB.id, branchId: branchB.id, quantity: 20 },
  });
});

afterAll(async () => {
  await prisma.stockBalance.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.stockMovement.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.journalLine.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.journalEntry.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.ledgerAccount.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.partyRoleAssignment.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.party.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.financialYear.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.accountingConfiguration.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.product.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.branch.deleteMany({ where: { companyId: { in: companyIds } } });
  await prisma.company.deleteMany({ where: { id: { in: companyIds } } });
  await prisma.organisationMember.deleteMany({ where: { organisationId: { in: organisationIds } } });
  await prisma.organisation.deleteMany({ where: { id: { in: organisationIds } } });
  await prisma.user.deleteMany({ where: { id: { in: userIds } } });
  await prisma.$disconnect();
});

describe('company isolation', () => {
  it('returns only parties that belong to the requested company', async () => {
    const parties = await prisma.party.findMany({ where: { companyId: companyAId } });
    const partyIds = parties.map((party) => party.id);

    expect(partyIds).toContain(partyAId);
    expect(partyIds).not.toContain(partyBId);
    expect(parties.every((party) => party.companyId === companyAId)).toBe(true);
  });

  it('rejects a party role assignment that crosses company boundaries', async () => {
    await expect(
      prisma.partyRoleAssignment.create({
        data: { companyId: companyBId, partyId: partyAId, role: 'SUPPLIER' },
      }),
    ).rejects.toMatchObject({ code: 'P2003' });
  });

  it('keeps party role assignments scoped to their company', async () => {
    const assignments = await prisma.partyRoleAssignment.findMany({
      where: { companyId: companyAId },
    });

    expect(assignments).toHaveLength(1);
    expect(assignments[0]?.partyId).toBe(partyAId);
  });
});

describe('tenant-scoped unique constraints', () => {
  it('enforces unique party codes per company but allows the same code in another company', async () => {
    await expect(
      prisma.party.create({
        data: { companyId: companyAId, code: `PARTY-${suffix}`, name: 'Duplicate Party A' },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });

    const partyB = await prisma.party.findFirstOrThrow({
      where: { companyId: companyBId, code: `PARTY-${suffix}` },
    });
    expect(partyB.id).toBe(partyBId);
  });

  it('enforces company slugs per organisation while allowing reuse in another organisation', async () => {
    await expect(
      prisma.company.create({
        data: { organisationId: orgAId, name: 'Duplicate Company', slug: `company-a-${suffix}` },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });

    const companyC = await prisma.company.create({
      data: { organisationId: orgBId, name: 'Company C', slug: `company-a-${suffix}` },
    });
    companyIds.push(companyC.id);
    expect(companyC.organisationId).toBe(orgBId);
  });

  it('enforces product SKUs per company while allowing the same SKU in another company', async () => {
    await expect(
      prisma.product.create({
        data: { companyId: companyAId, sku: `SKU-${suffix}`, name: 'Duplicate Product A' },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });

    const productB = await prisma.product.findFirstOrThrow({
      where: { companyId: companyBId, sku: `SKU-${suffix}` },
    });
    expect(productB.id).toBe(productBId);
  });

  it('enforces financial year names per company', async () => {
    await expect(
      prisma.financialYear.create({
        data: {
          companyId: companyAId,
          name: `FY-${suffix}`,
          startDate: new Date('2026-04-01'),
          endDate: new Date('2027-03-31'),
        },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });

    const financialYearB = await prisma.financialYear.findFirstOrThrow({
      where: { companyId: companyBId, name: `FY-${suffix}` },
    });
    expect(financialYearB.id).toBe(financialYearBId);
  });

  it('allows only one accounting configuration per company', async () => {
    await expect(
      prisma.accountingConfiguration.create({
        data: { companyId: companyAId, baseCurrency: 'INR' },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
  });

  it('enforces one stock balance per company, product and branch', async () => {
    await expect(
      prisma.stockBalance.create({
        data: { companyId: companyAId, productId: productAId, branchId: branchAId, quantity: 5 },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
  });

  it('enforces sequential journal line numbers within an entry', async () => {
    await expect(
      prisma.journalLine.create({
        data: {
          companyId: companyAId,
          journalEntryId: journalEntryAId,
          ledgerAccountId: ledgerAccountAId,
          lineNumber: 1,
          debit: 10,
          credit: 0,
        },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
  });
});

describe('accounting and inventory foundations', () => {
  it('links journal entries to the correct financial year and ledger lines', async () => {
    const entry = await prisma.journalEntry.findUniqueOrThrow({
      where: { id: journalEntryAId },
      include: { lines: true, financialYear: true },
    });

    expect(entry.companyId).toBe(companyAId);
    expect(entry.financialYearId).toBe(financialYearAId);
    expect(entry.financialYear.companyId).toBe(companyAId);
    expect(entry.lines).toHaveLength(2);
  });

  it('stores stock balances per company, product and branch', async () => {
    const balance = await prisma.stockBalance.findFirstOrThrow({
      where: { companyId: companyAId, productId: productAId, branchId: branchAId },
    });

    expect(balance.quantity.toNumber()).toBe(10);
  });

  it('keeps company B data separate from company A', async () => {
    const [ledgerAccounts, products, financialYears] = await Promise.all([
      prisma.ledgerAccount.findMany({ where: { companyId: companyAId } }),
      prisma.product.findMany({ where: { companyId: companyAId } }),
      prisma.financialYear.findMany({ where: { companyId: companyAId } }),
    ]);

    expect(ledgerAccounts.map((account) => account.id)).toEqual([ledgerAccountAId]);
    expect(ledgerAccounts.map((account) => account.id)).not.toContain(ledgerAccountBId);
    expect(products.map((product) => product.id)).toEqual([productAId]);
    expect(products.map((product) => product.id)).not.toContain(productBId);
    expect(financialYears.map((year) => year.id)).toEqual([financialYearAId]);
    expect(financialYears.map((year) => year.id)).not.toContain(financialYearBId);
  });
});
