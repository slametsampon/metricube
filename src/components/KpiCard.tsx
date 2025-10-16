// src/components/KpiCard.tsx

import React from 'react';

// Tambahkan prop progress ke KpiCard (optional)
type Props = {
  name: string;
  value: number | string;
  unit?: string;
  progress?: number;
};

const KpiCard = ({ name, value, unit, progress }: Props) => {
  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
      <h3 className="text-sm font-medium text-gray-500">{name}</h3>
      <p className="text-xl font-bold text-primary-600">
        {value} {unit && <span className="text-sm">{unit}</span>}
      </p>
      {progress !== undefined && (
        <div className="mt-2 bg-gray-200 h-2 rounded-full">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default KpiCard;
