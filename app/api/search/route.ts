import { NextRequest, NextResponse } from 'next/server';
import { parseSearchQuery } from '@/lib/claude';
import { filterListings } from '@/lib/filterListings';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json() as { query: string };

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const parsed = await parseSearchQuery(query.trim());
    const listings = filterListings({
      type: parsed.type || '',
      city: parsed.city,
      minPrice: parsed.minPrice,
      maxPrice: parsed.maxPrice,
      minBedrooms: parsed.minBedrooms,
      nationalityCommunities: parsed.nationalityCommunities,
      amenities: parsed.amenities,
    });

    return NextResponse.json({
      filters: parsed,
      listings,
      total: listings.length,
    });
  } catch (err) {
    console.error('Search error:', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
