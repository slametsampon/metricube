// src/components/__tests__/KpiCard.test.tsx

import { render, screen } from '@testing-library/react';
import KpiCard from '../KpiCard';

describe('KpiCard', () => {
  it('renders KPI name and value', () => {
    render(<KpiCard name="RHM" value={123} unit="jam" />);
    expect(screen.getByText('RHM')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('jam')).toBeInTheDocument();
  });
});
