// src/services/__tests__/kpiService.test.ts

import { describe, test, expect, vi } from 'vitest';
import { getKpis } from '../kpiService';
import mockData from '@/mocks/kpis.json'; // pastikan tsconfig path sudah OK

describe('KPI Service', () => {
  test('should return array of KPI metadata', async () => {
    // Mock global fetch untuk return data mock
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await getKpis();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('name');
  });
});
