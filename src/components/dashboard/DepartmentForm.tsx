// src/components/dashboard/DepartmentForm.tsx

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Department } from '@/models/department';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  selectedDepartment: Department | null;
  onSave: (dept: Department) => void;
  onCancel: () => void;
}

// ✅ Skema validasi Zod
const formSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  description: z.string().min(1, 'Description is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function DepartmentForm({
  selectedDepartment,
  onSave,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Saat edit, set nilai form
  useEffect(() => {
    if (selectedDepartment) {
      reset({
        name: selectedDepartment.name,
        description: selectedDepartment.description,
      });
    } else {
      reset({
        name: '',
        description: '',
      });
    }
  }, [selectedDepartment, reset]);

  // Handle Submit
  const onSubmit = (data: FormValues) => {
    const newDepartment: Department = {
      id: selectedDepartment?.id || uuidv4(),
      name: data.name,
      description: data.description,
      created_at: selectedDepartment?.created_at || new Date().toISOString(),
    };

    onSave(newDepartment);
    reset(); // Bersihkan form
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 w-full md:w-1/2">
      <h2 className="text-lg font-semibold mb-4">
        {selectedDepartment ? 'Edit Department' : 'Add Department'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Department Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={3}
            {...register('description')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {selectedDepartment ? 'Update' : 'Save'}
          </button>
          {selectedDepartment && (
            <button
              type="button"
              onClick={() => {
                reset(); // reset form
                onCancel(); // clear selected
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
