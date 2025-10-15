// src/services/__tests__/kpiRecordService.test.ts

import { describe, test, expect, vi } from 'vitest';
import { getKpiRecords } from '../kpiRecordService';
import mockTargets from '@/mocks/kpi_target.json';

describe('KPI Target Monthly Service', () => {
  test('should return array of monthly KPI targets', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockTargets,
    } as Response);

    const result = await getKpiRecords();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('periode');
  });
});
