// src/app/api/kpis/route.ts

import { NextResponse } from 'next/server';
import kpis from '@/public/mocks/kpis.json';

export async function GET() {
  return NextResponse.json(kpis);
}
