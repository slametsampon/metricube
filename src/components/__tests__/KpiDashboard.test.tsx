// src/components/__tests__/KpiDashboard.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import KpiDashboard from '../KpiDashboard';
import mockKpis from '@/mocks/kpis.json';

describe('KpiDashboard', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockKpis,
      })
    );
  });

  it('renders multiple KpiCard based on API data', async () => {
    render(<KpiDashboard />);

    for (const kpi of mockKpis) {
      expect(await screen.findByText(kpi.name)).toBeInTheDocument();
    }
  });
});
