// src/components/KpiList.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { getKpis } from '@/services/kpiService';
import { KPI } from '@/models/kpi';

export default function KpiList() {
  const [kpis, setKpis] = useState<KPI[]>([]);

  useEffect(() => {
    getKpis()
      .then(setKpis)
      .catch((e) => {
        console.error('Failed to load KPIs', e);
      });
  }, []);

  return (
    <ul>
      {kpis.map((kpi) => (
        <li key={kpi.id}>
          <strong>{kpi.name}</strong> ({kpi.unit})
        </li>
      ))}
    </ul>
  );
}
