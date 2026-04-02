'use client';
import { SlidersHorizontal, X, Calendar } from 'lucide-react';
import { SearchFilters, AUSTRALIAN_STATES, PROPERTY_TYPES, NATIONALITIES } from '@/lib/types';

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  function update(key: keyof SearchFilters, value: string | number | boolean | undefined) {
    onChange({ ...filters, [key]: value || undefined });
  }

  const hasFilters = Object.values(filters).some((v) => v !== undefined && v !== '');

  return (
    <aside className="w-80 shrink-0">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            Filters
          </div>
          {hasFilters && (
            <button
              onClick={() => onChange({})}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>

        {/* Search query */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Keywords, suburb..."
            value={filters.query || ''}
            onChange={(e) => update('query', e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        {/* My Nationality */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            My Nationality
          </label>
          <p className="text-xs text-slate-400 mb-2">Show listings that welcome you</p>
          <select
            value={filters.nationality || ''}
            onChange={(e) => update('nationality', e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option value="">Any / Not specified</option>
            {NATIONALITIES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            State / Territory
          </label>
          <select
            value={filters.state || ''}
            onChange={(e) => {
              update('state', e.target.value);
              update('city', undefined); // reset city when state changes
            }}
            className="w-full text-sm border border-slate-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option value="">All States</option>
            {AUSTRALIAN_STATES.map((s) => (
              <option key={s.abbr} value={s.abbr}>{s.abbr} — {s.name}</option>
            ))}
          </select>
        </div>

        {/* City (shown when state is selected) */}
        {filters.state && (
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              City
            </label>
            <select
              value={filters.city || ''}
              onChange={(e) => update('city', e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            >
              <option value="">All cities in {filters.state}</option>
              {(AUSTRALIAN_STATES.find((s) => s.abbr === filters.state)?.cities ?? []).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}

        {/* Property type */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Property Type
          </label>
          <select
            value={filters.type || ''}
            onChange={(e) => update('type', e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option value="">Any Type</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t} className="capitalize">{t}</option>
            ))}
          </select>
        </div>

        {/* Max Rent */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Max Rent (AUD/week)
          </label>
          <input
            type="number"
            placeholder="e.g. 400"
            value={filters.maxRent || ''}
            onChange={(e) => update('maxRent', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full text-sm border border-slate-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        {/* Bedrooms */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Min. Bedrooms
          </label>
          <div className="flex gap-1.5">
            {[
              { label: 'Any', value: '' },
              { label: '1+', value: '1' },
              { label: '2+', value: '2' },
              { label: '3+', value: '3' },
              { label: '4+', value: '4' },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => update('bedrooms', opt.value ? Number(opt.value) : undefined)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                  (filters.bedrooms?.toString() || '') === opt.value
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Furnished */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Furnished
          </label>
          <select
            value={filters.furnished || ''}
            onChange={(e) => update('furnished', e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option value="">Any</option>
            <option value="furnished">Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>

        {/* Gender preference */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Gender Preference
          </label>
          <div className="flex gap-1.5">
            {[
              { label: 'Any', value: 'any' },
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('gender', opt.value === 'any' ? undefined : opt.value)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                  (filters.gender || 'any') === opt.value
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Available by */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            <Calendar className="w-3.5 h-3.5 inline mr-1" />
            Available By
          </label>
          <p className="text-[11px] text-slate-400 mb-2">Show listings available on or before this date</p>
          <input
            type="date"
            value={filters.availableBy || ''}
            onChange={(e) => update('availableBy', e.target.value || undefined)}
            className="w-full text-sm border border-slate-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
          {filters.availableBy && (
            <button
              onClick={() => update('availableBy', undefined)}
              className="text-[11px] text-red-400 hover:text-red-600 mt-1 transition-colors"
            >
              Clear date
            </button>
          )}
        </div>

        {/* Pets allowed */}
        <div className="mb-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.petsAllowed === true}
              onChange={(e) => update('petsAllowed', e.target.checked ? true : undefined)}
              className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500"
            />
            <span className="text-sm text-slate-700 font-medium">Pets allowed</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
