// src/components/dashboard/KpiMasterForm.tsx

'use client';

import { KPI, KpiType } from '@/models/kpi';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema Zod dinamis
const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  unit: z.string().optional(),
  type: z.enum(['numeric', 'boolean', 'status']),
  value: z.union([z.string(), z.number(), z.boolean()]),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: KPI, isEdit: boolean) => void;
  editData?: KPI | null;
  onCancelEdit: () => void;
}

export default function KpiMasterForm({
  onSubmit,
  editData,
  onCancelEdit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      unit: '',
      type: 'numeric',
      value: '',
    },
  });

  const type = watch('type');

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        description: editData.description,
        unit: editData.unit,
        type: editData.type,
        value: editData.value,
      });
    } else {
      reset();
    }
  }, [editData, reset]);

  const onFormSubmit = (data: FormData) => {
    const kpi: KPI = {
      ...data,
      unit: data.unit ?? '',
      id: editData?.id || `kpi-${Date.now()}`,
      created_at: editData?.created_at || new Date().toISOString(),
      is_active: true,
    };
    onSubmit(kpi, Boolean(editData));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white p-4 rounded shadow mb-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama KPI</label>
          <input {...register('name')} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <input {...register('unit')} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tipe</label>
          <select {...register('type')} className="border p-2 rounded w-full">
            <option value="numeric">Numeric</option>
            <option value="boolean">Boolean</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            {...register('description')}
            className="border p-2 rounded w-full"
            rows={3}
          />
        </div>

        {/* Value field dinamis */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Nilai</label>
          {type === 'numeric' && (
            <input
              type="number"
              {...register('value', { valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
          )}
          {type === 'boolean' && (
            <select
              {...register('value')}
              className="border p-2 rounded w-full"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )}
          {type === 'status' && (
            <input
              type="text"
              {...register('value')}
              className="border p-2 rounded w-full"
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            reset();
            onCancelEdit();
          }}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editData ? 'Update' : 'Tambah'}
        </button>
      </div>
    </form>
  );
}
