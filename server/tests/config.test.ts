import { describe, expect, it } from 'vitest';
import { envSchema } from '../src/config/env';

describe('environment validation', () => {
  it('applies defaults for optional values', () => {
    const result = envSchema.parse({
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/kmstudio',
    });

    expect(result.NODE_ENV).toBe('development');
    expect(result.API_PORT).toBe(4000);
    expect(result.CORS_ORIGIN).toBe('*');
  });

  it('rejects a missing DATABASE_URL', () => {
    const result = envSchema.safeParse({ NODE_ENV: 'test' });

    expect(result.success).toBe(false);
  });

  it('rejects a non-PostgreSQL DATABASE_URL', () => {
    const result = envSchema.safeParse({
      DATABASE_URL: 'mysql://user:pass@localhost:3306/kmstudio',
    });

    expect(result.success).toBe(false);
  });
});
