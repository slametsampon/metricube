// src/models/disturbanceLog.ts

export type DisturbanceCategory =
  | 'electrical'
  | 'mechanical'
  | 'instrument'
  | 'utility'
  | 'other';

export interface DisturbanceLog {
  id: string;
  department_id: string;
  unit_id: string;
  periode: string;
  source_id: string;
  duration_minutes: number;
  category: DisturbanceCategory;
  description: string;
  created_by?: string;
  created_at: string;
}
