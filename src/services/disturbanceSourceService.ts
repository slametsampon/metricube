// src/services/disturbanceSourceService.ts

import { DisturbanceSource } from '@/models/disturbanceSource';
import { useMock } from './factory';

export async function getDisturbanceSources(): Promise<DisturbanceSource[]> {
  if (useMock) {
    const res = await fetch('/mocks/disturbance_sources.json');
    if (!res.ok) throw new Error('Failed to fetch Disturbance Sources');
    return res.json();
  }

  const res = await fetch('/api/disturbance-sources');
  if (!res.ok) throw new Error('Failed to fetch Disturbance Sources');
  return res.json();
}
