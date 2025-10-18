// src/components/dashboard/KPIRecordForm.tsx
'use client';

import React from 'react';
import type { Department } from '@/models/department';
import type { Unit } from '@/models/unit';

type FormDataState = {
  periode: string;
  value: string;
  note: string;
  department_id: string;
  unit_id: string;
};

type Props = {
  formData: FormDataState;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  editingId: string | null;
  departments: Department[];
  units: Unit[];
};

export default function KPIRecordForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  editingId,
  departments,
  units,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-md shadow space-y-4 max-w-xl">
      <h2 className="text-lg font-semibold mb-2">Entry Form</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Periode</label>
          <input
            type="date"
            name="periode"
            value={formData.periode}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Value</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={onChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select
            name="department_id"
            value={formData.department_id}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Pilih Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <select
            name="unit_id"
            value={formData.unit_id}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Pilih Unit</option>
            {units
              .filter((u) => u.department_id === formData.department_id)
              .map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {editingId ? 'Update' : 'Simpan'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
