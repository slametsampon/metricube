// src/app/dashboard/departemen/page.tsx

'use client';

import { useEffect, useState } from 'react';
import DepartmentForm from '@/components/dashboard/DepartmentForm';
import DepartmentList from '@/components/dashboard/DepartmentList';
import { Department } from '@/models/department';
import { getDepartments } from '@/services/departmentService';

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  useEffect(() => {
    async function loadDepartments() {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    }

    loadDepartments();
  }, []);

  const handleSave = (department: Department) => {
    const exists = departments.find((d) => d.id === department.id);
    let updatedList;

    if (exists) {
      updatedList = departments.map((d) =>
        d.id === department.id ? department : d
      );
    } else {
      updatedList = [...departments, department];
    }

    setDepartments(updatedList);
    setSelectedDepartment(null);
  };

  const handleDelete = (id: string) => {
    const confirmed = confirm(
      'Are you sure you want to delete this department?'
    );
    if (confirmed) {
      setDepartments(departments.filter((d) => d.id !== id));
    }
  };

  const handleEdit = (dept: Department) => {
    setSelectedDepartment(dept);
  };

  const handleCancel = () => {
    setSelectedDepartment(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Departments</h1>
      <DepartmentForm
        selectedDepartment={selectedDepartment}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <DepartmentList
        departments={departments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
