// src/components/__tests__/KpiTable.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KpiTable from '../KpiTable';
import rawData from '@/mocks/kpis.json';
import type { KPI } from '@/models/kpi';

const mockData = rawData as KPI[];

describe('KpiTable', () => {
  it('renders table rows based on KPI data', () => {
    render(<KpiTable data={mockData} />);

    for (const kpi of mockData) {
      expect(screen.getByText(kpi.name)).toBeInTheDocument();
      expect(screen.getByText(kpi.description)).toBeInTheDocument();
      expect(screen.getByText(kpi.unit)).toBeInTheDocument();
    }
  });
});
