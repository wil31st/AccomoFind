'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Search, Loader2 } from 'lucide-react';

interface AISearchBarProps {
  placeholder?: string;
  size?: 'lg' | 'md';
}

export default function AISearchBar({
  placeholder = 'Try: "2-bed apartment in London under £2,000 near French community"',
  size = 'lg',
}: AISearchBarProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json() as { filters: Record<string, unknown> };

      // Build URL params from parsed filters
      const params = new URLSearchParams();
      params.set('q', query);
      const f = data.filters;
      if (f.type) params.set('type', String(f.type));
      if (f.city) params.set('city', String(f.city));
      if (f.minPrice) params.set('minPrice', String(f.minPrice));
      if (f.maxPrice) params.set('maxPrice', String(f.maxPrice));
      if (f.minBedrooms) params.set('minBedrooms', String(f.minBedrooms));
      if (Array.isArray(f.nationalityCommunities) && f.nationalityCommunities.length > 0)
        params.set('nationalities', (f.nationalityCommunities as string[]).join(','));
      if (f.explanation) params.set('explanation', String(f.explanation));

      router.push(`/listings?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  const isLarge = size === 'lg';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${isLarge ? 'h-16' : 'h-12'}`}>
        <div className={`flex items-center gap-2 pl-4 ${isLarge ? 'pr-3' : 'pr-2'} text-indigo-600 shrink-0`}>
          <Sparkles className={isLarge ? 'w-5 h-5' : 'w-4 h-4'} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 ${isLarge ? 'text-base' : 'text-sm'}`}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className={`shrink-0 m-2 flex items-center gap-2 font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all ${isLarge ? 'px-5 py-3 text-sm' : 'px-4 py-2 text-xs'}`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>
      <p className={`mt-2 text-xs text-center ${isLarge ? 'text-gray-400' : 'text-gray-500'}`}>
        Powered by Claude AI — describe your ideal home in plain English
      </p>
    </form>
  );
}
