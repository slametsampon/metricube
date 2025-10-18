// src/app/dashboard/kpi-master/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { KPI } from '@/models/kpi';
import KpiMasterForm from '@/components/dashboard/KpiMasterForm';
import KpiMasterTable from '@/components/dashboard/KpiMasterTable';
import { getKpis } from '@/services/kpiService';

export default function KpiMasterPage() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [editData, setEditData] = useState<KPI | null>(null);

  // 🔁 Load data dari service API
  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const data = await getKpis();
        setKpis(data);
      } catch (error) {
        console.error('Failed to load KPI data:', error);
      }
    };

    fetchKpis();
  }, []);

  // ✅ Tambah atau edit KPI
  const handleSubmit = (kpi: KPI, isEdit: boolean) => {
    if (isEdit) {
      setKpis((prev) => prev.map((item) => (item.id === kpi.id ? kpi : item)));
    } else {
      setKpis((prev) => [
        ...prev,
        {
          ...kpi,
          id: `kpi-${Date.now()}`,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setEditData(null);
  };

  const handleEdit = (kpi: KPI) => setEditData(kpi);

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus KPI ini?')) {
      setKpis((prev) => prev.filter((kpi) => kpi.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">KPI Master</h1>

      <KpiMasterForm
        onSubmit={handleSubmit}
        editData={editData}
        onCancelEdit={() => setEditData(null)}
      />

      <KpiMasterTable data={kpis} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
