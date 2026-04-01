import { NextRequest, NextResponse } from 'next/server';
import { filterListings } from '@/lib/filterListings';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const listings = filterListings({
    type: (params.get('type') as 'apartment' | 'house') || '',
    city: params.get('city') || '',
    minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
    maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
    minBedrooms: params.get('minBedrooms') ? Number(params.get('minBedrooms')) : undefined,
    nationalityCommunities: params.get('nationalities')
      ? params.get('nationalities')!.split(',')
      : [],
  });

  return NextResponse.json({ listings, total: listings.length });
}
