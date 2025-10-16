// src/lib/fetchMock.ts

export async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`/mocks/${path}`);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}
