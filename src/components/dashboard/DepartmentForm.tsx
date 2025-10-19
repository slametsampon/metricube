// src/components/dashboard/DepartmentForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { Department } from '@/models/department';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  selectedDepartment: Department | null;
  onSave: (dept: Department) => void;
  onCancel: () => void;
}

export default function DepartmentForm({
  selectedDepartment,
  onSave,
  onCancel,
}: Props) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedDepartment) {
      setName(selectedDepartment.name);
    } else {
      setName('');
    }
  }, [selectedDepartment]);

  const handleSubmit = () => {
    const newDepartment: Department = {
      id: selectedDepartment?.id || uuidv4(),
      name,
      created_at: selectedDepartment?.created_at || new Date().toISOString(),
    };
    onSave(newDepartment);
    setName('');
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 w-full md:w-1/2">
      <h2 className="text-lg font-semibold mb-4">
        {selectedDepartment ? 'Edit Department' : 'Add Department'}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Department Name
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {selectedDepartment ? 'Update' : 'Save'}
        </button>
        {selectedDepartment && (
          <button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
