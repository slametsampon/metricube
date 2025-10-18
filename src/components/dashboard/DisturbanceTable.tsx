// src/components/dashboard/DisturbanceTable.tsx

'use client';

import { DisturbanceLog } from '@/models/disturbanceLog';

interface Props {
  logs: DisturbanceLog[];
  departments: { id: string; name: string }[];
  units: { id: string; name: string }[];
  sources: { id: string; name: string }[];
  onEdit: (log: DisturbanceLog) => void;
  onDelete: (id: string) => void;
}

export default function DisturbanceTable({
  logs,
  departments,
  units,
  sources,
  onEdit,
  onDelete,
}: Props) {
  const findName = (list: { id: string; name: string }[], id: string) =>
    list.find((item) => item.id === id)?.name || id;

  return (
    <div className="overflow-auto border p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">List Record</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500">Tidak ada data</p>
      ) : (
        <table className="table table-zebra w-full text-sm min-w-[800px]">
          <thead>
            <tr>
              <th className="w-28 text-left">Periode</th>
              <th className="w-32 text-left">Dept</th>
              <th className="w-40 text-left">Unit</th>
              <th className="w-48 text-left">Source</th>
              <th className="w-20 text-left">Durasi</th>
              <th className="w-28 text-left">Kategori</th>
              <th className="w-[300px] text-left">Deskripsi</th>
              <th className="w-24 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.periode}</td>
                <td>{findName(departments, log.department_id)}</td>
                <td>{findName(units, log.unit_id)}</td>
                <td className="whitespace-normal">
                  {findName(sources, log.source_id)}
                </td>
                <td>{log.duration_minutes} m</td>
                <td>{log.category}</td>
                <td className="whitespace-normal">{log.description}</td>
                <td className="text-center">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => onEdit(log)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(log.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
