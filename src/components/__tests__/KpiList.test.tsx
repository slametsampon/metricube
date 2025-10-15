// src/components/__tests__/KpiList.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import KpiList from '../KpiList';
import { describe, it, expect, vi } from 'vitest';
import * as kpiService from '@/services/kpiService';

describe('KpiList', () => {
  it('renders KPI list from API', async () => {
    // Mock data
    const mockKpis = [
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

    // Spy on getKpis() and mock return value
    vi.spyOn(kpiService, 'getKpis').mockResolvedValue(mockKpis);

    // Render component
    render(<KpiList />);

    // Tunggu hingga data muncul
    await waitFor(() => {
      expect(screen.getByText('RHM')).toBeInTheDocument();
      expect(screen.getByText('BFI')).toBeInTheDocument();
    });
  });

  it('handles error from API gracefully', async () => {
    // Mock getKpis to throw error
    vi.spyOn(kpiService, 'getKpis').mockRejectedValue(new Error('API error'));

    // Spy console.error to suppress during test
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<KpiList />);

    await waitFor(() => {
      // Karena tidak ada fallback UI, cukup pastikan tidak crash
      expect(screen.queryByRole('list')).not.toBeNull();
    });
  });
});
