// src/app/form/new-kpi-record/page.tsx

'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { getKpis } from '@/services/kpiService';
import { getDepartments } from '@/services/departmentService';
import { getUnits } from '@/services/unitService';

const formSchema = z.object({
  kpi_id: z.string().nonempty(),
  department_id: z.string().nonempty(),
  unit_id: z.string().nonempty(),
  periode: z.string().nonempty(),
  value: z.coerce.number(),
  source: z.enum(['manual', 'sensor', 'imported']),
  note: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function NewKpiRecordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [kpis, setKpis] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    getKpis().then(setKpis);
    getDepartments().then(setDepartments);
    getUnits().then(setUnits);
  }, []);

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      created_by: 'admin',
      created_at: new Date().toISOString(),
    };

    console.log('Submitting:', payload);

    // Jika backend tersedia:
    // await fetch('/api/kpi-records', {
    //   method: 'POST',
    //   body: JSON.stringify(payload),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-800 shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Manual Entry: KPI Record</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">KPI</label>
          <select {...register('kpi_id')} className="form-select w-full">
            <option value="">Pilih KPI</option>
            {kpis.map((kpi) => (
              <option key={kpi.id} value={kpi.id}>
                {kpi.name}
              </option>
            ))}
          </select>
          {errors.kpi_id && (
            <p className="text-red-500 text-sm">{errors.kpi_id.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Departemen</label>
          <select {...register('department_id')} className="form-select w-full">
            <option value="">Pilih Departemen</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Unit</label>
          <select {...register('unit_id')} className="form-select w-full">
            <option value="">Pilih Unit</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Periode</label>
          <input
            type="date"
            {...register('periode')}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nilai</label>
          <input
            type="number"
            step="0.01"
            {...register('value')}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Sumber</label>
          <select {...register('source')} className="form-select w-full">
            <option value="manual">Manual</option>
            <option value="sensor">Sensor</option>
            <option value="imported">Imported</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Catatan (Opsional)
          </label>
          <textarea
            {...register('note')}
            className="form-textarea w-full"
            rows={2}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan Record
          </button>
        </div>
      </form>
    </div>
  );
}
