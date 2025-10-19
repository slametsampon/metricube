// src/components/dashboard/KPIAnnualForm.tsx

'use client';

import { useEffect, useState } from 'react';
import { KpiTargetAnnual } from '@/models/kpiTargetAnnual';
import { Department } from '@/models/department';
import { Unit } from '@/models/unit';
import { getDepartments } from '@/services/departmentService';
import { getUnits } from '@/services/unitService';

interface FormProps {
  onSave: (item: KpiTargetAnnual) => void;
  onCancel: () => void;
  editingData?: KpiTargetAnnual | null;
}

export default function KPIAnnualForm({
  onSave,
  onCancel,
  editingData,
}: FormProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [formData, setFormData] = useState<
    Omit<KpiTargetAnnual, 'id' | 'created_at'>
  >({
    kpi_id: '',
    department_id: '',
    unit_id: '',
    year: new Date().getFullYear(),
    value: 0,
    note: '',
  });

  useEffect(() => {
    getDepartments().then(setDepartments).catch(console.error);
    getUnits().then(setUnits).catch(console.error);
  }, []);

  useEffect(() => {
    if (editingData) {
      const { id, created_at, ...rest } = editingData;
      setFormData(rest);
    } else {
      resetForm();
    }
  }, [editingData]);

  const resetForm = () => {
    setFormData({
      kpi_id: '',
      department_id: '',
      unit_id: '',
      year: new Date().getFullYear(),
      value: 0,
      note: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'value' || name === 'year' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const item: KpiTargetAnnual = {
      ...formData,
      id:
        editingData?.id ?? `kta-${Math.random().toString(36).substring(2, 9)}`,
      created_at: editingData?.created_at ?? now,
    };
    onSave(item);
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-6 space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">KPI ID</label>
          <input
            name="kpi_id"
            value={formData.kpi_id}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Department</label>
          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">-- Pilih Department --</option>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Unit</label>
          <select
            name="unit_id"
            value={formData.unit_id}
            onChange={handleChange}
            className="input"
          >
            <option value="">-- Pilih Unit --</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Year</label>
          <input
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Value</label>
          <input
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Note</label>
          <input
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white font-semibold transition ${
            editingData
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editingData ? 'Update' : 'Save'}
        </button>
        {editingData && (
          <button
            type="button"
            onClick={() => {
              onCancel();
              resetForm();
            }}
            className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white font-semibold transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
