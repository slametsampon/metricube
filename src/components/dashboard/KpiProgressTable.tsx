// src/components/dashboard/KpiProgressTable.tsx

'use client';

import { useEffect, useState } from 'react';
import { getKpis } from '@/services/kpiService';
import { getKpiRecords } from '@/services/kpiRecordService';
import { getKPITargetAnnuals } from '@/services/kpiTargetAnnualService';
import { formatCurrency } from '@/lib/format';

interface Row {
  id: string;
  name: string;
  unit: string;
  target: number;
  actual: number;
  progress: number;
  status: 'On Track' | 'Behind';
}

export default function KpiProgressTable() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [kpis, records, targets] = await Promise.all([
          getKpis(),
          getKpiRecords(),
          getKPITargetAnnuals(),
        ]);

        const result: Row[] = kpis.map((kpi) => {
          const target = targets.find((t) => t.kpi_id === kpi.id)?.value ?? 0;

          // Ambil nilai actual dari record terbaru
          const latest = records
            .filter((r) => r.kpi_id === kpi.id)
            .sort(
              (a, b) =>
                new Date(b.periode).getTime() - new Date(a.periode).getTime()
            )[0];

          const actual = latest?.value ?? 0;
          const progress = target > 0 ? (actual / target) * 100 : 0;
          const status = progress >= 75 ? 'On Track' : 'Behind';

          return {
            id: kpi.id,
            name: kpi.name,
            unit: kpi.unit,
            target,
            actual,
            progress,
            status,
          };
        });

        setRows(result);
      } catch (err) {
        console.error('Failed to load KPI progress table:', err);
      }
    }

    loadData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">KPI Progress 2025</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">KPI</th>
              <th className="px-4 py-2">Target</th>
              <th className="px-4 py-2">Realisasi</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-200 dark:border-gray-600"
              >
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">
                  {row.unit === 'USD'
                    ? formatCurrency(row.target, 'USD')
                    : `${row.target} ${row.unit}`}
                </td>
                <td className="px-4 py-2">
                  {row.unit === 'USD'
                    ? formatCurrency(row.actual, 'USD')
                    : `${row.actual} ${row.unit}`}
                </td>
                <td className="px-4 py-2">{row.progress.toFixed(2)}%</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      row.status === 'On Track'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
