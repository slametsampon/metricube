// src/components/dashboard/UnitForm.tsx

'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Department } from '@/models/department';
import { Unit } from '@/models/unit';
import { v4 as uuidv4 } from 'uuid';
import { getDepartments } from '@/services/departmentService';

interface Props {
  selectedUnit: Unit | null;
  onSave: (unit: Unit) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Unit name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  department_id: z.string().min(1, 'Department is required'),
  is_active: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UnitForm({ selectedUnit, onSave, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
      department_id: '',
      is_active: true,
    },
  });

  const [departments, setDepartments] = useState<Department[]>([]);

  // Load departments list
  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch((err) => console.error('Failed to load departments:', err));
  }, []);

  useEffect(() => {
    if (selectedUnit) {
      reset({
        name: selectedUnit.name,
        location: selectedUnit.location,
        description: selectedUnit.description,
        department_id: selectedUnit.department_id,
        is_active: selectedUnit.is_active,
      });
    } else {
      reset();
    }
  }, [selectedUnit, reset]);

  const onSubmit = (data: FormValues) => {
    const unit: Unit = {
      id: selectedUnit?.id || uuidv4(),
      ...data,
      created_at: selectedUnit?.created_at || new Date().toISOString(),
    };
    onSave(unit);
    reset();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 w-full md:w-2/3">
      <h2 className="text-lg font-semibold mb-4">
        {selectedUnit ? 'Edit Unit' : 'Add Unit'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            {...register('location')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.location && (
            <p className="text-red-600 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={3}
            {...register('description')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Department - Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select
            {...register('department_id')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department_id && (
            <p className="text-red-600 text-sm">
              {errors.department_id.message}
            </p>
          )}
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('is_active')} />
          <label className="text-sm">Is Active?</label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {selectedUnit ? 'Update' : 'Save'}
          </button>
          {selectedUnit && (
            <button
              type="button"
              onClick={() => {
                reset();
                onCancel();
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
