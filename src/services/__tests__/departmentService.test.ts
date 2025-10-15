// src/services/__tests__/departmentService.test.ts

import { describe, test, expect, vi } from 'vitest';
import { getDepartments } from '../departmentService';
import mockDepartments from '@/mocks/departments.json';

describe('Department Service', () => {
  test('should return array of departments', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockDepartments,
    } as Response);

    const result = await getDepartments();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('name');
  });
});
