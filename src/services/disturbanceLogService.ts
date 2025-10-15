// src/services/disturbanceLogService.ts

import { DisturbanceLog } from '@/models/disturbanceLog';
import { useMock } from './factory';

export async function getDisturbanceLogs(): Promise<DisturbanceLog[]> {
  if (useMock) {
    const res = await fetch('/mocks/disturbance_log.json');
    if (!res.ok) throw new Error('Failed to fetch Disturbance Logs');
    return res.json();
  }

  const res = await fetch('/api/disturbance-logs');
  if (!res.ok) throw new Error('Failed to fetch Disturbance Logs');
  return res.json();
}
