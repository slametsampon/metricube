// src/components/dashboard/KpiMasterTable.tsx

'use client';

import { KPI } from '@/models/kpi';

interface Props {
  data: KPI[];
  onEdit: (kpi: KPI) => void;
  onDelete: (id: string) => void;
}

export default function KpiMasterTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border">Nama</th>
            <th className="px-4 py-2 text-left border">Deskripsi</th>
            <th className="px-4 py-2 text-left border">Unit</th>
            <th className="px-4 py-2 text-left border">Tipe</th>
            <th className="px-4 py-2 text-left border">Nilai</th>
            <th className="px-4 py-2 text-left border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((kpi, index) => (
            <tr
              key={kpi.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} // ✅ warna selang-seling
            >
              <td className="px-4 py-2 border">{kpi.name}</td>
              <td className="px-4 py-2 border">{kpi.description}</td>
              <td className="px-4 py-2 border">{kpi.unit}</td>
              <td className="px-4 py-2 border capitalize">{kpi.type}</td>
              <td className="px-4 py-2 border">{formatKpiValue(kpi)}</td>
              <td className="px-4 py-2 border">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(kpi)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(kpi.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500 border">
                Belum ada data KPI
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// 🔧 Format nilai sesuai tipe dan unit
function formatKpiValue(kpi: KPI): string {
  switch (kpi.type) {
    case 'numeric':
      return formatNumericValue(kpi.value, kpi.unit);
    case 'boolean':
      return kpi.value ? 'Yes ✅' : 'No ❌';
    case 'status':
      return String(kpi.value);
    default:
      return '-';
  }
}

function formatNumericValue(value: unknown, unit: string): string {
  if (typeof value !== 'number') return '-';

  const currencyUnits = ['USD', 'IDR', 'EUR', 'JPY'];
  if (currencyUnits.includes(unit)) {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: unit,
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  }

  return `${value} ${unit}`.trim();
}
