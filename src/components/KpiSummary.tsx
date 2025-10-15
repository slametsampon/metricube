// src/components/KpiSummary.tsx

import React from 'react';

interface KpiSummaryProps {
  total: number;
  average: number;
  unit: string;
}

export default function KpiSummary({ total, average, unit }: KpiSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <p className="text-lg font-bold">Summary</p>
      <div className="mt-2">
        <p>
          Total: {total} {unit}
        </p>
        <p>
          Average: {average.toFixed(2)} {unit}
        </p>
      </div>
    </div>
  );
}
