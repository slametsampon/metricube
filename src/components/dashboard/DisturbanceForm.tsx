// src/components/dashboard/DisturbanceForm.tsx

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  DisturbanceLog,
  DisturbanceLogPayload,
  DISTURBANCE_CATEGORIES,
} from '@/models/disturbanceLog';

interface Props {
  editing: DisturbanceLog | null;
  onSubmit: (data: DisturbanceLogPayload) => void;
  onCancel: () => void;
  departments: { id: string; name: string }[];
  units: { id: string; name: string }[];
  sources: { id: string; name: string }[];
}

export default function DisturbanceForm({
  editing,
  onSubmit,
  onCancel,
  departments,
  units,
  sources,
}: Props) {
  const { register, handleSubmit, reset, setValue } =
    useForm<DisturbanceLogPayload>();

  useEffect(() => {
    if (editing) {
      const { id, created_at, created_by, ...formValues } = editing;
      reset(formValues);
    } else {
      reset();
    }
  }, [editing, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border p-4 rounded shadow"
    >
      <h2 className="text-lg font-semibold mb-2">
        {editing ? 'Edit Disturbance' : 'Tambah Disturbance'}
      </h2>

      <div>
        <label className="label">Periode</label>
        <input
          type="date"
          {...register('periode')}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="label">Department</label>
        <select
          {...register('department_id')}
          className="select select-bordered w-full"
          required
        >
          <option value="">Pilih Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Unit</label>
        <select
          {...register('unit_id')}
          className="select select-bordered w-full"
          required
        >
          <option value="">Pilih Unit</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Source</label>
        <select
          {...register('source_id')}
          className="select select-bordered w-full"
          required
        >
          <option value="">Pilih Source</option>
          {sources.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Durasi (menit)</label>
        <input
          type="number"
          {...register('duration_minutes')}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="label">Kategori</label>
        <select
          {...register('category')}
          className="select select-bordered w-full"
          required
        >
          {DISTURBANCE_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Deskripsi</label>
        <textarea
          {...register('description')}
          className="textarea textarea-bordered w-full"
          required
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editing ? 'Update' : 'Simpan'}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-ghost border"
            onClick={onCancel}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
