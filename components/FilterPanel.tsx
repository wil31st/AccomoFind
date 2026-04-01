'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { CITIES, NATIONALITIES } from '@/data/listings';

export default function FilterPanel() {
  const router = useRouter();
  const params = useSearchParams();

  const type = params.get('type') || '';
  const city = params.get('city') || '';
  const minBedrooms = params.get('minBedrooms') || '';
  const nationalities = params.get('nationalities')?.split(',').filter(Boolean) || [];

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === '') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    // Reset to first page
    next.delete('q');
    router.push(`/listings?${next.toString()}`);
  }

  function toggleNationality(nat: string) {
    const next = nationalities.includes(nat)
      ? nationalities.filter((n) => n !== nat)
      : [...nationalities, nat];
    const nxtParams = new URLSearchParams(params.toString());
    if (next.length === 0) {
      nxtParams.delete('nationalities');
    } else {
      nxtParams.set('nationalities', next.join(','));
    }
    router.push(`/listings?${nxtParams.toString()}`);
  }

  function clearAll() {
    router.push('/listings');
  }

  const hasFilters = type || city || minBedrooms || nationalities.length > 0;

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            Filters
          </div>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>

        {/* Property type */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Property Type
          </label>
          <div className="flex flex-wrap gap-1.5">
            {['', 'apartment', 'house', 'studio', 'villa', 'penthouse', 'townhouse', 'serviced apartment', 'co-living'].map((t) => (
              <button
                key={t}
                onClick={() => update('type', t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all capitalize ${
                  type === t
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                }`}
              >
                {t === '' ? 'All Types' : t}
              </button>
            ))}
          </div>
        </div>

        {/* City */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            City
          </label>
          <select
            value={city}
            onChange={(e) => update('city', e.target.value)}
            className="w-full text-sm border-gray-200 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Min. Bedrooms
          </label>
          <div className="flex gap-2">
            {['', '1', '2', '3', '4'].map((b) => (
              <button
                key={b}
                onClick={() => update('minBedrooms', b)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                  minBedrooms === b
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                }`}
              >
                {b === '' ? 'Any' : b + '+'}
              </button>
            ))}
          </div>
        </div>

        {/* Nationality Communities */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Nationality Community
          </label>
          <p className="text-xs text-gray-400 mb-3">
            Find homes near your community
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto">
            {NATIONALITIES.map((nat) => {
              const active = nationalities.includes(nat);
              return (
                <button
                  key={nat}
                  onClick={() => toggleNationality(nat)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                >
                  {nat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
