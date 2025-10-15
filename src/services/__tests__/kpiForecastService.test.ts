// src/services/__tests__/kpiForecastService.test.ts

import { describe, test, expect, vi } from 'vitest';
import { getKpiForecasts } from '../kpiForecastService';
import mockData from '@/mocks/kpi_forecast.json';

describe('KPI Forecast Service', () => {
  test('should return array of KPI forecasts', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await getKpiForecasts();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('periode');
  });
});
