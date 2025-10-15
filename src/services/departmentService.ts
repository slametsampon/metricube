// src/services/departmentService.ts

import { Department } from '@/models/department';
import { getEndpoint } from './factory';

export async function getDepartments(): Promise<Department[]> {
  const res = await fetch(getEndpoint('departments'));
  if (!res.ok) throw new Error('Failed to load department data');
  return res.json();
}
