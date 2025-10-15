// src/services/kpiTargetAnnualService.ts

import { KpiTargetAnnual } from '@/models/kpiTargetAnnual';
import { useMock } from './factory';

export async function getKPITargetAnnuals(): Promise<KpiTargetAnnual[]> {
  if (useMock) {
    const res = await fetch('/mocks/kpi_target_annual.json');
    if (!res.ok) throw new Error('Failed to fetch KPI Target Annual');
    return res.json();
  }

  const res = await fetch('/api/kpi-target-annual');
  if (!res.ok) throw new Error('Failed to fetch KPI Target Annual');
  return res.json();
}
