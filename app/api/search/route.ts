import { NextRequest, NextResponse } from 'next/server';
import { filterListings } from '@/lib/filterListings';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || undefined;
  const results = filterListings({ query });
  return NextResponse.json({ listings: results, total: results.length });
}
