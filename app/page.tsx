import Link from 'next/link';
import { ArrowRight, Home, Search, MessageCircle } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import { FEATURED_LISTINGS, listings } from '@/data/listings';
import { CITIES } from '@/lib/types';

const CITY_FLAGS: Record<string, string> = {
  Sydney: '🇦🇺',
  Melbourne: '🇦🇺',
  London: '🇬🇧',
  Dubai: '🇦🇪',
  Singapore: '🇸🇬',
  Toronto: '🇨🇦',
};

const stats = [
  { value: '500+', label: 'Listings' },
  { value: '50+', label: 'Suburbs' },
  { value: '6', label: 'Cities' },
  { value: 'Free', label: 'To browse' },
];

const steps = [
  {
    icon: Home,
    step: '1',
    title: 'Post your listing',
    description: 'Fill in your property details, preferred tenants and availability in minutes.',
  },
  {
    icon: Search,
    step: '2',
    title: 'Browse & filter',
    description: 'Search by city, budget, inclusions, nationality preference and more.',
  },
  {
    icon: MessageCircle,
    step: '3',
    title: 'Contact & move in',
    description: 'Message the owner or current tenant directly and arrange your move.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Find Your Perfect Flatmate &amp; Home
            </h1>
            <p className="text-lg sm:text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Browse thousands of rooms, apartments and houses for rent. Filter by inclusions,
              nationality preferences and more.
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar size="lg" placeholder="Search by suburb, city, or keyword..." />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-teal-600">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured listings ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Listings</h2>
            <p className="text-slate-500 mt-1 text-sm">Hand-picked rooms and apartments</p>
          </div>
          <Link
            href="/listings"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_LISTINGS.slice(0, 6).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
          >
            Browse All {listings.length} Listings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Browse by city ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Browse by City</h2>
            <p className="text-slate-500 text-sm">Find rooms and apartments in your destination</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITIES.map((city) => {
              const count = listings.filter((l) => l.location.city === city).length;
              return (
                <Link
                  key={city}
                  href={`/listings?city=${encodeURIComponent(city)}`}
                  className="flex flex-col items-center gap-2 p-5 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl transition-all group"
                >
                  <span className="text-3xl">{CITY_FLAGS[city] ?? '🌏'}</span>
                  <span className="font-semibold text-slate-900 group-hover:text-teal-700 text-sm">
                    {city}
                  </span>
                  <span className="text-xs text-slate-400">{count} listing{count !== 1 ? 's' : ''}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">How It Works</h2>
          <p className="text-slate-500 text-sm">Three simple steps to find your perfect home</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 relative">
                <s.icon className="w-5 h-5 text-teal-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 p-1.5 rounded-lg">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800">
                Flatmate<span className="text-teal-600">Find</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/listings" className="hover:text-teal-600 transition-colors">Browse Listings</Link>
              <Link href="/post" className="hover:text-teal-600 transition-colors">Post a Listing</Link>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} FlatmateFind &middot; Free to browse
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
