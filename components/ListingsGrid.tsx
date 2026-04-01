'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, SearchX } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { Listing } from '@/lib/types';

export default function ListingsGrid() {
  const params = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [explanation, setExplanation] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const q = params.get('q');
        const explanationParam = params.get('explanation');
        if (explanationParam) setExplanation(explanationParam);

        if (q && !params.has('type') && !params.has('city') && !params.has('minBedrooms') && !params.has('nationalities')) {
          // AI search: re-run search using the query
          const res = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: q }),
          });
          const data = await res.json() as { listings: Listing[]; total: number; filters: { explanation?: string } };
          setListings(data.listings);
          setTotal(data.total);
          if (data.filters?.explanation) setExplanation(data.filters.explanation);
        } else {
          // Standard filter-based search
          const apiParams = new URLSearchParams();
          ['type', 'city', 'minPrice', 'maxPrice', 'minBedrooms', 'nationalities'].forEach((k) => {
            const v = params.get(k);
            if (v) apiParams.set(k, v);
          });
          const res = await fetch(`/api/listings?${apiParams.toString()}`);
          const data = await res.json() as { listings: Listing[]; total: number };
          setListings(data.listings);
          setTotal(data.total);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void fetchListings();
  }, [params]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm">Finding the best properties for you…</p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      {/* Results header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {total} {total === 1 ? 'property' : 'properties'} found
          </h2>
        </div>
        {explanation && (
          <div className="flex items-start gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-800">
            <span className="text-base">✨</span>
            <p>{explanation}</p>
          </div>
        )}
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <SearchX className="w-12 h-12" />
          <p className="text-base font-medium text-gray-600">No properties match your search</p>
          <p className="text-sm text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
