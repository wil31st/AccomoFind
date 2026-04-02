import { NextRequest, NextResponse } from 'next/server';
import { filterListings } from '@/lib/filterListings';
import { SearchFilters, SortOption } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filters: SearchFilters = {
    state: searchParams.get('state') || undefined,
    city: searchParams.get('city') || undefined,
    type: searchParams.get('type') || undefined,
    minRent: searchParams.get('minRent') ? Number(searchParams.get('minRent')) : undefined,
    maxRent: searchParams.get('maxRent') ? Number(searchParams.get('maxRent')) : undefined,
    bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
    furnished: searchParams.get('furnished') || undefined,
    nationality: searchParams.get('nationality') || undefined,
    gender: searchParams.get('gender') || undefined,
    petsAllowed: searchParams.get('petsAllowed') === 'true' ? true : undefined,
    availableBy: searchParams.get('availableBy') || undefined,
    query: searchParams.get('query') || undefined,
    sort: (searchParams.get('sort') as SortOption) || undefined,
  };
  const results = filterListings(filters);
  return NextResponse.json({ listings: results, total: results.length });
}
