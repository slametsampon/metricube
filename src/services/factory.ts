// src/services/factory.ts

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// ✅ Tambahkan ini:
export const useMock = USE_MOCK;

/**
 * Helper untuk mendapatkan endpoint sesuai mode
 * @param path - nama file atau path API
 * @returns URL endpoint
 */
export function getEndpoint(path: string) {
  return USE_MOCK
    ? `/mocks/${path}.json` // public/mocks/
    : `/api/${path}`; // app/api/...
}
