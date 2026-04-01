import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Globe, Shield, Zap, Star, ArrowRight } from 'lucide-react';
import AISearchBar from '@/components/AISearchBar';
import ListingCard from '@/components/ListingCard';
import { listings } from '@/data/listings';

const featuredListings = listings.filter((l) => l.featured).slice(0, 6);
const stats = [
  { label: 'Properties Listed', value: '2,400+' },
  { label: 'Cities Covered', value: '6' },
  { label: 'Happy Tenants', value: '12,000+' },
  { label: 'Nationalities Served', value: '50+' },
];

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Search',
    description:
      'Describe your ideal home in plain English. Our AI understands what you really want and finds the perfect match.',
  },
  {
    icon: Globe,
    title: 'Nationality Filter',
    description:
      'Find neighbourhoods with expat communities from your country. Feel at home from day one.',
  },
  {
    icon: Shield,
    title: 'Verified Listings',
    description:
      'Every property is verified by our team. No scams, no surprises — just reliable listings.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description:
      'Get matched to properties in seconds. AI filters thousands of listings so you see only the best.',
  },
];

const exampleSearches = [
  '2-bed apartment in London near French community',
  'Studio in Paris under €1,500 with balcony',
  'Luxury apartment in Dubai with pool and sea view',
  'House in Barcelona near American expats',
  '3-bed home in Singapore near British community',
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-indigo-300" />
              <span>AI-Powered Accommodation Search</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Find Your Perfect Home
              <span className="block text-indigo-300">Anywhere in the World</span>
            </h1>

            <p className="text-lg sm:text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
              Just describe what you&apos;re looking for in plain English. Our AI finds
              the best rental properties — apartments, villas, penthouses, co-living
              and more — with a unique nationality community filter for expats.
            </p>

            <div className="max-w-3xl mx-auto">
              <AISearchBar size="lg" />
            </div>

            {/* Example searches */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {exampleSearches.map((s) => (
                <Link
                  key={s}
                  href={`/listings?q=${encodeURIComponent(s)}`}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs text-white/80 transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-indigo-600">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Why AccomoFind?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We&apos;ve combined AI intelligence with real estate expertise to make
            finding your next home effortless.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Listings ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 mt-1">
              Hand-picked listings across top expat cities
            </p>
          </div>
          <Link
            href="/listings"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View all listings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Browse All {listings.length} Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Cities ───────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Where Would You Like to Live?
            </h2>
            <p className="text-gray-500">
              Explore properties in the world&apos;s most popular expat destinations
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { city: 'London', flag: '🇬🇧', count: listings.filter((l) => l.location.city === 'London').length },
              { city: 'Paris', flag: '🇫🇷', count: listings.filter((l) => l.location.city === 'Paris').length },
              { city: 'New York', flag: '🇺🇸', count: listings.filter((l) => l.location.city === 'New York').length },
              { city: 'Dubai', flag: '🇦🇪', count: listings.filter((l) => l.location.city === 'Dubai').length },
              { city: 'Singapore', flag: '🇸🇬', count: listings.filter((l) => l.location.city === 'Singapore').length },
              { city: 'Barcelona', flag: '🇪🇸', count: listings.filter((l) => l.location.city === 'Barcelona').length },
            ].map(({ city, flag, count }) => (
              <Link
                key={city}
                href={`/listings?city=${encodeURIComponent(city)}`}
                className="flex flex-col items-center gap-2 p-5 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 rounded-2xl transition-all group"
              >
                <span className="text-3xl">{flag}</span>
                <span className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">
                  {city}
                </span>
                <span className="text-xs text-gray-400">{count} listings</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Loved by Expats Worldwide
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                'I typed "2-bed near French community in London under £2,500" and got exactly what I wanted in seconds. Incredible!',
              author: 'Mathieu D.',
              location: 'Paris → London',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
            },
            {
              quote:
                'The nationality filter was a game changer. Found an apartment near a Japanese community in Singapore and settled in within a week.',
              author: 'Yuki T.',
              location: 'Tokyo → Singapore',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            },
            {
              quote:
                'Moving to Dubai was daunting, but AccomoFind\'s AI search made finding a home near the British community completely painless.',
              author: 'Emma K.',
              location: 'London → Dubai',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            },
          ].map((t) => (
            <div
              key={t.author}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
