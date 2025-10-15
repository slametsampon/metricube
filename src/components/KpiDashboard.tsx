// src/components/KpiDashboard.tsx

'use client';

import { useEffect, useState } from 'react';
import { getKpis } from '@/services/kpiService';
import { KPI } from '@/models/kpi';
import KpiCard from './KpiCard';

export default function KpiDashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getKpis()
      .then((data) => setKpis(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {kpis.map((kpi) => (
        <KpiCard
          key={kpi.id}
          name={kpi.name}
          unit={kpi.unit}
          value={Math.floor(Math.random() * 1000)} // Simulasi nilai
        />
      ))}
    </div>
  );
}
