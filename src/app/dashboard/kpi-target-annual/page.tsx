// src/app/dashboard/kpi-target-annual/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { KpiTargetAnnual } from '@/models/kpiTargetAnnual';
import { getKPITargetAnnuals } from '@/services/kpiTargetAnnualService';
import KPIAnnualForm from '@/components/dashboard/KPIAnnualForm';
import KPIAnnualTable from '@/components/dashboard/KPIAnnualTable';

export default function KpiTargetAnnualPage() {
  const [data, setData] = useState<KpiTargetAnnual[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<KpiTargetAnnual | null>(null);

  useEffect(() => {
    getKPITargetAnnuals()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (item: KpiTargetAnnual) => {
    setData((prev) => {
      const exists = prev.find((d) => d.id === item.id);
      if (exists) {
        return prev.map((d) => (d.id === item.id ? item : d));
      }
      return [...prev, item];
    });
    setEditing(null);
  };

  const handleEdit = (item: KpiTargetAnnual) => {
    setEditing(item);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      setData((prev) => prev.filter((d) => d.id !== id));
      if (editing?.id === id) setEditing(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>📊</span> KPI Target Annual
      </h1>

      <KPIAnnualForm
        onSave={handleSave}
        onCancel={() => setEditing(null)}
        editingData={editing}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <KPIAnnualTable
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
