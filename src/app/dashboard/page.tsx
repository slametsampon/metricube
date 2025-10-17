// src/app/dashboard/page.tsx

import Sidebar from '@/components/Sidebar';
import KpiSummaryCard from '@/components/dashboard/KpiSummaryCard';
import RunningHoursChart from '@/components/dashboard/RunningHoursChart';
import DisturbancePieChart from '@/components/dashboard/DisturbancePieChart';
import KpiProgressTable from '@/components/dashboard/KpiProgressTable';
import DisturbanceSummary from '@/components/dashboard/DisturbanceSummary';

export default function DashboardPage() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 p-6 space-y-6 overflow-y-auto">
        <h1 className="hidden md:block text-2xl font-bold">
          Dashboard KPI 2025 - Maintenance
        </h1>

        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4">
          <div className="min-w-[250px] flex-1">
            <KpiSummaryCard />
          </div>
          <div className="min-w-[250px] flex-1">
            <DisturbanceSummary />
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RunningHoursChart />
          <DisturbancePieChart />
        </div>

        {/* Table */}
        <KpiProgressTable />
      </section>
    </main>
  );
}
