// src/components/dashboard/DisturbanceSummary.tsx

'use client';

import { useEffect, useState } from 'react';
import { getDisturbanceLogs } from '@/services/disturbanceLogService';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function DisturbanceSummary() {
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    getDisturbanceLogs()
      .then((logs) => {
        const sum = logs.reduce((acc, log) => acc + log.duration_minutes, 0);
        setTotalMinutes(sum);
      })
      .catch(console.error);
  }, []);

  const totalHours = (totalMinutes / 60).toFixed(2);

  return (
    <div className="min-w-[250px] w-full sm:w-auto bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-700 border border-red-200 dark:border-gray-600 rounded-lg shadow p-5">
      <div className="flex items-center space-x-4">
        <div className="bg-red-500 text-white p-2 rounded-full">
          <ExclamationTriangleIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Shutdown Summary
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total waktu shutdown 2025:
          </p>
          <p className="mt-1 font-extrabold text-red-700 dark:text-white text-[clamp(1.5rem,4vw,2.25rem)] truncate max-w-full">
            {totalHours} jam
          </p>
        </div>
      </div>
    </div>
  );
}
