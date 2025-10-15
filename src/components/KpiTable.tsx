// src/components/KpiTable.tsx

import React from 'react';
import { KPI } from '@/models/kpi';

interface Props {
  data: KPI[];
}

export default function KpiTable({ data }: Props) {
  return (
    <table className="min-w-full text-left border border-gray-200 dark:border-gray-700">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Unit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((kpi) => (
          <tr
            key={kpi.id}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <td className="px-4 py-2">{kpi.name}</td>
            <td className="px-4 py-2">{kpi.description}</td>
            <td className="px-4 py-2">{kpi.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
