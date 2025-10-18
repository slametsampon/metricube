// src/components/dashboard/KPIRecordTable.tsx
'use client';

import React from 'react';
import type { KpiRecord } from '@/models/kpiRecord';
import type { Department } from '@/models/department';
import type { Unit } from '@/models/unit';

type Props = {
  records: KpiRecord[];
  departments: Department[];
  units: Unit[];
  onEdit: (record: KpiRecord) => void;
  onDelete: (id: string) => void;
};

export default function KPIRecordTable({
  records,
  departments,
  units,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h2 className="text-md font-semibold mb-2">List Record</h2>

      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Periode</th>
            <th className="p-2 text-left">Value</th>
            <th className="p-2 text-left">Note</th>
            <th className="p-2 text-left">KPI ID</th>
            <th className="p-2 text-left">Department</th>
            <th className="p-2 text-left">Unit</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id} className="border-t">
              <td className="p-2">{rec.periode}</td>
              <td className="p-2">{rec.value}</td>
              <td className="p-2">{rec.note}</td>
              <td className="p-2">{rec.kpi_id}</td>
              <td className="p-2">
                {departments.find((d) => d.id === rec.department_id)?.name ||
                  rec.department_id}
              </td>
              <td className="p-2">
                {units.find((u) => u.id === rec.unit_id)?.name || rec.unit_id}
              </td>
              <td className="p-2 whitespace-nowrap">
                <button
                  onClick={() => onEdit(rec)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(rec.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
