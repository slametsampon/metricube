// src/services/kpiRecordService.ts

import { KpiRecord } from '@/models/kpiRecord';
import { useMock } from './factory';

export async function getKpiRecords(): Promise<KpiRecord[]> {
  if (useMock) {
    const res = await fetch('/mocks/kpi_record.json');
    if (!res.ok) throw new Error('Failed to fetch KPI Records');
    return res.json();
  }

  const res = await fetch('/api/kpi-records');
  if (!res.ok) throw new Error('Failed to fetch KPI Records');
  return res.json();
}
