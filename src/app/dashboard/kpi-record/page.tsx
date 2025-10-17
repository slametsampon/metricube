// src/app/dashboard/kpi-record/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getKpiRecords } from '@/services/kpiRecordService';
import type { KpiRecord } from '@/models/kpiRecord';

export default function KPIRecordPage() {
  const [records, setRecords] = useState<KpiRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const data = await getKpiRecords();
        setRecords(data);
      } catch (err) {
        setError('Gagal memuat data KPI Records');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">KPI Record</h1>

      {/* Form Create/Edit */}
      <div className="bg-white p-6 rounded-md shadow space-y-4 max-w-md">
        <h2 className="text-lg font-semibold mb-2">Entry Form</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Periode</label>
            <input
              type="date"
              name="periode"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Value</label>
            <input
              type="number"
              name="value"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              name="note"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Simpan
          </button>
        </form>
      </div>

      {/* List Entries */}
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-md font-semibold mb-2">List Record</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Periode</th>
                <th className="p-2 text-left">Value</th>
                <th className="p-2 text-left">Note</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="border-t">
                  <td className="p-2">{rec.periode}</td>
                  <td className="p-2">{rec.value}</td>
                  <td className="p-2">{rec.note}</td>
                  <td className="p-2">
                    <button className="text-blue-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
