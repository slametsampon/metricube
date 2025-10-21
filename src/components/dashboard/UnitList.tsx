// src/components/dashboard/UnitList.tsx

'use client';

import { Unit } from '@/models/unit';

interface Props {
  units: Unit[];
  onEdit: (unit: Unit) => void;
  onDelete: (id: string) => void;
}

export default function UnitList({ units, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, index) => (
            <tr key={unit.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{unit.name}</td>
              <td className="px-4 py-2">{unit.location}</td>
              <td className="px-4 py-2">{unit.description}</td>
              <td className="px-4 py-2">{unit.department_id}</td>
              <td className="px-4 py-2">{unit.is_active ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 text-sm text-gray-500">
                {new Date(unit.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(unit)}
                  className="text-blue-600 hover:underline"
                >
                  {'✏️'}
                </button>
                <button
                  onClick={() => onDelete(unit.id)}
                  className="text-red-600 hover:underline"
                >
                  {'🗑️'}
                </button>
              </td>
            </tr>
          ))}
          {units.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No units found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
