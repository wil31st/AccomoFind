import { Suspense } from 'react';
import FilterPanel from '@/components/FilterPanel';
import ListingsGrid from '@/components/ListingsGrid';
import AISearchBar from '@/components/AISearchBar';
import { Loader2 } from 'lucide-react';

export default function ListingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Browse Listings</h1>
        <p className="text-gray-500 text-sm">
          Use AI search or filters to find your perfect home
        </p>
      </div>

      {/* AI Search Bar */}
      <div className="mb-6">
        <Suspense>
          <AISearchBar
            size="md"
            placeholder='Try: "1-bed apartment in Dubai near British community under AED 9,000"'
          />
        </Suspense>
      </div>

      {/* Main layout: sidebar + grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Suspense fallback={<div className="w-72 h-96 bg-gray-100 rounded-2xl animate-pulse" />}>
          <FilterPanel />
        </Suspense>

        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center py-24 text-gray-400 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
              <span>Loading properties…</span>
            </div>
          }
        >
          <ListingsGrid />
        </Suspense>
      </div>
    </div>
  );
}
