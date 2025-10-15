// src/services/__tests__/unitService.test.ts

import { describe, test, expect, vi } from 'vitest';
import { getUnits } from '../unitService';
import mockUnits from '@/mocks/units.json';

describe('Unit Service', () => {
  test('should return array of units', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUnits,
    } as Response);

    const result = await getUnits();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('name');
  });
});
