// src/components/__tests__/KpiSummary.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KpiSummary from '../KpiSummary';

describe('KpiSummary', () => {
  it('renders total and average with unit', () => {
    render(<KpiSummary total={1000} average={250.5} unit="jam" />);

    expect(screen.getByText(/Total: 1000 jam/)).toBeInTheDocument();
    expect(screen.getByText(/Average: 250.50 jam/)).toBeInTheDocument();
  });
});
