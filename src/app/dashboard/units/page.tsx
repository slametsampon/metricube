// src/app/dashboard/unit/page.tsx

'use client';

import { useEffect, useState } from 'react';
import UnitForm from '@/components/dashboard/UnitForm';
import UnitList from '@/components/dashboard/UnitList';
import { Unit } from '@/models/unit';
import { getUnits } from '@/services/unitService';

export default function UnitPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    async function loadUnits() {
      try {
        const data = await getUnits();
        setUnits(data);
      } catch (error) {
        console.error('Failed to fetch units:', error);
      }
    }

    loadUnits();
  }, []);

  const handleSave = (unit: Unit) => {
    const exists = units.find((u) => u.id === unit.id);
    let updatedList;

    if (exists) {
      updatedList = units.map((u) => (u.id === unit.id ? unit : u));
    } else {
      updatedList = [...units, unit];
    }

    setUnits(updatedList);
    setSelectedUnit(null);
  };

  const handleDelete = (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this unit?');
    if (confirmed) {
      setUnits(units.filter((u) => u.id !== id));
    }
  };

  const handleEdit = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleCancel = () => {
    setSelectedUnit(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Units</h1>
      <UnitForm
        selectedUnit={selectedUnit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <UnitList units={units} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
