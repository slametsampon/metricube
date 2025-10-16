// src/components/KpiDashboard.tsx

'use client';

import { useEffect, useState } from 'react';
import { KPI } from '@/models/kpi';
import { KpiRecord } from '@/models/kpiRecord';
import { KpiTargetAnnual } from '@/models/kpiTargetAnnual';
import { getKpis } from '@/services/kpiService';
import { getKpiRecords } from '@/services/kpiRecordService';
import { getKPITargetAnnuals } from '@/services/kpiTargetAnnualService';
import KpiCard from './KpiCard';

interface KPIWithProgress extends KPI {
  currentValue?: number;
  targetValue?: number;
  progress?: number;
}

export default function KpiDashboard() {
  const [kpis, setKpis] = useState<KPIWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [kpiList, records, targets] = await Promise.all([
          getKpis(),
          getKpiRecords(),
          getKPITargetAnnuals(),
        ]);

        const kpiWithValues: KPIWithProgress[] = kpiList.map((kpi) => {
          const latestRecord = records
            .filter((r) => r.kpi_id === kpi.id)
            .sort(
              (a, b) =>
                new Date(b.periode).getTime() - new Date(a.periode).getTime()
            )[0];

          const annualTarget = targets.find((t) => t.kpi_id === kpi.id);

          const current = latestRecord?.value ?? 0;
          const target = annualTarget?.value ?? 0;
          const progress = target ? (current / target) * 100 : undefined;

          return {
            ...kpi,
            currentValue: current,
            targetValue: target,
            progress,
          };
        });

        setKpis(kpiWithValues);
      } catch (err) {
        console.error('Failed to load KPI dashboard data', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p>Loading KPI dashboard...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi) => (
        <KpiCard
          key={kpi.id}
          name={kpi.name}
          value={kpi.currentValue ?? 'N/A'}
          unit={kpi.unit}
        />
      ))}
    </div>
  );
}
