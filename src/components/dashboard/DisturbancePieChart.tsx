// src/components/dashboard/DisturbancePieChart.tsx

'use client';

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getDisturbanceLogs } from '@/services/disturbanceLogService';
import { getDisturbanceSources } from '@/services/disturbanceSourceService';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DisturbancePieChart() {
  const [dataChart, setDataChart] = useState<{
    internal: number;
    external: number;
  }>({
    internal: 0,
    external: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [logs, sources] = await Promise.all([
          getDisturbanceLogs(),
          getDisturbanceSources(),
        ]);

        // Buat map source_id -> type ('internal' | 'external')
        const sourceTypeMap = sources.reduce(
          (acc, source) => {
            acc[source.id] = source.type;
            return acc;
          },
          {} as Record<string, 'internal' | 'external'>
        );

        const result = logs.reduce(
          (acc, log) => {
            const type = sourceTypeMap[log.source_id];
            if (type === 'internal') acc.internal += log.duration_minutes;
            else if (type === 'external') acc.external += log.duration_minutes;
            return acc;
          },
          { internal: 0, external: 0 }
        );

        setDataChart(result);
      } catch (err) {
        console.error('Failed to load disturbance data:', err);
      }
    }

    loadData();
  }, []);

  const data = {
    labels: ['Internal', 'External'],
    datasets: [
      {
        data: [dataChart.internal, dataChart.external],
        backgroundColor: ['#4ade80', '#f87171'], // Tailwind green-400, red-400
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Proporsi Gangguan Internal vs Eksternal',
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <Pie data={data} options={options} />
    </div>
  );
}
