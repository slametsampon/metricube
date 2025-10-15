// src/components/__tests__/KpiList.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import KpiList from '../KpiList';
import { describe, it, expect, vi } from 'vitest';
import * as kpiService from '@/services/kpiService';
import type { KPI } from '@/models/kpi'; // ✅ Import type-nya

describe('KpiList', () => {
  it('renders KPI list from API', async () => {
    const mockKpis: KPI[] = [
      // ✅ Tambahkan type KPI[]
      {
        id: 'rhm',
        name: 'RHM',
        unit: 'jam',
        description: '',
        type: 'numeric',
        is_active: true,
        created_at: '',
      },
      {
        id: 'bfi',
        name: 'BFI',
        unit: '%',
        description: '',
        type: 'numeric',
        is_active: true,
        created_at: '',
      },
    ];

    vi.spyOn(kpiService, 'getKpis').mockResolvedValue(mockKpis);

    render(<KpiList />);

    await waitFor(() => {
      expect(screen.getByText('RHM')).toBeInTheDocument();
      expect(screen.getByText('BFI')).toBeInTheDocument();
    });
  });

  it('handles error from API gracefully', async () => {
    vi.spyOn(kpiService, 'getKpis').mockRejectedValue(new Error('API error'));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<KpiList />);

    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeNull();
    });
  });
});
