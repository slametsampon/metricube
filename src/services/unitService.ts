// src/services/unitService.ts

import { Unit } from '@/models/unit';
import { getEndpoint } from './factory';

export async function getUnits(): Promise<Unit[]> {
  const res = await fetch(getEndpoint('units'));
  if (!res.ok) throw new Error('Failed to load unit data');
  return res.json();
}
