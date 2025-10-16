// src/components/dashboard/KpiSummaryCard.tsx

'use client';

import { useEffect, useState } from 'react';
import { getKpiRecords } from '@/services/kpiRecordService';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function KpiSummaryCard() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getKpiRecords()
      .then((data) => {
        const sum = data.reduce((acc, cur) => acc + cur.value, 0);
        setTotal(sum);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg shadow p-5 w-full">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-500 text-white p-2 rounded-full">
          <ChartBarIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            KPI Summary
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total nilai record KPI:
          </p>
          <p className="text-3xl font-extrabold text-blue-700 dark:text-white mt-1">
            {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
