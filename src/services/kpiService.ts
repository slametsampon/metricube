// src/services/kpiService.ts

import { KPI } from '@/models/kpi';
import { getEndpoint } from './factory';

export async function getKpis(): Promise<KPI[]> {
  const res = await fetch(getEndpoint('kpis'));
  if (!res.ok) throw new Error('Failed to load KPI data');
  return res.json();
}
