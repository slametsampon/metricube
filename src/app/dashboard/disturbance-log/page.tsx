// src/app/dashboard/disturbance-log/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getDisturbanceLogs } from '@/services/disturbanceLogService';
import { getDepartments } from '@/services/departmentService';
import { getUnits } from '@/services/unitService';
import { getDisturbanceSources } from '@/services/disturbanceSourceService';
import { DisturbanceLog, DisturbanceLogPayload } from '@/models/disturbanceLog';
import DisturbanceForm from '@/components/dashboard/DisturbanceForm';
import DisturbanceTable from '@/components/dashboard/DisturbanceTable';

export default function DisturbanceLogPage() {
  const [logs, setLogs] = useState<DisturbanceLog[]>([]);
  const [departments, setDepartments] = useState<
    { id: string; name: string }[]
  >([]);
  const [units, setUnits] = useState<{ id: string; name: string }[]>([]);
  const [sources, setSources] = useState<{ id: string; name: string }[]>([]);
  const [editingLog, setEditingLog] = useState<DisturbanceLog | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [logData, deptData, unitData, sourceData] = await Promise.all([
        getDisturbanceLogs(),
        getDepartments(),
        getUnits(),
        getDisturbanceSources(),
      ]);
      setLogs(logData);
      setDepartments(deptData);
      setUnits(unitData);
      setSources(sourceData);
    }

    fetchData();
  }, []);

  const handleSubmit = (data: DisturbanceLogPayload) => {
    if (editingLog) {
      // Update mode
      setLogs((prev) =>
        prev.map((log) =>
          log.id === editingLog.id ? { ...log, ...data } : log
        )
      );
      setEditingLog(null);
    } else {
      // Add new
      const newLog: DisturbanceLog = {
        ...data,
        id: `log-${Date.now()}`,
        created_at: new Date().toISOString(),
        created_by: 'user',
      };
      setLogs([newLog, ...logs]);
    }
  };

  const handleEdit = (log: DisturbanceLog) => {
    setEditingLog(log);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      setLogs((prev) => prev.filter((log) => log.id !== id));
      if (editingLog?.id === id) {
        setEditingLog(null);
      }
    }
  };

  const handleCancel = () => {
    setEditingLog(null);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Disturbance Log</h1>
      <div className="flex flex-col space-y-6">
        <DisturbanceForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editing={editingLog}
          departments={departments}
          units={units}
          sources={sources}
        />
        <DisturbanceTable
          logs={logs}
          departments={departments}
          units={units}
          sources={sources}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
