// src/app/dashboard/kpi-record/page.tsx

'use client';

import { useEffect, useState } from 'react';
import {
  getKpiRecords,
  createKpiRecord,
  updateKpiRecord,
} from '@/services/kpiRecordService';
import { getDepartments } from '@/services/departmentService';
import { getUnits } from '@/services/unitService';

import type { KpiRecord } from '@/models/kpiRecord';
import type { Department } from '@/models/department';
import type { Unit } from '@/models/unit';

import KPIRecordForm from '@/components/dashboard/KPIRecordForm';
import KPIRecordTable from '@/components/dashboard/KPIRecordTable';

type FormDataState = {
  periode: string;
  value: string;
  note: string;
  department_id: string;
  unit_id: string;
};

export default function KPIRecordPage() {
  const [records, setRecords] = useState<KpiRecord[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataState>({
    periode: '',
    value: '',
    note: '',
    department_id: '',
    unit_id: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [kpi, dept, unit] = await Promise.all([
          getKpiRecords(),
          getDepartments(),
          getUnits(),
        ]);
        setRecords(kpi);
        setDepartments(dept);
        setUnits(unit);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === 'department_id') {
        return { ...prev, department_id: value, unit_id: '' };
      }
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formData.periode ||
      !formData.value ||
      !formData.department_id ||
      !formData.unit_id
    ) {
      alert('Semua field wajib diisi');
      return;
    }

    try {
      if (editingId) {
        const updated = await updateKpiRecord(editingId, {
          ...formData,
          value: parseFloat(formData.value),
        });
        setRecords((prev) =>
          prev.map((r) => (r.id === editingId ? updated : r))
        );
      } else {
        const newRecord: KpiRecord = {
          id: `rec-${Date.now()}`,
          kpi_id: 'kpi-001',
          department_id: formData.department_id,
          unit_id: formData.unit_id,
          periode: formData.periode,
          value: parseFloat(formData.value),
          note: formData.note,
          source: 'manual',
          created_by: 'system',
          created_at: new Date().toISOString(),
        };
        const created = await createKpiRecord(newRecord);
        setRecords((prev) => [created, ...prev]);
      }

      setFormData({
        periode: '',
        value: '',
        note: '',
        department_id: '',
        unit_id: '',
      });
      setEditingId(null);
    } catch (err: any) {
      alert(`Gagal menyimpan: ${err.message}`);
    }
  }

  function handleEdit(record: KpiRecord) {
    setFormData({
      periode: record.periode,
      value: record.value.toString(),
      note: record.note,
      department_id: record.department_id ?? '',
      unit_id: record.unit_id ?? '',
    });
    setEditingId(record.id);
  }

  function handleDelete(id: string) {
    if (confirm('Hapus data ini?')) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      if (editingId === id) {
        setFormData({
          periode: '',
          value: '',
          note: '',
          department_id: '',
          unit_id: '',
        });
        setEditingId(null);
      }
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">KPI Record</h1>

      <KPIRecordForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          setFormData({
            periode: '',
            value: '',
            note: '',
            department_id: '',
            unit_id: '',
          });
          setEditingId(null);
        }}
        editingId={editingId}
        departments={departments}
        units={units}
      />

      {loading ? (
        <p className="text-sm text-gray-500">Memuat data...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <KPIRecordTable
          records={records}
          departments={departments}
          units={units}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
