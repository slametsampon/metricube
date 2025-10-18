// src/services/kpiRecordService.ts

import { KpiRecord } from '@/models/kpiRecord';
import { useMock } from './factory';

const MOCK_API = '/mocks/kpi_record.json'; // read-only jika pakai file

export async function getKpiRecords(): Promise<KpiRecord[]> {
  if (useMock) {
    const res = await fetch(MOCK_API);
    if (!res.ok) throw new Error('Failed to fetch KPI Records');
    return res.json();
  }

  const res = await fetch('/api/kpi-records');
  if (!res.ok) throw new Error('Failed to fetch KPI Records');
  return res.json();
}

// ✅ Tambahkan fungsi untuk membuat KPI Record baru
export async function createKpiRecord(data: KpiRecord): Promise<KpiRecord> {
  if (useMock) {
    console.warn('createKpiRecord mock: data tidak disimpan permanen');
    return Promise.resolve(data);
  }

  const res = await fetch('/api/kpi-records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Gagal menambahkan KPI Record');
  return res.json();
}

// ✅ Tambahkan fungsi update KPI Record
export async function updateKpiRecord(
  id: string,
  data: Partial<KpiRecord>
): Promise<KpiRecord> {
  if (useMock) {
    console.warn('updateKpiRecord mock: data tidak disimpan permanen');
    return Promise.resolve({ id, ...data } as KpiRecord);
  }

  const res = await fetch(`/api/kpi-records/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Gagal memperbarui KPI Record');
  return res.json();
}
