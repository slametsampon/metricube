// src/components/dashboard/RunningHoursChart.tsx

'use client';

import { useEffect, useState } from 'react';
import { getKpiRecords } from '@/services/kpiRecordService';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function RunningHoursChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    getKpiRecords()
      .then((records) => {
        const rhRecords = records
          .filter((rec) => rec.kpi_id === 'kpi-001')
          .sort(
            (a, b) =>
              new Date(a.periode).getTime() - new Date(b.periode).getTime()
          );

        const dataByMonth = rhRecords.map((rec) => ({
          label: new Date(rec.periode).toLocaleString('id-ID', {
            month: 'short',
          }),
          value: rec.value,
        }));

        setLabels(dataByMonth.map((d) => d.label));
        setValues(dataByMonth.map((d) => d.value));
      })
      .catch(console.error);
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Running Hours',
        data: values,
        borderColor: 'rgb(59, 130, 246)', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Running Hours Bulanan (2025)',
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <Line data={chartData} options={options} />
    </div>
  );
}
