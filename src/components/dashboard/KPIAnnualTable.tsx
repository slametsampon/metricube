// src/components/dashboard/KPIAnnualTable.tsx

import { KpiTargetAnnual } from '@/models/kpiTargetAnnual';

interface TableProps {
  data: KpiTargetAnnual[];
  onEdit: (item: KpiTargetAnnual) => void;
  onDelete: (id: string) => void;
}

export default function KPIAnnualTable({ data, onEdit, onDelete }: TableProps) {
  return (
    <div className="overflow-auto bg-white p-4 rounded shadow">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">KPI ID</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Unit</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Value</th>
            <th className="px-4 py-2 border">Note</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item.id}
              className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="px-4 py-2 border">{item.kpi_id}</td>
              <td className="px-4 py-2 border">{item.department_id}</td>
              <td className="px-4 py-2 border">{item.unit_id ?? '-'}</td>
              <td className="px-4 py-2 border">{item.year}</td>
              <td className="px-4 py-2 border">{item.value}</td>
              <td className="px-4 py-2 border">{item.note}</td>
              <td className="px-4 py-2 border">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  {'✏️'}
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  {'🗑️'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
