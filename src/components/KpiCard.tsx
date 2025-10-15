// src/components/KpiCard.tsx

import React from 'react';

type Props = {
  name: string;
  value: number | string;
  unit?: string;
};

const KpiCard = ({ name, value, unit }: Props) => {
  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
      <h3 className="text-sm font-medium text-gray-500">{name}</h3>
      <p className="text-xl font-bold text-primary-600">
        {value} {unit && <span className="text-sm">{unit}</span>}
      </p>
    </div>
  );
};

export default KpiCard;
