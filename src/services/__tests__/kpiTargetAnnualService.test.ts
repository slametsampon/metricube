// src/services/__tests__/kpiTargetAnnualService.test.ts

import { describe, test, expect, vi } from 'vitest';
import { getKPITargetAnnuals } from '../kpiTargetAnnualService';
import mockTargets from '@/mocks/kpi_target_annual.json';

describe('KPI Target Annual Service', () => {
  test('should return array of annual KPI targets', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockTargets,
    } as Response);

    const result = await getKPITargetAnnuals();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('year');
  });
});
