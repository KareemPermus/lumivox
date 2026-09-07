import handler from '@/pages/api/features';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/lib/db', () => ({
  getDb: jest.fn(() => ({
    prepare: jest.fn(() => ({
      all: jest.fn(() => [
        { id: 1, title: 'Lightning Fast', description: 'Blazing fast performance optimized for modern workflows.', icon: 'Zap' },
        { id: 2, title: 'Secure by Default', description: 'Enterprise-grade security baked into every layer.', icon: 'Shield' },
      ]),
    })),
  })),
}));

describe('/api/features', () => {
  it('returns features list on GET', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('description');
    expect(data[0]).toHaveProperty('icon');
  });

  it('returns 405 for non-GET methods', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'POST' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(405);
  });
});