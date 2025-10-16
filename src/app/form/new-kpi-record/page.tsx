// src/app/form/new-kpi-record/page.tsx

'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { getKpis } from '@/services/kpiService';
import { getDepartments } from '@/services/departmentService';
import { getUnits } from '@/services/unitService';
import { KPI } from '@/models/kpi';
import { Unit } from '@/models/unit';
import { Department } from '@/models/department';

const formSchema = z.object({
  kpi_id: z.string().nonempty(),
  department_id: z.string().nonempty(),
  unit_id: z.string().nonempty(),
  periode: z.string().nonempty(),
  value: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'Nilai harus lebih dari 0')
  ),
  source: z.enum(['manual', 'sensor', 'imported']),
  note: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function NewKpiRecordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [kpis, setKpis] = useState<KPI[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

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
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Manual Entry: KPI Record
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* KPI */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            KPI
          </label>
          <select
            {...register('kpi_id')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          >
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

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Departemen
          </label>
          <select
            {...register('department_id')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          >
            <option value="">Pilih Departemen</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Unit
          </label>
          <select
            {...register('unit_id')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          >
            <option value="">Pilih Unit</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Periode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Periode
          </label>
          <input
            type="date"
            {...register('periode')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Nilai
          </label>
          <input
            type="number"
            step="0.01"
            {...register('value')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          />
          {errors.value && (
            <p className="text-red-500 text-sm">{errors.value.message}</p>
          )}
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Sumber
          </label>
          <select
            {...register('source')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          >
            <option value="manual">Manual</option>
            <option value="sensor">Sensor</option>
            <option value="imported">Imported</option>
          </select>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Catatan (Opsional)
          </label>
          <textarea
            {...register('note')}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Simpan Record
          </button>
        </div>
      </form>
    </div>
  );
}
