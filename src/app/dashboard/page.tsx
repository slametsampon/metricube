// src/app/dashboard/page.tsx

import KpiSummaryCard from '@/components/dashboard/KpiSummaryCard';
import RunningHoursChart from '@/components/dashboard/RunningHoursChart';
import DisturbancePieChart from '@/components/dashboard/DisturbancePieChart';
import KpiProgressTable from '@/components/dashboard/KpiProgressTable';
import DisturbanceSummary from '@/components/dashboard/DisturbanceSummary';

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard KPI 2025 - Maintenance</h1>

      {/* Summary Cards Section */}
      <section className="flex flex-wrap gap-4">
        <div className="min-w-[250px] flex-1">
          <KpiSummaryCard />
        </div>
        <div className="min-w-[250px] flex-1">
          <DisturbanceSummary />
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RunningHoursChart />
        <DisturbancePieChart />
      </section>

      {/* Progress Table */}
      <section>
        <KpiProgressTable />
      </section>
    </main>
  );
}
