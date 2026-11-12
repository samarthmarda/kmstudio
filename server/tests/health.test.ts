import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app';

describe('GET /api/v1/health', () => {
  it('returns a healthy response when the database is reachable', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'ok',
      service: 'kmstudio-boss-api',
      database: { status: 'up' },
    });
    expect(typeof response.body.timestamp).toBe('string');
    expect(Number.isFinite(response.body.database.latencyMs)).toBe(true);
  });

  it('returns a JSON 404 for unknown routes', async () => {
    const response = await request(app).get('/api/v1/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ status: 'error' });
  });
});
