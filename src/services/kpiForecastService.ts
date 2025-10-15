// src/services/kpiForecastService.ts

import { KpiForecast } from '@/models/kpiForecast';
import { useMock } from './factory';

export async function getKpiForecasts(): Promise<KpiForecast[]> {
  if (useMock) {
    const res = await fetch('/mocks/kpi_forecast.json');
    if (!res.ok) throw new Error('Failed to fetch KPI Forecasts');
    return res.json();
  }

  const res = await fetch('/api/kpi-forecasts');
  if (!res.ok) throw new Error('Failed to fetch KPI Forecasts');
  return res.json();
}
